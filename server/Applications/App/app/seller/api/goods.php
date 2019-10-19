<?php

require_once __DIR__.'/../../../lib/qiniu/qiniu.php';
use \GatewayWorker\Lib\Gateway;


/**
 * 商家端
 * 商品操作：获取商品，分类；商品和分类的添加，删除，修改
 */
class SellerGoodsControl
{
    /**
     * 获取店铺分类或者指定商品列表
     * @param string $client_id 连接id
     * @param string $message['flag'] class获取分类；goods指定分类的商品列表
     * @param object $db 数据库实例
     */
    public function getGoodsOrClass($client_id,$message,$db)
    {
        //获取当前连接的seesion
        $seesion=Gateway::getSession($client_id);
        if($message['flag']=="class")
        {
            //查询商家分类
            $class=$db->query(" SELECT class_name,count_goods FROM seller_goods_class WHERE seller_id='{$seesion['uid']}' ");
            $data=array("action"=>"get_class","status"=>1,"class"=>$class);
            Gateway::sendToClient($client_id,json_encode($data));
            return;
        }
        else if($message['flag']=="goods")
        {
            //查询商家指定分类的商品
            $goods=$db->query(" SELECT good_name,good_price,good_url,is_out,class_name FROM seller_goods WHERE seller_id='{$seesion['uid']}' AND class_name='{$message['class']}' ");
            $data=array("action"=>"get_goods","status"=>1,"class"=>$message['class'],"goods"=>$goods);
            Gateway::sendToClient($client_id,json_encode($data));
            return;
        }
    }

    /**
     * 获取商家全部分类和商品
     * @param string $client_id 连接id
     * @param string $message['flag'] class获取分类；goods指定分类的商品列表
     * @param object $db 数据库实例
     */
    public function getAllGoodsAndClass($client_id,$db)
    {
        //获取当前连接的seesion
        $seesion=Gateway::getSession($client_id);
        //获取商家分类
        $class=$db->query(" SELECT class_name FROM seller_goods_class WHERE seller_id='{$seesion['uid']}' ");
        //获取商家商品列表
        $goods=$db->query(" SELECT class_name,good_name,good_price,good_url FROM seller_goods WHERE seller_id='{$seesion['uid']}' ");
        //返回数据
        $data=array('action'=>"get_all_goods_class",'status'=>1,'class'=>$class,'goods'=>$goods);
        Gateway::sendToClient($client_id,json_encode($data));
    }

    /**
     * 添加一个分类
     * @param string $client_id 连接id
     * @param string $messag['class_name'] 添加的分类名字
     * @param object $db
     */
    public function addClass($client_id,$message,$db)
    {
        //获取当前连接的seesion
        $seesion=Gateway::getSession($client_id);
        //查询当前店铺是否存在该分类名
        $res=$db->row(" SELECT class_name,count_goods FROM seller_goods_class WHERE seller_id='{$seesion['uid']}' AND class_name='{$message['class_name']}' ");
        $data=[];
        //为true说明分类名字重复
        if(empty($res))
        {
            $db->query(" INSERT INTO seller_goods_class (seller_id,class_name,count_goods,time) VALUES ('{$seesion['uid']}','{$message['class_name']}',0,now()) ");
            $class_info=array("class_name"=>$message['class_name'],"count_goods"=>0);
            $data=array("action"=>"add_class","status"=>1,"data"=>$class_info);
        }
        else
        {
            $data=array("action"=>"add_class","status"=>"class_repeat");
        }
        Gateway::sendToClient($client_id,json_encode($data));
    }

    /**
     * 修改分类名字
     * @param string $client_id 连接id
     * @param string $message 消息
     * @param object $db 数据库实例
     */
    public function upDateClass($client_id,$message,$db)
    {
        //获取当前连接的session 
        $seesion=Gateway::getSession($client_id);
        //查询是否存在这个分类
        $res=$db->row(" SELECT class_name,count_goods FROM seller_goods_class WHERE seller_id='{$seesion['uid']}' AND class_name='{$message['class_name']}' ");
        //判断查询结果
        if(empty($res)==false)
        {
            //修改当前分类名字并且修改该分类下的所有商品所属分类名
            $db->beginTrans();
            try
            {
                $isClass=$db->query(" UPDATE seller_goods_class SET class_name='{$message['new_name']}' WHERE seller_id='{$seesion['uid']}' AND class_name='{$message['class_name']}' ");
                $isGoods=$db->query(" UPDATE seller_goods SET class_name='{$message['new_name']}' WHERE seller_id='{$seesion['uid']}' AND class_name='{$message['class_name']}' ");
            }
            catch (PDOException $e)
            {
                print "捕获异常成功，sql出现问题";
            }
            if( $isClass!==null&&$isGoods!==null)
            {
                //提交事务
                $db->commitTrans();
                $data=array("action"=>"update_class","status"=>1,"data"=>$message['new_name']);
                Gateway::sendToClient($client_id,json_encode($data));
                return;
            }
            else
            {
                //事务回滚，返回错误
                $db->rollBackTrans();
                $data=array("action"=>"update_class","status"=>"error");
                Gateway::sendToClient($client_id,json_encode($data));
                return;
            }
        }
        else
        {
            //分类名重复
            $data=array("action"=>"update_class","status"=>"class_reapt");
            Gateway::sendToClient($client_id,json_encode($data));
            return;
        }
    }

