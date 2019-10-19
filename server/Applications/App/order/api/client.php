<?php

use \GatewayWorker\Lib\Gateway;
require_once __DIR__ . '/dispath.php';


/**
 * 客户端对订单的操作
 * 下单/拉取历史订单/某个订单详情
 */
class OrderForClient
{

    /**
     * 下单
     * @param int $client_id 连接id
     * @param array $message 客户端发送的消息
     * @param $db 数据库实例
     */
    public function placeAnOrder($client_id,$message,$db)
    {
        $dispath=new Dispath();
        $result=$dispath->dispather($client_id,$message,$db);
        if($result==1)
        {
            $data=array('action'=>"place_an_order","status"=>1);
            Gateway::sendToClient($client_id,json_encode($data));
        }
        else
        {
            $data=array('action'=>"place_an_order","status"=>0);
            Gateway::sendToClient($client_id,json_encode($data));
        }
    }

    /**
     * 获取历史订单
     * @param int $client_id 连接id
     * @param array $message 客户端发送的消息
     * @param $db 数据库实例
     */
    public function getHistoryOrder($client_id,$message,$db)
    {
        //获取用户id
        $session=Gateway::getSession($client_id);
        $userId=$session['uid'];
        //判断是刷新还是加载
        if($message['flag']=="refresh")
        {
            $totalCount=$db->query("SELECT order_id FROM `order` WHERE user_id='{$userId}' ");
            $orderList=$db->query(" SELECT order_id,seller_id,seller_name,seller_phone,seller_url,delivery_name,delivery_phone,order_state,appraise_state,order_money,good_money,user_pay_freight,contact_name,contact_phone,contact_street,contact_remake,get_order_time,finish_order_time,level FROM `order` WHERE user_id='{$userId}' ORDER BY get_order_time DESC LIMIT 0,10  ");
            $data=array('action'=>"get_history_order","flag"=>"refresh","data"=>$orderList,"status"=>1,"totalCount"=>count($totalCount));
            Gateway::sendToClient($client_id,json_encode($data));
        }
        else if($message['flag']=="page")
        {
            $orderList=$db->query(" SELECT order_id,seller_id,seller_name,seller_phone,seller_url,delivery_name,delivery_phone,order_state,appraise_state,order_money,good_money,user_pay_freight,contact_name,contact_phone,contact_street,contact_remake,get_order_time,finish_order_time,level FROM `order` WHERE user_id='{$userId}' ORDER BY get_order_time DESC LIMIT {$message['pageNo']},10  ");
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
        $orderGood=$db->query(" SELECT * FROM order_goods WHERE order_id='{$message['order_id']}' ");
        $data=array('action'=>"get_an_order_detail","data"=>$orderGood,"status"=>1);
        Gateway::sendToClient($client_id,json_encode($data));
    }

}