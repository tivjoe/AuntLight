<?php

use \GatewayWorker\Lib\Gateway;

/**
 * 商家端
 * 账户操作：登录，申请入驻，修改密码
 */
class SellerAccountControl
{
    /**
     * 登陆token生成器
     * 生成20位
     */
    private function tokenGenerator()
    {
         //字符集
        $char=array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
                    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
        $token='';
        //随机生成20位字符串
        for($i=0;$i<20;$i++)
        {
            $n=rand(0,51);
            $token.=$char[$n];
        }
        return $token;
    }

    /**
     * 设置为登录状态
     * @param int $client_id 连接id
     * @param string $user_id 用户id
     */
    private function setLoginStatus($client_id,$user_id)
    {
        Gateway::bindUid($client_id,$user_id);
        Gateway::updateSession($client_id,array('uid'=>$user_id));
    }

    /**
     * 商家登录通过token登录
     * @param int $client_id 连接id
     * @param array $message 客户端发送的消息
     * @param $db 数据库实例
     */
    public function loginForToken($client_id,$message,$db)
    {
        $user=$db->single(" SELECT seller_id FROM seller_login WHERE seller_id='{$message['id']}' AND token='{$message['token']}' ");
        if($user==false)
        {
            //验证失败，token错误
            $data=array('action'=>"login_token",'status'=>"error");
            Gateway::sendToClient($client_id,json_encode($data));
        }
        else
        {
            //设置为登陆状态
            $this->setLoginStatus($client_id,$user);
            $data=[];
            if($message['flag']=="reconnect")
            {
                //断线重新连接
                $data=array('action'=>"login_token",'status'=>1,"flag"=>"recommect");
            }else if($message['flag']=="login")
            {
                //打开app自动登陆
                $data=array('action'=>"login_token",'status'=>1,"flag"=>"login");
            }
            Gateway::sendToUid($user,json_encode($data));
        }
    }

    /**
     * 商家登录
     * @param string $client_id 连接id
     * @param array $message 消息
     * @param object $db 静态的数据库对象实例
     */
    public function loginForAccount($client_id,$message,$db)
    {
        //获取当前seller_id密码
        $seller=$db->single(" SELECT seller_id FROM seller_login WHERE seller_phone='{$message['phoneNumber']}' AND password='{$message['password']}' ");
        if($seller==false)
        {
            //验证失败
            $data=array('action'=>"login_account",'status'=>"no_checking");
            Gateway::sendToClient($client_id,json_encode($data));
            return;
        }
        else
        {
            //验证通过，标记登陆
            $this->setLoginStatus($client_id,$seller);
            //生成一个新的token，并更新数据库token
            $token=$this->tokenGenerator();
            $db->query(" UPDATE seller_login SET token='$token' WHERE seller_id='{$seller}' ");  
            //返回结果
            $data=array('action'=>"login_account","status"=>1,"id"=>$seller,"token"=>$token);
            Gateway::sendToUid($seller,json_encode($data));
        }
    }

    /**
     * 申请入驻
     * @param string $client_id 连接的id
     * @param array  $message 消息
     * @param object $db 静态的数据库对象实例
     * 
     */
    public function applyJoin($client_id,$message,$db)
    {
        //查询当前手机号入驻信息
        $apply=$db->row(" SELECT name,address FROM seller_apply WHERE phone='{$message['phone']}' ");
        //判断是否空
        if(empty($apply))
        {
            $db->query(" INSERT INTO seller_apply ( phone,name,time ) VALUES ( '{$message['phone']}','{$message['name']}',now() ) ");
        }
        else
        {
            $db->query(" UPDATE seller_apply SET name='{$message['name']}',time=now() WHERE phone='{$message['phone']}' ");
        }
        $data=array("action"=>"apply_join","status"=>1);
        Gateway::sendToClient($client_id,json_encode($data));
    }

    /**
     * 修改密码
     * @param int $client_id 连接id
     * @param array $message 客户端发送的消息
     * @param $db 数据库实例
     */
    public function changePassword($client_id,$message,$db)
    {
        
        $seesion=Gateway::getSession($client_id);

        if($message['phoneNumber']!=$seesion['smsPhoneForChangePw'])
        {
            //与接受验证码手机号不符
            $data=array('action'=>"foget_password",'status'=>"no_phone");
            Gateway::sendToClient($client_id,json_encode($data));
            return;
        }
        
        if($message['smsCode']!=$seesion['smsCodeForChangePw']||date('Y-m-d H:i:s',time())>$seesion['smsCodeForChangePwExceedTime'])
        {
            //验证码过期/错误
            $data=array('action'=>"foget_password",'status'=>"no_checking");
            Gateway::sendToClient($client_id,json_encode($data));
            return;
        }
        else
        {
            $user=$db->single(" SELECT seller_id FROM seller_login WHERE seller_phone='{$message['phoneNumber']}' ");
            if($user!=false)
            {
                //一个新的tioken
                $token=$this->tokenGenerator();
                $update=$db->query(" UPDATE seller_login SET password='{$message['newPassword']}',token='{$token}' WHERE seller_id='{$user}' ");  
                // var_dump($update);
                //设置为登录状态
                $this->setLoginStatus($client_id,$user);
                //修改密码成功，返回结果
                $data=array('action'=>"foget_password",'status'=>1,"id"=>$user,'token'=>$token);
                Gateway::sendToUid($user,json_encode($data));
                return;
            }
            else
            {
                //当前手机号未注册
                $data=array('action'=>"foget_password",'status'=>"no_register");
                Gateway::sendToClient($client_id,json_encode($data));
                return;
            }
        }
    }

    /**
     * 获取忘记密码验证码
     * @param int $client_id 连接id
     * @param array $message 客户端发来的消息
     */
    public function smsCodeForChangePw($client_id,$message)
    {
        //随机生成6位验证码
        $smsCode=rand(100000,999999);
        //设置过期时间为5分钟
        $smsCodeExceedTime=date("Y-m-d H:i:s",strtotime("+5 minute"));;
        //加入到seesion保存
        Gateway::updateSession($client_id,array('smsPhoneForChangePw'=>$message['phoneNumber'],'smsCodeForChangePw'=>$smsCode,'smsCodeForChangePwExceedTime'=>$smsCodeExceedTime));
        //获取成功,通知客户端
        print_r($smsCode);
        $data=array('action'=>"smsCode_change_pw",'status'=>1);
        Gateway::sendToClient($client_id,json_encode($data));
    }

}