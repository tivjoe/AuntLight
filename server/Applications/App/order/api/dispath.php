<?php

use \GatewayWorker\Lib\Gateway;
require_once __DIR__ . '/mistake.php';

/**
 * 订单调度
 */
class Dispath
{

    /**
     * 订单调度
     * @param int $client_id 客户端id
     * @param array $message 客户端发送的消息
     * @param $db 数据库实例
     */
    public function dispather($client_id,$message,$db)
    {
        $orderId=$this->idGenerator();
        $profit=$this->profitCount($message);
        $isDone=$this->clientPlaceAnOrder($client_id,$message,$db,$orderId,$profit);

        $this->sendNewOrderForSeller($orderId,$message['seller_id']);
        $this->allotNewOrderForDelivery($orderId,$db);

        return $isDone;
    }

    /**
     * 配送员取到商品
     * @param array $message 客户端发送的消息
     * @param $db 数据库实例
     */
    public function deliveryGetGoods($message,$db)
    {
        $order_id=$message['order_id'];
        $db->query(" UPDATE `order` SET order_state=2 WHERE order_id='{$order_id}' ");
        $seller_id=$db->single("SELECT seller_id FROM `order` WHERE order_id='{$order_id}' ");
        return $seller_id;
    }

    /**
     * 配送员送达
     * @param array $message 客户端发送的消息
     * @param $db 数据库实例
     */
    public function deliveryOrderForDone($message,$db)
    {
        $order_id=$message['order_id'];
        $db->query(" UPDATE `order` SET order_state=3 WHERE order_id='{$order_id}' ");
        $seller_id=$db->single("SELECT seller_id FROM `order` WHERE order_id='{$order_id}' ");
        return $seller_id;
    }

    /**
     * 订单id生成器
     * 4位随机数+10位时间戳+4位随机数
     */
    private function idGenerator()
    {
        $randomNumberHead=rand(1000,9999);
        $randomNumberBack=rand(1000,9999);
        $orderId=$randomNumberHead.time().$randomNumberBack;
        return $orderId;
    }

    /**
     * 利润计算
     */
    private function profitCount($message)
    {
        $goodMoney=$message['order_money']-$message['freight'];
        $profit=array(
            "order_money"=>$message['order_money'],
            "good_money"=>$goodMoney,
            "order_freight"=>4,
            "user_pay_freight"=>$message['freight'],
            "seller_pay_freight"=>4-$message['freight'],
            "delivery_profit"=>4,
            "seller_profit"=>$goodMoney-(4-$message['freight'])-($goodMoney*0.05),
            "profit"=>$goodMoney*0.05,
        );
        return $profit;
    }

    /**
     * 客户端下单
     * @param int $client_id 客户端id
     * @param array $message 客户端发送的消息
     * @param $db 数据库实例
     * @param string $orderId 订单id
     * @param array $profit 利润
     */
    private function clientPlaceAnOrder($client_id,$message,$db,$orderId,$profit)
    {
        //获取用户id
        $session=Gateway::getSession($client_id);
        $userId=$session['uid'];
        //获取商家信息
        $sellerInfo=$db->row("SELECT seller_phone,seller_name,seller_addres,headurl,preparing_time FROM seller_information WHERE seller_id='{$message['seller_id']}' ");
        //查询当天的订单信息，赋予取餐号
        $todayOrder=$db->query(" SELECT * FROM `order` WHERE to_days(get_order_time) = to_days(now())");
        $queue_number=count($todayOrder)+1;
        //拼接sql语句
        $sqlVale="";
        for($i=0;$i<count($message['good']);$i++)
        {
            $sqlVale=$sqlVale."('{$orderId}','{$message['good'][$i]['good_name']}','{$message['good'][$i]['good_price']}','{$message['good'][$i]['good_amount']}','{$message['good'][$i]['good_url']}'),";
        }
        $sqlInsertGood="INSERT INTO order_goods (order_id,good_name,good_price,good_amount,good_url) VALUES  ".substr($sqlVale ,0 ,-1);
        //开始事务，插入订单表和订单商品表
        $db->beginTrans();
        try
        {
            $isOrder= $db->insert('order')->cols(array(
                'order_id'=>$orderId,
                'user_id'=>$userId,
                'seller_id'=>$message['seller_id'],
                'seller_name'=>$sellerInfo['seller_name'],
                "seller_phone"=>$sellerInfo['seller_phone'],
                "seller_address"=>$sellerInfo['seller_addres'],
                "seller_url"=>$sellerInfo['headurl'],
                "preparing_time"=>$sellerInfo['preparing_time'],
                "queue_number"=>$queue_number,
                "order_state"=>1,
                "pay_state"=>1,
                "appraise_state"=>0,
                "pay_method"=>$message['pay_method'],
                "order_money"=>$profit['order_money'],
                "good_money"=>$profit['good_money'],
                "order_freight"=>$profit['order_freight'],
                "user_pay_freight"=>$profit['user_pay_freight'],
                "seller_pay_freight"=>$profit['seller_pay_freight'],
                "delivery_profit"=>$profit['delivery_profit'],
                "seller_profit"=>$profit['seller_profit'],
                "contact_name"=>$message['contact_name'],
                "contact_phone"=>$message['contact_phone'],
                "contact_street"=>$message['contact_street'],
                "contact_remake"=>$message['contact_remake'],
                "lnt"=>$message['lnt'],
                "lat"=>$message['lat'],
                "get_order_time"=>date("Y-m-d H:i:s",time()),
                "level"=>4.8))->query();
            $isGood=$db->query($sqlInsertGood);
        }
        catch (PDOException $e)
        {
            print $e; //"捕获异常成功，sql出现问题";
        }

        if($isOrder!==null&&$isGood!==null)
        {
            //提交事务
            $db->commitTrans();
            return 1;
        }
        else
        {
            //事务回滚，返回错误
            $db->rollBackTrans();
            return 0;
        }
    }

    /**
     * 订单推送给商家端
     */
    private function sendNewOrderForSeller($orderId,$seller_id)
    {
        $data=array('action'=>"now_get_new_order","status"=>1,"orderid"=>$orderId);
        Gateway::sendToUid($seller_id,json_encode($data));
    }

    /**
     * 分配订单给配送员
     */
    private function allotNewOrderForDelivery($orderId,$db)
    {
        $deliveryInfo=$db->row(" SELECT delivery_id,delivery_phone,delivery_name FROM delivery_information WHERE is_get=1 ORDER BY now_count_number LIMIT 1  ");
        if($deliveryInfo['delivery_id']!=null)
        {
            //更新订单信息
            $db->query(" UPDATE `order` SET delivery_id='{$deliveryInfo['delivery_id']}',delivery_phone='{$deliveryInfo['delivery_phone']}',delivery_name='{$deliveryInfo['delivery_name']}' WHERE order_id='{$orderId}' ");
            //推送给配送员
            $data=array('action'=>"now_get_new_order","status"=>1,"orderid"=>$orderId);
            Gateway::sendToUid($deliveryInfo['delivery_id'],json_encode($data));
        }
        else
        {
            //进行异常订单处理
            $mistake=new OrderForMistake();
            $mistake->noDelivery($orderId,$db);
        }
    }

}