import { observable, action } from 'mobx'

export class MyselfStore {

    /* 注册变量，使其成为可检测 */
    @observable info //我的地址列表
    @observable nameModal //名字modal


    /* 初始化变量 */
    constructor() {
        this.info = [];
        this.nameModal = false;
    }


    /* 打开modal */
    @action
    openModal = (flag) => {
        if (flag == "name") {
            this.nameModal=true;
            return;
        }
    }

    /* 关闭modal */
    @action
    closeModal=(flag)=>{
        if(flag=="name"){
            this.nameModal=false;
            return;
        }
    }

    /* 更新个人信息 */
    @action
    updateInfo=(flag,data)=>{
        if(flag=="name"){
            this.info.user_name=data;
        }else if(flag=="head"){
            this.info.user_headurl=data;
        }
    }

    /**
     * 网络请求
     * 获取用户信息
     */
    @action
    WsInfo = (status, message) => {
        if (status === 1) {
            this.info = message;
        }
    }
}