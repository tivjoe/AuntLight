<?php
use \GatewayWorker\Lib\Gateway;

/**
 * 用户端
 * 地址操作：获取，添加，修改，删除
 */
class ClientAddressControl
{

    /**
     * 获取用户地址信息
     * @param int $client_id 连接id
     * @param $db 数据库实例
     */
    public function getAddress($client_id,$db)
    {
        //获取用户id
        $session=Gateway::getSession($client_id);
        $userId=$session['uid'];

        //查询用户所有地址信息
        $address=$db->query(" SELECT position_Name,house,contact_name,contact_phone,lnt,lat FROM user_address WHERE user_id='{$userId}' ");
        
        //返回数据给
        $data=array('action'=>"get_address",'status'=>1,'data'=>$address);
        Gateway::sendToClient($client_id,json_encode($data));
    }

    /**
     * 添加一个地址
     * @param int $client_id 连接id
     * @param array $message 消息
     * @param $db 数据库实例
     */
    public function addAddress($client_id,$message,$db)
    {
        //获取用户id
        $session=Gateway::getSession($client_id);
        $userId=$session['uid'];

        //将地理坐标字符串分割
        $location=explode(",",$message['location']);
        $lnt=$location[0];
        $lat=$location[1];

        //插入数据库
        $db->query(" INSERT INTO user_address (user_id,position_Name,house,contact_name,contact_phone,lnt,lat,date)
                    VALUES ( '{$userId}','{$message['positionName']}','{$message['houseNumber']}','{$message['contactName']}','{$message['contactPhone']}',{$lnt},{$lat},now() ) ");
        
        //返回数据
        $data=array('action'=>"add_address",'status'=>1);
        Gateway::sendToClient($client_id,json_encode($data));
        return;
    }

    /**
     * 修改地址信息
     * @param int $client_id 连接id
     * @param array $message 客户端发送的消息
     * @param $db 数据库实例
     */
    public function upDateAddress($client_id,$message,$db)
    {

    }

    /**
     * 删除地址信息
     * @param int $client_id 连接id
     * @param array $message 客户端发送的消息
     * @param $db 数据库实例
     */
    public function removeAddress($client_id,$message,$db)
    {

    }
}