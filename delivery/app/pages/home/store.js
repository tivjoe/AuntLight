import { observable, action } from 'mobx'
import { sendWs } from "../../public/Websocket";

export class HomeStore {

    /* 注册变量，使其成为可检测 */
    @observable isGet; //接单状态
    @observable headurl; //头像

    @observable readyingOrder; //待取餐订单列表
    @observable runningOrderl; //配送中订单列表

    @observable refreshingReadying; //取餐刷新状态
    @observable refreshingRunning; //配送中刷新状态

    @observable countReadying; //取餐订单统计
    @observable countRunning; //配送中订单统计

    /* 初始化变量 */
    constructor() {

        this.isGet = false;
        this.headurl = "";

        this.readyingOrder = [];
        this.runningOrderl = [];

        this.refreshingReadying = false;
        this.refreshingRunning = false;

        this.countReadying = 0;
        this.countRunning = 0;

    }

    /**
     * 重新统计订单数
     */
    @action
    reCountOrder = (flag) => {
        if (flag == "ready") {
            this.countReadying = this.readyingOrder.length;
        } else if (flag == "run") {
            this.countRunning = this.runningOrderl.length;
        }
    }

    /**
     * 改变备餐刷新状态
     */
    @action
    changeRefreshingReading = (flag) => {
        if (flag == "start") {
            this.refreshingReadying = true;
        } else if (flag = "stop") {
            this.refreshingReadying = false;
        }
    }

    /**
     * 改变配送中刷新状态
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
     * 获取配送员营业状态
     */
    @action
    WsGetInfo = (status, message) => {
        if (status === 1) {
            if (message.is_get == 1) {
                this.isGet = true;
            } else {
                this.isGet = false;
            }
        }
        this.headurl = message.delivery_headurl;
    }

    /**
     * 网络请求
     * 更改营业状态
     */
    @action
    WsUpdateIsget = (status, message) => {
        if (status === 1) {
            if (message == "open") {
                this.isGet = true;
            } else {
                this.isGet = false;
            }
        }
    }

    /**
     * 网络请求
     * 获取待取餐列表
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
     * 获取配送中订单
     */
    @action
    WsGetRunningOrder = (status, message) => {
        if (status === 1) {
            this.runningOrderl = message;
            this.reCountOrder("run");
            this.changeRefreshingRunning("stop");
        }
    }

    /**
     * 实时网络请求
     * 接收一个新的订单推送
     */
    @action
    WsNowGetNewOrder = (status, message) => {
        if (status === 1) {
            const data = { order_id: message };
            sendWs("get_an_order_detail", data);
        } else {
            //刷新一遍备餐列表
            sendWs("get_all_readying_order");
        }
    }

    /**
     * 实时网络请求
     * 一个新的订单推送过来后
     * 获取到该新订单之后加入到取餐列表中
     */
    @action
    WsGetAnOrderDetail = (status, message) => {
        if (status === 1) {
            this.readyingOrder.push(message);
        } else {
            //刷新一遍取餐列表
            sendWs("get_all_readying_order");
        }
    }

    /**
     * 实时网络请求
     * 配送员取到商品
     */
    @action
    WsDeliveryGetGoods=(status,message)=>{
        if(status===1){
            //从取餐列表中移除该订单
            for(let i=0;i<this.readyingOrder.length;i++){
                if(this.readyingOrder[i].order_id==message){
                    this.readyingOrder.splice(i,1);
                }
            }
            //刷新一遍配送中列表
            this.reCountOrder("ready");
            sendWs("get_all_running_order");
        }
    }

    /**
     * 实时网络请求
     * 配送员送达商品
     */
    @action
    WsDeliveryForOrderDone=(status,message)=>{
        if(status===1){
            //从配送列表中移除该订单
            for(let i=0;i<this.runningOrderl.length;i++){
                if(this.runningOrderl[i].order_id==message){
                    this.runningOrderl.splice(i,1);
                }
            }
            //刷新一遍配送中列表
            sendWs("get_all_running_order");
        }
    }
}