    /**
     * 删除一个分类
     * @param string $client_id 连接id
     * @param array $message['class_name'] 要删除的分类名
     * @param object $db 数据库实例
     */
    public function deleteClass($client_id,$message,$db)
    {
        //获取当前连接的session
        $seesion=Gateway::getSession($client_id);
        //查询是否存在这个分类
        $res=$db->row(" SELECT class_name,count_goods FROM seller_goods_class WHERE seller_id='{$seesion['uid']}' AND class_name='{$message['class_name']}' ");
        //判断查询结果
        if(empty($res)==false)
        {
            //删除当前分类并且删除该分类下的所有商品
            $db->beginTrans();
            try
            {
                $isClass=$db->query(" DELETE FROM seller_goods_class WHERE seller_id='{$seesion['uid']}' AND class_name='{$message['class_name']}' ");
                $isGoods=$db->query(" DELETE FROM seller_goods WHERE seller_id='{$seesion['uid']}' AND class_name='{$message['class_name']}' ");
            }
            catch (PDOException $e)
            {
                print "捕获异常成功，sql出现问题";
            }
            if( $isClass!==null&&$isGoods!==null)
            {
                //提交事务
                $db->commitTrans();
                $data=array("action"=>"delete_class","status"=>1,"data"=>$message['class_name']);
                Gateway::sendToClient($client_id,json_encode($data));
                return;
            }
            else
            {
                //事务回滚，返回错误
                $db->rollBackTrans();
                $data=array("action"=>"delete_class","status"=>"error");
                Gateway::sendToClient($client_id,json_encode($data));
                return;
            }
        }
        else
        {
            $data=array("action"=>"delete_class","status"=>"no_class");
            Gateway::sendToClient($client_id,json_encode($data));
            return;
        }
    }

