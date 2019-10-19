import { observable, action } from 'mobx'

export class MyAddressStore {

    /* 注册变量，使其成为可检测 */
    @observable address //我的地址列表


    /* 初始化变量 */
    constructor() {
        this.address=[];
    }

    /**
     * 网络请求
     * 获取用户地址
     */
    @action
    WsAddress = (status, message) => {
        if (status === 1) {
            //更新用户地址
            this.address = message;
        }
    }
}