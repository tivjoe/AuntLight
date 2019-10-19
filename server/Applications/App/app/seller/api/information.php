<?php

require_once __DIR__.'/../../../lib/qiniu/qiniu.php';
use \GatewayWorker\Lib\Gateway;

class SellerInformationControl
{
    /**
     * 获取店铺信息
     * @param string $client_id 连接id
     * @param object $db 数据库实例
     */
    public function getInformation($client_id,$db)
    {
        //获取商家seesion
        $seesion=Gateway::getSession($client_id);
        //查询商家信息
        $information=$db->row(" SELECT is_get,seller_name,headurl,class,seller_addres,level,clicks,blance,all_order_number,turnover,preparing_time,feight,start_money FROM seller_information WHERE seller_id='{$seesion['uid']}' ");
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
    * 更新商家头像
    * @param string $client_id 连接id
    * @param string $message['key'] 图片后缀
    * @param object $db 数据库实例
    */
   public function upDateHeadurl($client_id,$message,$db)
   {
       //获取当前连接的用户id,并查询数据库是否存在url，如果有的的话七牛云进行删除操作
       $seesion = Gateway::getSession($client_id);
       $userHeadurl = $db->single(" SELECT headurl FROM seller_information WHERE seller_id='{$seesion['uid']}' ");
       $headurl = "http://cdn.kuailefn.xyz/".$message['key'];
       if($userHeadurl==true)
       {
               //从七牛云上删除原有头像
               $Qiniu = new Qiniu();
               $Qiniu->deleteImage(substr($userHeadurl,24));
       }
       //更新头像
       $db->query(" UPDATE seller_information SET headurl='{$headurl}' WHERE seller_id='{$seesion['uid']}' ");
       $data=array('action'=>"update_head",'status'=>1);
       Gateway::sendToClient($client_id,json_encode($data));
   }

    /**
     * 更新店铺名字，配送费，起送费，备餐时间
     * @param string $client_id 连接id
     * @param array $message 消息
     * @param object $db 数据库实例
     */
    public function upDateInformation($client_id,$message,$db)
    {
        $seesion = Gateway::getSession($client_id);
        $db->query(" UPDATE seller_information 
                    SET seller_name='{$message['seller_name']}',feight='{$message['feight']}',preparing_time='{$message['preparing_time']}',start_money='{$message['start_money']}' 
                    WHERE seller_id='{$seesion['uid']}' ");
        $data=array("action"=>"update_information","status"=>1);
        Gateway::sendToClient($client_id,json_encode($data));
    }

    /**
     * 切换商家营业状态
     * @param string $client_id 连接id
     * @param array $message 消息
     * @param object $db 数据库实例
     */
    public function upDateIsGet($client_id,$message,$db)
    {
        $seesion = Gateway::getSession($client_id);
        $seller_id=$seesion['uid'];
        if($message["flag"]=="open")
        {
            $db->query("UPDATE seller_information SET is_get=1 WHERE seller_id='{$seller_id}'");
            $data=array("action"=>"update_isget","data"=>"open","status"=>1);
            Gateway::sendToClient($client_id,json_encode($data));
        }
        else if($message["flag"]=="close")
        {
            $db->query("UPDATE seller_information SET is_get=0 WHERE seller_id='{$seller_id}'");
            $data=array("action"=>"update_isget","data"=>"close","status"=>1);
            Gateway::sendToClient($client_id,json_encode($data));
        }
    }

}