import { observable, action } from "mobx";
import NavigationService from '../../public/NavigationService';
import { WXTip } from 'react-native-wxtip';

export class ConfimOrderStore {

    /* 注册变量，使其成为可检测 */
    @observable seller_id //商家id
    @observable startMoney //起送费
    @observable feight //配送费
    @observable goodTotalPrice //总价
    @observable shopCar //购物车列表
    @observable payMoney //支付的钱 

    @observable address //送货地址
    @observable remake //订单备注
    @observable payMethod //支付方式
    @observable myAddressList //我的地址列表

    @observable addressModal //地址modal
    @observable payModal //支付modal
    @observable remakeModal //备注modal


    /* 初始化变量 */
    constructor() {
        this.seller_id = "";
        this.startMoney = 0;
        this.feight = 0;
        this.goodTotalPrice = 0;
        this.shopCar = [];
        this.payMoney = 0;

        this.address = [];
        this.remake = "";
        this.payMethod = "alipay";
        this.myAddressList = [];

        this.addressModal = false;
        this.payModal = false;
        this.remake = false
    }


    /* 接收购物车传来的值初始化 */
    @action
    constructorOrderInfo = (seller_id, startMoney, feight, goodTotalPrice, shopCar) => {
        this.seller_id = seller_id;
        this.startMoney = startMoney;
        this.feight = feight;
        this.goodTotalPrice = goodTotalPrice;
        this.shopCar = shopCar;
        this.payMoney = this.goodTotalPrice + this.feight;
        this.payMoney = parseFloat(this.payMoney.toFixed(2));
    }

    /* 返回购物车页面 */
    goBack = () => {
        NavigationService.back();
    }

    /* 打开modal */
    @action
    openModal = (flag) => {
        if (flag === "address") {
            //打开地址modal
            this.addressModal = true;
            return;
        } else if (flag === "pay") {
            //打开选择支付方式modal
            this.payModal = true;
            return;
        } else if (flag === "remake") {
            //打开备注modal
            this.remakeModal = true;
            return;
        }
    }

    /* 关闭modal */
    @action
    closeModal = (flag) => {
        if (flag === "address") {
            //关闭地址modal
            this.addressModal = false;
            return;
        } else if (flag === "pay") {
            //关闭选择支付方式modal
            this.payModal = false;
            return;
        } else if (flag === "remake") {
            //关闭备注modal
            this.remakeModal = false;
            return;
        }
    }

    /* 选择地址 */
    @action
    selectAddress = (index) => {
        this.address = this.myAddressList[index];
    }

    /* 选择支付方式 */
    @action
    selectPayMethod = (method) => {
        if (method === "alipay") {
            this.payMethod = "alipay"
            return
        } else if (method === "weichatpay") {
            this.payMethod = "weichatpay"
            return
        }
    }

    /* 更新备注 */
    @action
    updateRemake = (remake) => {
        this.remake = remake;
    }

    /**
     * 网络请求
     * 获取用户地址
     */
    @action
    WsAddress = (status, message) => {
        if (status === 1) {
            //更新用户地址
            this.myAddressList = message;
        }
    }

    /**
     * 网络请求
     * 下单是否成功
     */
    WsPlaceAnOrder=(status,message)=>{
        if(status===1){
            NavigationService.navigate('paySuccessOrderPage');
        }else{
            WXTip.showToast("下单失败，请重新尝试");
        }
    }
}