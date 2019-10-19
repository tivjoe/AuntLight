<?php
use \GatewayWorker\Lib\Gateway;

/**
 * 用户端
 * 获取商家信息，商家店内的商品
 */
class ClientSellerControl
{
    /**
     * 对商家的一些操作
     */
    private function sellerOperation()
    {

    }

    /**
     * 对商品的操作
     */
    private function goodOperation()
    {

    }

    /**
     * 获取商家，根据分类返回相应的商家
     * @param int $client_id 连接id
     * @param $db 数据库实例
    */
    public function getSeller($client_id,$db)
    {
        //判断是否需要请求分类的商家,并将用户头像一并返回
        $seesion = Gateway::getSession($client_id);
        $seller=$db->query(" SELECT seller_id,seller_name,is_get,class,clicks,level,message,feight,start_money,headurl,lnt,lat FROM seller_information ORDER BY class ");
        $headurl=$db->single(" SELECT user_headurl FROM user_information WHERE user_id='{$seesion['uid']}' ");
        //查询当前用户喜欢的商家
        $likeSeller=$db->query(" SELECT seller_id FROM user_like_seller WHERE user_id='{$seesion['uid']}' ");
        //为seller数组添加一个isHeart属性
        for($i=0;$i<count($seller);$i++)
        {
            $seller[$i]['isHeart']=false;
            $seller[$i]['isFold']=false; //为客户端减少一次循环操作
        }
        //判断seller数组里是否有用户喜欢的商家，如果有将isHeart属性设置为true
        if(empty($likeSeller)==false)
        {
            $count=0;
            while($count<count($likeSeller))
            {
                for($i=0;$i<count($seller);$i++)
                {
                    if($seller[$i]['seller_id']==$likeSeller[$count]['seller_id']&&$seller[$i]['isHeart']==false)
                    {
                        $seller[$i]['isHeart']=true;
                    }
                }
                $count=$count+1;
                print($count);
            }
        }
        //返回数据
        $data=array('action'=>"get_seller_list",'status'=>1,'headurl'=>$headurl,'data'=>$seller);
        Gateway::sendToClient($client_id,json_encode($data));
    }

   /**
     * 获取商家商品
     * @param int $client_id 连接id
     * @param $db 数据库实例 
     * @param $message 消息
     */
    public function getGood($client_id,$message,$db)
    {
        //获取商家分类
        $class=$db->query(" SELECT class_name FROM seller_goods_class WHERE seller_id='{$message['seller_id']}' ");
        //获取商家商品列表
        $goods=$db->query(" SELECT class_name,good_name,good_price,good_url FROM seller_goods WHERE seller_id='{$message['seller_id']}' ");

        //返回数据
        $data=array('action'=>"get_seller_good",'status'=>1,'class'=>$class,'goods'=>$goods);
        Gateway::sendToClient($client_id,json_encode($data));
    }

    /**
     * 获取用户对商家的评论
     * @param int $client_id 连接id
     * @param $db 数据库实例 
     * @param $message 消息
    */
    public function getSellerDiscuss($client_id,$message,$db)
    {
        $discuss=$db->query(" SELECT user_name,user_headurl,text,image_url_1,image_url_2,image_url_3 FROM seller_discuss WHERE seller_id='{$message['seller_id']}' ORDER BY time DESC ");
        $data=array('action'=>"get_seller_discuss",'status'=>1,'data'=>$discuss);
        Gateway::sendToClient($client_id,json_encode($data));
    }

    /**
     * 添加一个用户喜欢的商家
     * @param int $client_id 连接id
     * @param $db 数据库实例 
     * @param $message 消息
    */
    public function addUserLikeSeller($client_id,$message,$db)
    {
        //获取当前连接的用户id
        $seesion = Gateway::getSession($client_id);
        $db->query(" INSERT INTO user_like_seller (user_id,seller_id,seller_name,seller_headurl,time)
        VALUES ( '{$seesion['uid']}','{$message['seller_id']}','{$message['seller_name']}','{$message['seller_headurl']}',now() ) ");
        $data=array('action'=>"add_like_seller",'status'=>1);
        Gateway::sendToClient($client_id,json_encode($data));
    }

    /**
     * 删除一个用户喜欢的商家
     * @param int $client_id 连接id
     * @param $db 数据库实例 
     * @param $message 消息
    */
    public function removeUserLikeSeller($client_id,$message,$db)
    {
        $seesion = Gateway::getSession($client_id);
        $db->query(" DELETE FROM user_like_seller WHERE user_id='{$seesion['uid']}' AND seller_id='{$message['seller_id']}' ");
        $data=array('action'=>"remove_like_seller",'status'=>1);
        Gateway::sendToClient($client_id,json_encode($data));
    }

    /**
     * 获取用户喜欢的商家列表
     * @param int $client_id 连接id
     * @param $db 数据库实例 
     */
    public function getUserLikeSellerList($client_id,$db)
    {
        $seesion = Gateway::getSession($client_id);
        $likeSeller=$db->query(" SELECT seller_id,seller_name,seller_headurl FROM user_like_seller WHERE user_id='{$seesion['uid']}' ");
        $data=array("action"=>"get_like_seller_list","status"=>1,"data"=>$likeSeller);
        Gateway::sendToClient($client_id,json_encode($data));
    }

    /**
     * 获取商家活动
     * @param int $client_id 连接id
     * @param $db 数据库实例 
     */
    public function getSellerActivity($client_id,$db)
    {
        $activity=$db->query(" SELECT activity_id,seller_id,seller_name,seller_headurl,text,image_url_1,image_url_2,image_url_3,time FROM activity ORDER BY time DESC ");
        $data=[];
        if(empty($activity)==false)
        {
            $data=array("action"=>17,"status"=>1,"data"=>$activity);
        }
        else
        {
            $data=array("action"=>17,"status"=>0);
        }
        Gateway::sendToClient($client_id,json_encode($data));
    }
}