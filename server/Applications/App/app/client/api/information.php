<?php
require_once __DIR__.'/../../../lib/qiniu/qiniu.php';
use \GatewayWorker\Lib\Gateway;

/**
 * 用户端
 * 用户信息操作：获取用户信息,更改呢称，更改头像
 */
class ClientInformationControl
{
    /**
     * 获取用户信息
     * @param int $client_id 连接id
     * @param mixed $db 数据库实例
     */
    public function getInformation($client_id,$db)
    {
        //获取用户id
        $seesion = Gateway::getSession($client_id);
        //查询数据库，返回结果给客户端
        $information=$db->row(" SELECT user_name,user_headurl,user_au,user_count_orders,user_count_outlay FROM user_information WHERE user_id='{$seesion['uid']}' ");
        //返回数据给
        $data=array('action'=>"get_user_information",'status'=>1,'data'=>$information);
        Gateway::sendToClient($client_id,json_encode($data));
    }

    /**
     * 更新用户头像
     * @param int $client_id 连接id
     * @param array $message 客户端发送的消息
     * @param mixed $db 数据库实例
     */
    public function upDateHeadurl($client_id,$message,$db)
    {
        //获取当前连接的用户id,并查询数据库是否存在url，如果有的的话七牛云进行删除操作
        $seesion = Gateway::getSession($client_id);
        $userHeadurl = $db->single(" SELECT user_headurl FROM user_information WHERE user_id='{$seesion['uid']}' ");
        $headurl = "http://cdn.kuailefn.xyz/".$message['key'];
        if($userHeadurl==true)
        {
                //从七牛云上删除原有头像
                $Qiniu = new Qiniu();
                $Qiniu->deleteImage(substr($userHeadurl,24));
        }
        //更新头像
        $db->query(" UPDATE user_information SET user_headurl='{$headurl}' WHERE user_id='{$seesion['uid']}' ");
        $data=array('action'=>"update_head",'status'=>1);
        Gateway::sendToClient($client_id,json_encode($data));
    }

    /**
     * 更新用户昵称
     * @param int $client_id 连接id
     * @param array $message 客户端发送的消息
     * @param mixed $db 数据库实例
     */
    public function upDateName($client_id,$message,$db)
    {
        //获取当前连接的uid
        $seesion = Gateway::getSession($client_id);
        //更新用户名
        $db->query(" UPDATE user_information SET user_name='{$message['name']}' WHERE user_id='{$seesion['uid']}' ");
        $data=array('action'=>"update_name",'status'=>1);
        Gateway::sendToClient($client_id,json_encode($data));
    }
}
