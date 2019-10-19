<?php

use \GatewayWorker\Lib\Gateway;

/**
 * 用户端
 * 账户操作：登录，注册，修改密码
 */
class ClientAccountControl
{
    /**
     * 用户唯一ID生成 
     * 4位随机字符+10位时间戳+4位随机数字
     */
    private function idGenerator()
    {
        //字符集
        $char=array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
                    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
        $randomStr='';
        $randomNumber=rand(1000,9999);
        //随机生成4位字符串
        for($i=0;$i<4;$i++)
        {
            $n=rand(0,51);
            $randomStr.=$char[$n];
        }
        //拼接字符串
        $userId=$randomStr.time().$randomNumber;
        return $userId;
    }

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
     * 用户登录通过token登录
     * @param int $client_id 连接id
     * @param array $message 客户端发送的消息
     * @param $db 数据库实例
     */
    public function loginForToken($client_id,$message,$db)
    {
        print_r($message);
        $user=$db->single(" SELECT user_id FROM user_login_phone WHERE user_id='{$message['id']}' AND token='{$message['token']}' ");
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
     * 用户登录通过账号登陆
     * @param int $client_id 连接id
     * @param array $message 客户端发送的消息
     * @param $db 数据库实例
     */
    public function loginForAccount($client_id,$message,$db)
    {

        $phone=$db->single(" SELECT user_phone FROM user_login_phone WHERE user_phone='{$message['phoneNumber']}' ");
        if($phone==false)
        {
            //未注册
            $data=array('action'=>"login_account",'status'=>"no_register");
            Gateway::sendToClient($client_id,json_encode($data));
            return;
        }

        $user=$db->single(" SELECT user_id FROM user_login_phone WHERE user_phone='{$message['phoneNumber']}' AND user_password='{$message['password']}' ");
        var_dump($user);
        if($user==false)
        {
            //密码或者手机号错误
            $data=array('action'=>"login_account",'status'=>"no_checking");
            Gateway::sendToClient($client_id,json_encode($data));
            return;
        }
        else
        {
            //验证通过，标记登陆
            $this->setLoginStatus($client_id,$user);
            //生成一个新的token，并更新数据库token
            $token=$this->tokenGenerator();
            $db->query(" UPDATE user_login_phone SET token='$token' WHERE user_id='{$user}' ");  
            //返回结果
            $data=array('action'=>"login_account","status"=>1,"id"=>$user,"token"=>$token);
            Gateway::sendToUid($user,json_encode($data));
        }
    }

    /**
     * 新用户通过账号注册
     * @param int $client_id 连接id
     * @param array $message 客户端发送的消息
     * @param $db 数据库实例
     */
    public function registerForAccount($client_id,$message,$db)
    {
        $seesion=Gateway::getSession($client_id);
        
        if($message['phoneNumber']!=$seesion['smsPhoneForRegister'])
        {
            //与接收短信手机号不符
            $data=array('action'=>"register_account",'status'=>"no_phone");
            Gateway::sendToClient($client_id,json_encode($data));
            return;
        }
        
        if($message['smsCode']!=$seesion['smsCodeForRegister']||date('Y-m-d H:i:s',time())>$seesion['smsCodeForRegisterExceedTime'])
        {
            //验证码过期/错误
            $data=array('action'=>"register_account",'status'=>"no_checking");
            Gateway::sendToClient($client_id,json_encode($data));
            return;
        }
        else
        {
            $phone=0;//$db->single(" SELECT user_phone FROM user_login_phone WHERE user_phone='{$message['phoneNumber']}' ");
            //如果为空，说明当前手机号未注册
            if($phone==0)//false)
            {
                //生成一个唯一的用户ID,生成token
                $userId=$this->idGenerator();
                $token=$this->tokenGenerator();
                //向数据库中添加新的用户信息，开启事务
                $db->beginTrans();
                try
                {
                    $isLoph=$db->query(" INSERT INTO user_login_phone (user_id,user_phone,user_password,token,register_date)
                            VALUES ( '{$userId}','{$message['phoneNumber']}','{$message['password']}','{$token}',now() ) ");
                    $isInfo=$db->query("INSERT INTO user_information (user_id,user_phone,user_name,user_headurl,user_au,user_count_orders,user_count_outlay,register_way) 
                            VALUES ('{$userId}','{$message['phoneNumber']}','楼下阿姨','0',0,0,0,0) ");
                }
                catch (PDOException $e)
                {
                    print "捕获异常成功，sql出现问题";
                }
                // $isInfo= $db->insert('user_information')->cols(array(
                //     'user_id'=>$userId,
                //     'user_phone'=>$message['phoneNumber'],
                //     'user_name'=>'楼下阿姨',
                //     'user_headurl'=>'0',
                //     "user_au"=>0,
                //     "user_count_orders"=>0,
                //     "user_count_outlay"=>0,
                //     "register_way"=>0))->query();
                var_dump($isLoph);
                var_dump($isInfo); 
                if($isLoph!==null&&$isInfo!==null)
                {
                    //提交事务
                    $db->commitTrans();
                    //设置为登录状态
                    $this->setLoginStatus($client_id,$userId);
                    //注册成功
                    $data=array('action'=>"register_account",'status'=>1,"id"=>$userId,"token"=>$token);
                    Gateway::sendToClient($client_id,json_encode($data));
                    return;
                }
                else
                {
                    //事务回滚，返回错误
                    $db->rollBackTrans();
                    $data=array('action'=>"register_account",'status'=>"error");
                    Gateway::sendToClient($client_id,json_encode($data));
                    return;
                }
            }
            else
            {
                //当前手机号已被注册
                $data=array('action'=>"register_account",'status'=>"have_phone");
                Gateway::sendToClient($client_id,json_encode($data));
                return;
            }
        }
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
            $user=$db->single(" SELECT user_id FROM user_login_phone WHERE user_phone='{$message['phoneNumber']}' ");
            if($user!=false)
            {
                //一个新的tioken
                $token=$this->tokenGenerator();
                $update=$db->query(" UPDATE user_login_phone SET user_password='{$message['newPassword']}',token='{$token}' WHERE user_id='{$user}' ");  
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
     * 获取注册验证码
     * @param int $client_id 连接id
     * @param array $message 客户端发来的消息
     */
    public function smsCodeForRegister($client_id,$message)
    {
        //随机生成6位验证码
        $smsCode=rand(100000,999999);
        //设置过期时间为5分钟
        $smsCodeExceedTime=date("Y-m-d H:i:s",strtotime("+5 minute"));;
        //加入到seesion保存
        Gateway::updateSession($client_id,array('smsPhoneForRegister'=>$message['phoneNumber'],'smsCodeForRegister'=>$smsCode,'smsCodeForRegisterExceedTime'=>$smsCodeExceedTime));
        //获取成功,通知客户端
        print_r($smsCode);
        $data=array('action'=>"smsCode_register",'status'=>1);
        Gateway::sendToClient($client_id,json_encode($data));
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