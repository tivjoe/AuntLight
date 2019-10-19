<?php

use \GatewayWorker\Lib\Gateway;

/**
 * 商家对订单的操作
 * 拉取历史订单/某个订单详情/拉取备餐中订单/拉取配送中订单
 */
class OrderForSeller
{
    /**
     * 获取历史订单
     * @param int $client_id 连接id
     * @param array $message 客户端发送的消息
     * @param $db 数据库实例
     */
    public function getHistoryOrder($client_id,$message,$db)
    {
         //获取商家id
         $session=Gateway::getSession($client_id);
         $sellerId=$session['uid'];
        if($message['flag']=="refresh")
        {
            $totalCount=$db->query("SELECT order_id FROM `order` WHERE seller_id='{$sellerId}' AND order_state=3 ");
            $orderList=$db->query(" SELECT order_id,seller_profit,get_order_time,queue_number FROM `order` WHERE seller_id='{$sellerId}' AND order_state=3 ORDER BY get_order_time DESC LIMIT 0,10  ");
            $data=array('action'=>"get_history_order","flag"=>"refresh","data"=>$orderList,"status"=>1,"totalCount"=>count($totalCount));
            Gateway::sendToClient($client_id,json_encode($data));
        }
        else if($message['flag']=="page")
        {
            $orderList=$db->query("SELECT order_id,seller_profit,get_order_time,queue_number FROM `order` WHERE seller_id='{$sellerId}' AND order_state=3 ORDER BY get_order_time DESC LIMIT {$message['pageNo']},10  ");
            $data=array('action'=>"get_history_order","flag"=>"page","data"=>$orderList,"status"=>1);
            Gateway::sendToClient($client_id,json_encode($data));
        }
    }

    /**
     * 获取某个订单详情
     * @param int $client_id 连接id
     * @param array $message 客户端发送的消息
     * @param $db 数据库实例
     */
    public function getAnOrderDetail($client_id,$message,$db)
    {
        $order=$db->row(" SELECT order_id,delivery_name,delivery_phone,preparing_time,queue_number,order_state,order_money,good_money,user_pay_freight,seller_pay_freight,seller_profit,contact_name,contact_phone,contact_street,contact_remake,get_order_time FROM `order` WHERE order_id='{$message['order_id']}' ");
        $goodList=$db->query(" SELECT * FROM order_goods WHERE order_id='{$message['order_id']}' ");
        $order["good_list"]=$goodList;
        $data=array('action'=>"get_an_order_detail","flag"=>$message['flag'],"data"=>$order,"status"=>1);
        Gateway::sendToClient($client_id,json_encode($data));
    }

    /**
     * 获取全部备餐中订单
     * @param int $client_id 连接id
     * @param $db 数据库实例
     */
    public function getAllReadyingOrder($client_id,$db)
    {
        //获取商家id
        $session=Gateway::getSession($client_id);
        $seller_id=$session['uid'];
        $orderList=$db->query(" SELECT order_id,delivery_name,delivery_phone,preparing_time,queue_number,order_state,order_money,good_money,user_pay_freight,seller_pay_freight,seller_profit,contact_name,contact_phone,contact_street,contact_remake,get_order_time FROM `order` WHERE seller_id='{$seller_id}' AND order_state=1  ");
        if(empty($orderList)==true)
        {
            //没有备餐中的订单
            $data=array('action'=>"get_all_readying_order","data"=>$orderList,"status"=>1);
            Gateway::sendToClient($client_id,json_encode($data));
        }
        else
        {
            for($i=0;$i<count($orderList);$i++)
            {
                $goodList=$db->query(" SELECT * FROM order_goods WHERE order_id='{$orderList[$i]['order_id']}' ");
                $orderList[$i]["good_list"]=$goodList;
            }
            $data=array('action'=>"get_all_readying_order","data"=>$orderList,"status"=>1);
            Gateway::sendToClient($client_id,json_encode($data));
        }
    }

    /**
     * 获取全部配送中订单
     * @param int $client_id 连接id
     * @param $db 数据库实例
     */
    public function getAllRunningOrder($client_id,$db)
    {
        //获取商家id
        $session=Gateway::getSession($client_id);
        $seller_id=$session['uid'];
        $orderList=$db->query(" SELECT order_id,delivery_name,delivery_phone,preparing_time,queue_number,order_state,order_money,good_money,user_pay_freight,seller_pay_freight,seller_profit,contact_name,contact_phone,contact_street,contact_remake,get_order_time FROM `order` WHERE seller_id='{$seller_id}' AND order_state=2  ");
        if(empty($orderList)==true)
        {
            //没有备餐中的订单
            $data=array('action'=>"get_all_running_order","data"=>$orderList,"status"=>1);
            Gateway::sendToClient($client_id,json_encode($data));
        }
        else
        {
            for($i=0;$i<count($orderList);$i++)
            {
                $goodList=$db->query(" SELECT * FROM order_goods WHERE order_id='{$orderList[$i]['order_id']}' ");
                $orderList[$i]["good_list"]=$goodList;
            }
            $data=array('action'=>"get_all_running_order","data"=>$orderList,"status"=>1);
            Gateway::sendToClient($client_id,json_encode($data));
        }
    }
}