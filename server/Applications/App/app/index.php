<?php

require_once __DIR__ . '/client/index.php';
require_once __DIR__ . '/delivery/index.php';
require_once __DIR__ . '/seller/index.php';
require_once __DIR__ . '/../order/index.php';

use \GatewayWorker\Lib\Gateway;

/**
 * 请求控制路由
 * 相应的请求调用相应的Api
 */
class RequestControlRoute
{

    /**
     * 判断是否认证连接，所应当执行的相应路由
     * @param int $client_id 连接id
     * @param mixed $message 请求消息
     * @param $db 数据库实例
     */
    public function isAuthentication($client_id, $message,$db)
    {
        //判断当前连接seesion数据是否绑定了uid
        if (array_key_exists("uid",Gateway::getSession($client_id))==false)
        {
            $this->noPassActionControl($client_id, $message,$db); //未认证
        } 
        else 
        {
            $this->passActionControl($client_id, $message,$db); //已认证
        }
    }

    /**
     * 连接认证还未通过，有权执行的相关业务路由
     * @param int $client_id 连接id
     * @param mixed $message 请求消息
     * @param $db 数据库实例
     */
    private function noPassActionControl($client_id, $message,$db)
    {
        if ($message['client'] === "client") //客户端
        {
            switch ($message['action']) 
            {
                case "login_token": //通过token登录
                    $clientAccountControl = new ClientAccountControl();
                    $clientAccountControl->loginForToken($client_id, $message['data'],$db);
                    break;
                case "login_account": //通过账号登陆
                    $clientAccountControl = new ClientAccountControl();
                    $clientAccountControl->loginForAccount($client_id, $message['data'],$db);
                    break;
                case "register_account": //通过账号注册
                    $clientAccountControl = new ClientAccountControl();
                    $clientAccountControl->registerForAccount($client_id, $message['data'],$db);
                    break;
                case "foget_password": //忘记密码
                    $clientAccountControl = new ClientAccountControl();
                    $clientAccountControl->changePassword($client_id, $message['data'],$db);
                    break;
                case "smsCode_register": //注册验证码
                    $clientAccountControl = new ClientAccountControl();
                    $clientAccountControl->smsCodeForRegister($client_id,$message['data']);
                    break;
                case "smsCode_change_pw": //忘记密码
                    $clientAccountControl = new ClientAccountControl();
                    $clientAccountControl->smsCodeForChangePw($client_id,$message['data']);
                    break;
            }
        } 
        else if ($message['client'] === "seller") //商家端
        {
            switch ($message['action'])
            {
                case "login_token": //token登陆
                    $sellerAccountControl =new SellerAccountControl();
                    $sellerAccountControl->loginForToken($client_id,$message['data'],$db);
                    break;
                case "login_account": //登录
                    $sellerAccountControl =new SellerAccountControl();
                    $sellerAccountControl->loginForAccount($client_id,$message['data'],$db);
                    break;
                case "apply_join": //申请入驻
                    $sellerAccountControl =new SellerAccountControl();
                    $sellerAccountControl->applyJoin($client_id,$message['data'],$db);
                    break;
                case "foget_password": //忘记密码
                    $sellerAccountControl =new SellerAccountControl();
                    $sellerAccountControl->changePassword($client_id,$message['data'],$db);
                    break;
                case "smsCode_change_pw": //短信验证码
                    $sellerAccountControl =new SellerAccountControl();
                    $sellerAccountControl->smsCodeForChangePw($client_id,$message['data']);
                    break;
            }
        } 
        else if ($message['client'] === "delivery") //配送端
        {
            switch ($message['action'])
            {
                case "login_token": //token登陆
                    $deliveryAccountControl =new DeliveryAccountControl();
                    $deliveryAccountControl->loginForToken($client_id,$message['data'],$db);
                    break;
                case "login_account": //账号登陆
                    $deliveryAccountControl =new DeliveryAccountControl();
                    $deliveryAccountControl->loginForAccount($client_id,$message['data'],$db);
                    break;
                case "register_account": //账号注册
                    $deliveryAccountControl =new DeliveryAccountControl();
                    $deliveryAccountControl->registerForAccount($client_id,$message['data'],$db);
                    break;
                case "foget_password": //忘记密码
                    $deliveryAccountControl =new DeliveryAccountControl();
                    $deliveryAccountControl->changePassword($client_id,$message['data'],$db);
                    break;
                case "smsCode_register": //获取注册验证码
                    $deliveryAccountControl =new DeliveryAccountControl();
                    $deliveryAccountControl->smsCodeForRegister($client_id,$message['data']);
                    break;
                case "smsCode_change_pw": //获取忘记密码验证码
                    $deliveryAccountControl =new DeliveryAccountControl();
                    $deliveryAccountControl->smsCodeForChangePw($client_id,$message['data']);
                    break;
            }
        }
    }

