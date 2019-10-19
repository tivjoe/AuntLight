import { observable, action } from 'mobx'
import { Alert } from 'react-native';
import NavigationService from '../../public/NavigationService';

export class LoginStore {

     /* 注册变量，使其成为可检测 */
     @observable loginStatus; //登陆板块状态
     @observable registerStatus; //注册板块状态
     @observable fogetPwStatus; //忘记密码板块状态

      /* 初始化变量 */
    constructor() {
        this.loginStatus = true;
        this.registerStatus = false;
        this.fogetPwStatus = false;
        this.phoneNumber="";
        this.passWord="";
    }

    /* 显示登陆板块 */
    @action
    showLogin = () => {
        //改变相应板块状态
        if (this.loginStatus == false) {
            this.loginStatus = true;
            this.registerStatus = false;
        }
    };

    /* 显示注册板块 */
    @action
    showRegister = () => {
        //改变相应板块状态 
        if (this.registerStatus == false) {
            this.registerStatus = true;
            this.loginStatus = false;
        }
    };

    /* 显示忘记密码板块 */
    @action
    showForgetPw = () => {
        this.fogetPwStatus = true;
    }

    /* 隐藏忘记密码板块 */
    @action
    hiddenForgetPw = () => {
        this.fogetPwStatus = false;
    }

    /* 设置登陆信息 */
    setLoginInfo=(phone,pw)=>{
        this.phoneNumber=phone;
        this.passWord=pw;
    }

    /* 用户信息存入本地 */
    userInfoStorage=(id,token)=>{
        storage.save({
            key: 'sellerInfo', // 注意:请不要在key中使用_下划线符号!
            data: {
                id:id,
                token:token
            },
            expires: null
        });
    }

    /**
     * 接收网络请求结果接口
     * 处理登陆
     */
    WsLogin = (status,id,token) => {
        if (status === 1) {
            //登陆成功，跳转到首页,并存入本地
            this.userInfoStorage(id,token);
            NavigationService.navigate('App');
        } else if (status === "no_checking") {
            Alert.alert("提示", "账户或者密码错误")
        }
    }

    /**
     * 接收网络请求结果接口
     * 处理注册
     * @param int status 0:失败 1:成功 2:手机号码与预留短信不符 3：验证码错误或者过期 4:当前手机号已经注册
     */
    WsApplyJoin = (status) => {
        Alert.alert("提示", "我们会在一个工作日内联系您")
    }

    /**
     * 接收网络请求结果接口
     * 忘记密码
     * @param int status 0:失败 1:成功 2:手机号码与预留短信不符 3：验证码错误或者过期 4:当前手机号没有注册
     */
    WsFogetPw = (status,id,token) => {
        if (status === 1) {
            //登陆成功，跳转到首页,并存入本地
            this.userInfoStorage(id,token);
            NavigationService.navigate('App');
        } else if (status === "no_phone") {
            Alert.alert("提示", "手机号与发送验证码手机号不符")
        } else if (status === "no_checking") {
            Alert.alert("提示", "验证码错误或者过期")
        } else if (status === "no_register") {
            Alert.alert("提示", "当前手机号没有注册")
        }
    }
}