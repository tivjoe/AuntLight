<?php

use \GatewayWorker\Lib\Gateway;
require_once __DIR__ . '/dispath.php';

/**
 * 配送员对订单的操作
 * 拉取历史订单/某个订单详情/拉取备餐中订单/拉取配送中订单
 */
class OrderForDelivery
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
        $deliveryId=$session['uid'];
        if($message['flag']=="refresh")
        {
            $totalCount=$db->query("SELECT order_id FROM `order` WHERE delivery_id='{$deliveryId}' AND order_state=3 ");
            $orderList=$db->query(" SELECT order_id,delivery_profit,get_order_time,queue_number FROM `order` WHERE delivery_id='{$deliveryId}' AND order_state=3 ORDER BY get_order_time DESC LIMIT 0,10  ");
            $data=array('action'=>"get_history_order","flag"=>"refresh","data"=>$orderList,"status"=>1,"totalCount"=>count($totalCount));
            Gateway::sendToClient($client_id,json_encode($data));
        }
        else if($message['flag']=="page")
        {
            $orderList=$db->query("SELECT order_id,delivery_profit,get_order_time,queue_number FROM `order` WHERE delivery_id='{$deliveryId}' AND order_state=3 ORDER BY get_order_time DESC LIMIT {$message['pageNo']},10  ");
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
        $order=$db->row(" SELECT order_id,preparing_time,queue_number,seller_id,seller_name,seller_phone,seller_address,seller_url,order_state,delivery_profit,contact_name,contact_phone,contact_street,contact_remake,get_order_time FROM `order` WHERE order_id='{$message['order_id']}' ");
        $data=array('action'=>"get_an_order_detail","data"=>$order,"status"=>1);
        Gateway::sendToClient($client_id,json_encode($data));
    }

    /**
     * 获取全部备餐中订单
     * @param int $client_id 连接id
     * @param $db 数据库实例
     */
    public function getAllReadyingOrder($client_id,$db)
    {
        //获取配送员id
        $session=Gateway::getSession($client_id);
        $delivery_id=$session['uid'];
        $orderList=$db->query(" SELECT order_id,preparing_time,queue_number,seller_id,seller_name,seller_phone,seller_address,seller_url,order_state,delivery_profit,contact_name,contact_phone,contact_street,contact_remake,get_order_time FROM `order` WHERE delivery_id='{$delivery_id}' AND order_state=1  ");
        $data=array('action'=>"get_all_readying_order","data"=>$orderList,"status"=>1);
        Gateway::sendToClient($client_id,json_encode($data));
    }

    /**
     * 获取全部配送中订单
     * @param int $client_id 连接id
     * @param $db 数据库实例
     */
    public function getAllRunningOrder($client_id,$db)
    {
        //获取配送员id
        $session=Gateway::getSession($client_id);
        $delivery_id=$session['uid'];
        $orderList=$db->query(" SELECT order_id,preparing_time,queue_number,seller_id,seller_name,seller_phone,seller_address,seller_url,order_state,delivery_profit,contact_name,contact_phone,contact_street,contact_remake,get_order_time FROM `order` WHERE delivery_id='{$delivery_id}' AND order_state=2  ");
        $data=array('action'=>"get_all_running_order","data"=>$orderList,"status"=>1);
        Gateway::sendToClient($client_id,json_encode($data));
    }

    /**
     * 配送员取餐完成
     * @param int $client_id 连接id
     * @param array $message 客户端发送的消息
     * @param $db 数据库实例
     */
    public function orderForTakeGoods($client_id,$message,$db)
    {
        $dispath=new Dispath();
        $seller_id=$dispath->deliveryGetGoods($message,$db);
        $data=array('action'=>"delivery_get_goods","order_id"=>$message['order_id'],"status"=>1);
        //推送给商家端
        Gateway::sendToUid($seller_id,json_encode($data));
        //推送给配送员
        Gateway::sendToClient($client_id,json_encode($data));
    }

    /**\
     * 配送员送达
     * @param int $client_id 连接id
     * @param array $message 客户端发送的消息
     * @param $db 数据库实例
     */
    public function orderForDone($client_id,$message,$db)
    {
        $dispath=new Dispath();
        $seller_id=$dispath->deliveryOrderForDone($message,$db);
        $data=array('action'=>"delivery_order_done","order_id"=>$message['order_id'],"status"=>1);
        //推送给商家端
        Gateway::sendToUid($seller_id,json_encode($data));
        //推送给配送员
        Gateway::sendToClient($client_id,json_encode($data));
    }

}