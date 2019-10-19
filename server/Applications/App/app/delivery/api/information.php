<?php

use \GatewayWorker\Lib\Gateway;

class DeliveryInformationControl
{
    /**
     * 获取配送员信息
     * @param string $client_id 连接id
     * @param object $db 数据库实例
     */
    public function getInformation($client_id,$db)
    {
        //获取商家seesion
        $seesion=Gateway::getSession($client_id);
        //查询商家信息
        $information=$db->row(" SELECT is_get,level,turnover,blance,delivery_name,delivery_headurl,all_order_number,is_pass,is_bind_alipay FROM delivery_information WHERE delivery_id='{$seesion['uid']}' ");
        $data=[];
        if(empty($information)==false)
        {
            $data=array("action"=>"get_information","status"=>1,"data"=>$information);
        }
        else
        {
            $data=array("action"=>"get_information","status"=>"error");
        }
        Gateway::sendToClient($client_id,json_encode($data));
    }

    /**
     * 切换配送员接单状态
     * @param string $client_id 连接id
     * @param array $message 消息
     * @param object $db 数据库实例
     */
    public function upDateIsGet($client_id,$message,$db)
    {
        $seesion = Gateway::getSession($client_id);
        $delivery_id=$seesion['uid'];
        if($message["flag"]=="open")
        {
            $db->query("UPDATE delivery_information SET is_get=1 WHERE delivery_id='{$delivery_id}'");
            $data=array("action"=>"update_isget","data"=>"open","status"=>1);
            Gateway::sendToClient($client_id,json_encode($data));
        }
        else if($message["flag"]=="close")
        {
            $db->query("UPDATE delivery_information SET is_get=0 WHERE delivery_id='{$delivery_id}'");
            $data=array("action"=>"update_isget","data"=>"close","status"=>1);
            Gateway::sendToClient($client_id,json_encode($data));
        }
    }
}