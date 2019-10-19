import { observable, action } from 'mobx'

export class MyOrderDetailStore {

    /* 注册变量，使其成为可检测 */
    @observable order


    /* 初始化变量 */
    constructor() {
        this.order = []
    }

    /**
     * 网络请求
     * 获取订单详情
     */
    @action
    WsGetGood = (status, message) => {
        if (status == 1) {
            this.order = message;
        }
    }
}