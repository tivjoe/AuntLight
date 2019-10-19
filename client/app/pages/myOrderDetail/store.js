import { observable, action } from 'mobx'

export class MyOrderDetailStore {

    /* 注册变量，使其成为可检测 */
    @observable info//订单信息
    @observable goods //商品


    /* 初始化变量 */
    constructor() {
        this.info = []
        this.goods = []
    }

    /**
     * 初始化info
     */
    @action
    infoConstructor = (info) => {
        this.info = info;
    }

    /**
     * 网络请求
     * 获取订单详情
     */
    @action
    WsGetGood = (status, message) => {
        if (status == 1) {
            this.goods = message;
        }
    }
}