    /**
     * 连接认证通过，有权执行的相关业务路由
     * @param int $client_id 连接id
     * @param mixed $message 请求消息
     * @param $db 数据库实例
     */
    private function passActionControl($client_id, $message,$db)
    {
        if ($message['client'] === "client") //用户端
        {
            switch ($message['action']) 
            {
                case "get_address": //获取地址信息
                    $clientAddressControl = new ClientAddressControl();
                    $clientAddressControl->getAddress($client_id,$db);
                    break;
                case "add_address": //添加地址
                    $clientAddressControl = new ClientAddressControl();
                    $clientAddressControl->addAddress($client_id, $message['data'],$db);
                    break;
                case 6: //修改地址
                    $clientAddressControl = new ClientAddressControl();
                    $clientAddressControl->upDateAddress($client_id, $message['data'],$db);
                    break;   
                case 7: //删除地址
                    $clientAddressControl = new ClientAddressControl();
                    $clientAddressControl->removeAddress($client_id, $message['data'],$db);
                    break; 
                case "get_seller_list": //获取商家
                    $clientSellerControl = new ClientSellerControl();
                    $clientSellerControl->getSeller($client_id,$db);
                    break;
                case "get_seller_good": //获取商品
                    $clientSellerControl = new ClientSellerControl();
                    $clientSellerControl->getGood($client_id,$message['data'],$db);
                    break;
                case "get_qiniu_upload_token": //获取七牛上传凭证
                    clientGetQiniuUploadToken($client_id);
                    break;
                case "get_user_information": //获取用户基本信息
                    $clientInformationControl =new ClientInformationControl();
                    $clientInformationControl->getInformation($client_id,$db);
                    break;
                case "update_head": //修改用户头像
                    $clientInformationControl =new ClientInformationControl();
                    $clientInformationControl->upDateHeadurl($client_id,$message['data'],$db);
                    break;
                case "update_name": //修改用户昵称
                    $clientInformationControl =new ClientInformationControl();
                    $clientInformationControl->upDateName($client_id,$message['data'],$db);
                    break;
                case "get_seller_discuss": //获取商家评论
                    $clientSellerControl = new ClientSellerControl();
                    $clientSellerControl->getSellerDiscuss($client_id,$message['data'],$db);
                    break;
                case "add_like_seller": //添加一个喜欢的商家
                    $clientSellerControl = new ClientSellerControl();
                    $clientSellerControl->addUserLikeSeller($client_id,$message['data'],$db);
                    break;
                case "remove_like_seller": //删除一个喜欢的商家
                    $clientSellerControl = new ClientSellerControl();
                    $clientSellerControl->removeUserLikeSeller($client_id,$message['data'],$db);
                    break;
                case "get_like_seller_list": //获取喜欢的商家列表
                    $clientSellerControl = new ClientSellerControl();
                    $clientSellerControl->getUserLikeSellerList($client_id,$db);
                    break;
                case 17: //获取商家活动
                    $clientSellerControl = new ClientSellerControl();
                    $clientSellerControl->getSellerActivity($client_id,$db);
                    break;
                case "place_an_order": //下单
                    $orderForClient = new OrderForClient();
                    $orderForClient->placeAnOrder($client_id,$message['data'],$db);
                    break;
                case "get_history_order": //获取历史订单
                    $orderForClient = new OrderForClient();
                    $orderForClient->getHistoryOrder($client_id,$message['data'],$db);
                    break;
                case "get_an_order_detail": //获取一个订单详情
                    $orderForClient = new OrderForClient();
                    $orderForClient->getAnOrderDetail($client_id,$message['data'],$db);
                    break;
            }
        }
        else if ($message['client'] === "seller") //商家端
        {
            switch($message['action'])
            {
                case "get_information": //获取店铺信息
                    $sellerInformationControl = new SellerInformationControl;
                    $sellerInformationControl->getInformation($client_id,$db);
                    break;
                case "update_isget": //修改商家营业状态
                    $sellerInformationControl = new SellerInformationControl;
                    $sellerInformationControl->upDateIsGet($client_id,$message['data'],$db);
                    break;
                case "update_information": //修改店铺名字
                    $sellerInformationControl = new SellerInformationControl;
                    $sellerInformationControl->upDateInformation($client_id,$message['data'],$db);
                    break;
                case "update_head": //更新商家头像
                    $sellerInformationControl = new SellerInformationControl;
                    $sellerInformationControl->upDateHeadurl($client_id,$message['data'],$db);
                    break;
                case "get_qiniu_upload_token": //获取七牛上传凭证
                    sellerGetQiniuUploadToken($client_id);
                    break;
                case "get_class_or_goods": //获取店铺的商品和分类列表
                    $sellerGoodsControl =new SellerGoodsControl;
                    $sellerGoodsControl->getGoodsOrClass($client_id,$message['data'],$db);
                    break;
                case 'get_all_goods_class': //获取店铺所以
                    $sellerGoodsControl =new SellerGoodsControl;
                    $sellerGoodsControl->getAllGoodsAndClass($client_id,$db);
                    break;
                case "add_class": //添加一个分类
                    $sellerGoodsControl =new SellerGoodsControl;
                    $sellerGoodsControl->addClass($client_id,$message['data'],$db);
                    break;
                case "update_class": //修改分类名字
                    $sellerGoodsControl =new sellerGoodsControl;
                    $sellerGoodsControl->upDateClass($client_id,$message['data'],$db);
                    break;
                case "delete_class": //删除一个分类
                    $sellerGoodsControl =new sellerGoodsControl;
                    $sellerGoodsControl->deleteClass($client_id,$message['data'],$db);
                    break;
                case "add_good": //添加一个商品
                    $sellerGoodsControl =new SellerGoodsControl;
                    $sellerGoodsControl->addGood($client_id,$message['data'],$db);
                    break;
                case "delete_good": //删除一个商品
                    $sellerGoodsControl =new sellerGoodsControl;
                    $sellerGoodsControl->deleteGood($client_id,$message['data'],$db);
                    break;
                case "update_good": //修改商品信息
                    $sellerGoodsControl =new sellerGoodsControl;
                    $sellerGoodsControl->upDateGood($client_id,$message['data'],$db);
                    break;
                case "get_history_order": //获取历史订单
                    $orderForSeller = new OrderForSeller;
                    $orderForSeller->getHistoryOrder($client_id,$message['data'],$db);
                    break;
                case "get_an_order_detail": //获取一个订单详情
                    $orderForSeller = new OrderForSeller;
                    $orderForSeller->getAnOrderDetail($client_id,$message['data'],$db);
                    break;
                case "get_all_readying_order": //获取全部备餐中订单
                    $orderForSeller = new OrderForSeller;
                    $orderForSeller->getAllReadyingOrder($client_id,$db);
                    break;
                case "get_all_running_order": //获取全部配送中订单
                    $orderForSeller = new OrderForSeller;
                    $orderForSeller->getAllRunningOrder($client_id,$db);
                    break;
            }
        }
        else if ($message['client'] === "delivery") //配送端
        {
            switch($message['action'])
            {
                case "get_information": //获取配送员信息
                    $deliveryInformationControl=new DeliveryInformationControl;
                    $deliveryInformationControl->getInformation($client_id,$db);
                    break;
                case "get_history_order": //获取历史订单
                    $orderForDelivery = new OrderForDelivery;
                    $orderForDelivery->getHistoryOrder($client_id,$message['data'],$db);
                    break;
                case "get_an_order_detail": //获取一个订单详情
                    $orderForDelivery = new OrderForDelivery;
                    $orderForDelivery->getAnOrderDetail($client_id,$message['data'],$db);
                    break;
                case "get_all_readying_order": //获取全部备餐中订单
                    $orderForDelivery = new OrderForDelivery;
                    $orderForDelivery->getAllReadyingOrder($client_id,$db);
                    break;
                case "get_all_running_order": //获取全部配送中订单
                    $orderForDelivery = new OrderForDelivery;
                    $orderForDelivery->getAllRunningOrder($client_id,$db);
                    break;
                case "update_isget": //修改配送员营业状态
                    $deliveryInformationControl=new DeliveryInformationControl;
                    $deliveryInformationControl->upDateIsGet($client_id,$message['data'],$db);
                    break;
                case "delivery_get_goods"://配送员取到商品
                    $orderForDelivery = new OrderForDelivery;
                    $orderForDelivery->orderForTakeGoods($client_id,$message['data'],$db);
                    break;
                case "delivery_order_done"://配送员送达
                    $orderForDelivery = new OrderForDelivery;
                    $orderForDelivery->orderForDone($client_id,$message['data'],$db);
                    break;
            }
        }
    }
}