    /**
     * 添加一个商品
     * @param string $client_id 连接id
     * @param array $message 消息
     * @param object $db 数据库实例
     */
    public function addGood($client_id,$message,$db)
    {
        //获取当前连接的seesion
        $seesion=Gateway::getSession($client_id);
        $url="http://cdn.kuailefn.xyz/".$message['good_url'];
        //查询是否存在这个所属分类,和商品名字是否重复
        $resClass=$db->row(" SELECT class_name FROM seller_goods_class WHERE seller_id='{$seesion['uid']}' AND class_name='{$message['class_name']}' ");
        $resGood=$db->row(" SELECT class_name,good_name FROM seller_goods WHERE seller_id='{$seesion['uid']}' AND good_name='{$message['good_name']}' ");
        //判断查询结果
        if(empty($resClass)==false&&empty($resGood)==true)
        {
            //插入新的商品
            $db->beginTrans();
            try
            {
                $isGoods=$db->query(" INSERT INTO seller_goods (seller_id,is_out,class_name,good_name,good_price,good_url,time) 
                VALUES ('{$seesion['uid']}',1,'{$message['class_name']}','{$message['good_name']}',{$message['good_price']},'{$url}',now()) ");
                $isClass=$db->query(" UPDATE seller_goods_class SET count_goods=count_goods+1 WHERE seller_id='{$seesion['uid']}' AND class_name='{$message['class_name']}' ");
            }
            catch (PDOException $e)
            {
                print "捕获异常成功，sql出现问题";
            }
            if($isClass!==null&&$isGoods!==null)
            {
                //提交事务
                $db->commitTrans();
                $data=array("action"=>"add_good","status"=>1);
                Gateway::sendToClient($client_id,json_encode($data));
                return;
            }
            else
            {
                //事务回滚，返回错误
                $db->rollBackTrans();
                $data=array("action"=>"add_good","status"=>"error");
                Gateway::sendToClient($client_id,json_encode($data));
                return;
            }
        }
        else
        {
            $data=array("action"=>"add_good","status"=>"no_class_or_good");
            Gateway::sendToClient($client_id,json_encode($data));
        }
    }

    /**
     * 删除一个商品
     * @param string $client_id 连接id
     * @param string $message['class_name'] 消息
     * @param object $db 连接的数据库实例
     */
    public function deleteGood($client_id,$message,$db)
    {
        //获取当前连接点seesion
        $seesion=Gateway::getSession($client_id);
        //查询是否存在这个分类和这个商品
        $resClass=$db->row(" SELECT class_name,count_goods FROM seller_goods_class WHERE seller_id='{$seesion['uid']}' AND class_name='{$message['class_name']}' ");
        $resGood=$db->row(" SELECT class_name,good_name,good_url FROM seller_goods WHERE seller_id='{$seesion['uid']}' AND good_name='{$message['good_name']}' AND class_name='{$message['class_name']}' ");
        //判断查询结果
        if(empty($resClass)==false&&empty($resGood)==false)
        {
            //删除当前商品，并所属分类计数-1
            $db->beginTrans();
            try
            {
                $isGoods=$db->query(" DELETE FROM seller_goods WHERE seller_id='{$seesion['uid']}' AND class_name='{$message['class_name']}' AND good_name='{$message['good_name']}' ");
                $isClass=$db->query(" UPDATE seller_goods_class SET count_goods=count_goods-1 WHERE seller_id='{$seesion['uid']}' AND class_name='{$message['class_name']}' ");
            }
            catch (PDOException $e)
            {
                print "捕获异常成功，sql出现问题";
            }
            if($isClass!==null&&$isGoods!==null)
            {
                //提交事务
                $db->commitTrans();
                $Qiniu = new Qiniu();
                $Qiniu->deleteImage(substr($resGood['good_url'],24));
                $data=array("action"=>"delete_good","status"=>1);
                Gateway::sendToClient($client_id,json_encode($data));
                return;
            }
            else
            {
                //事务回滚，返回错误
                $db->rollBackTrans();
                $data=array("action"=>"delete_good","status"=>"error");
                Gateway::sendToClient($client_id,json_encode($data));
                return;
            }
        }
        else
        {
            $data=array("action"=>"delete_good","status"=>"no_class_or_good");
            Gateway::sendToClient($client_id,json_encode($data));
        }
    }

    /**
     * 修改商品信息
     * @param string $client_id 当前连接的id
     * @param string $message 消息
     * @param object $db 数据库实例
     */
    public function upDateGood($client_id,$message,$db)
    {
        //获取当前连接的session 
        $seesion=Gateway::getSession($client_id);
        //查询是否存在这个分类
        $resClass=$db->row(" SELECT class_name,count_goods FROM seller_goods_class WHERE seller_id='{$seesion['uid']}' AND class_name='{$message['old_class']}' ");
        $resGood=$db->row(" SELECT class_name,good_name,good_url FROM seller_goods WHERE seller_id='{$seesion['uid']}' AND good_name='{$message['old_name']}' AND class_name='{$message['old_class']}' ");
        //判断查询结果
        if(empty($resClass)==false&&empty($resGood)==false)
        {
            if($message['good_url']!=$resGood['good_url']){
                $message['good_url']= "http://cdn.kuailefn.xyz/".$message['good_url'];
                //从七牛云上删除原有url
                $Qiniu = new Qiniu();
                $Qiniu->deleteImage(substr($resGood['good_url'],24));
            }
            //修改商品信息
            $db->query(" UPDATE seller_goods SET class_name='{$message['class_name']}',good_name='{$message['good_name']}',good_price='{$message['good_price']}',good_url='{$message['good_url']}',is_out='{$message['is_out']}' 
            WHERE seller_id='{$seesion['uid']}' AND class_name='{$message['old_class']}' AND good_name='{$message['old_name']}' ");
            if($message['class_name']!=$message['old_class'])
            {
                //老类计数-1，新类计数+1
                $db->query(" UPDATE seller_goods_class SET count_goods=count_goods-1 WHERE seller_id='{$seesion['uid']}' AND class_name='{$message['old_class']}' ");
                $db->query(" UPDATE seller_goods_class SET count_goods=count_goods+1 WHERE seller_id='{$seesion['uid']}' AND class_name='{$message['class_name']}' ");
            }
            $data=array("action"=>"update_good","status"=>1);
            Gateway::sendToClient($client_id,json_encode($data));
            return;
        }
        else
        {
            $data=array("action"=>"update_good","status"=>"no_class_or_good");
            Gateway::sendToClient($client_id,json_encode($data));
            return;
        }
    }
}