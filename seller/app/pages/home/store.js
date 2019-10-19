import { observable, action } from 'mobx'
import { sendWs } from "../../public/Websocket"

export class HomeStore {

    /* 注册变量，使其成为可检测 */
    @observable showModalGoods; //查看商品列表
    @observable isGet; //是否营业
    @observable headurl; //商家头像

    @observable readyingOrder; //待备餐订单列表
    @observable runningOrder; //配送中订单列表
    @observable showGoodsInfo; //显示的商品信息

    @observable refreshingReadying; //备餐刷新状态
    @observable refreshingRunning; //配送中刷新状态

    @observable countReadying; //备餐订单统计
    @observable countRunning; //配送中订单统计

    /* 初始化变量 */
    constructor() {
        this.showModalGoods = false;
        this.isGet = false;
        this.headurl="";

        this.readyingOrder = [];
        this.runningOrder = [];
        this.showGoodsInfo = [];

        this.refreshingReadying = false;
        this.refreshingRunning = false;

        this.countReadying = 0;
        this.countRunning = 0;
    }


    /* 打开modal */
    @action
    openModal = (flag, list_flag, order_index) => {
        if (flag == "goods") {
            this.showGoodsInfo = {
                list_flag: list_flag,
                order_index: order_index
            }
            this.showModalGoods = true;
        }
    }

    /* 关闭modal */
    @action
    closeModal = (flag) => {
        if (flag == "goods") {
            this.showGoodsInfo = [];
            this.showModalGoods = false;
        }
    }

    /**
     * 改变备餐刷新状态
     */
    @action
    changeRefreshingReading = (flag) => {
        if (flag == "start") {
            this.refreshingReadying = true;
        } else if (flag == "stop") {
            this.refreshingReadying = false;
        }
    }

    /**
     * 重新统计订单数
     */
    @action
    reCountOrder = (flag) => {
        if (flag == "ready") {
            this.countReadying = this.readyingOrder.length;
        } else if (flag == "run") {
            this.countRunning = this.runningOrder.length;
        }
    }

    /**
     * 改变配送刷新状态
     */
    @action
    changeRefreshingRunning = (flag) => {
        if (flag == "start") {
            this.refreshingRunning = true;
        } else if (flag == "stop") {
            this.refreshingRunning = false;
        }
    }

    /**
     * 网络请求
     * 获取商家营业状态
     */
    @action
    WsGetInfo=(status,message)=>{
        if(status===1){
            if(message.is_get==1){
                this.isGet=true;
            }else{
                this.isGet=false;
            }
            this.headurl=message.headurl;
        }
    }

    /**
     * 网络请求
     * 更改营业状态
     */
    @action
    WsUpdateIsget=(status,message)=>{
        if(status===1){
            if(message=="open"){
                this.isGet=true;
            }else{
                this.isGet=false;
            }
        }
    }

    /**
     * 网络请求
     * 获取待备餐订单列表
     */
    @action
    WsGetReadyingOrder = (status, message) => {
        if (status === 1) {
            this.readyingOrder = message;
            this.reCountOrder("ready");
            this.changeRefreshingReading("stop");
        }
    }

    /**
     * 网络请求
     * 获取配送中列表
     */
    @action
    WsGetRunningOrder = (status, message) => {
        if (status === 1) {
            this.runningOrder = message;
            this.reCountOrder("run");
            this.changeRefreshingRunning("stop");
        }
    }

    /**
     * 实时网络请求
     * 一个新订单推送过来之后
     * 获取到该新订单之后加入到备餐列表中
     */
    @action
    WsGetAnOrderDetail = (status, message) => {
        if (status === 1) {
            this.readyingOrder.push(message);
        } else {
            //刷新一遍备餐列表
            sendWs("get_all_readying_order");
        }
    }

    /**
     * 实时网络请求
     * 接收一个新的订单推送
     */
    @action
    WsNowGetNewOrder = (status, message) => {
        if (status === 1) {
            const data = { order_id: message,flag:"home" }
            sendWs("get_an_order_detail", data);
        } else {
            //刷新一遍备餐列表
            sendWs("get_all_readying_order");
        }
    }
}