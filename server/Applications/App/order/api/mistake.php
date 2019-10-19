<?php

use \GatewayWorker\Lib\Gateway;


/**
 * 订单出现异常
 * 添加到异常订单中/拉取异常订单/对异常订单处理
 */
class OrderForMistake
{

    /**
     * 添加到异常订单中
     * @param string $order_id 订单id
     * @param $db 数据库实例
     */
    public function noDelivery($order_id, $db)
    {
        $db->beginTrans();
        try 
        {
            $isDone = $db->query(" INSERT INTO order_mistake (order_id,mistake_state,get_time) VALUES ( '{$order_id}',0,now() ) ");
        } 
        catch (PDOException $e) 
        {
            print "捕获异常成功，sql出现问题";
        }
        if ( $isDone !== null ) 
        {
            //提交事务
            $db->commitTrans();
            return;
        }
        else 
        {
            //事务回滚
            $db->rollBackTrans();
            return;
        }
    }
}
