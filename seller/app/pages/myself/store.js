import { observable, action } from 'mobx'
import {Alert} from 'react-native';

export class MyselfStore {
    /* 注册变量，使其成为可检测 */
    @observable inforation; //商家信息

    /* 初始化变量 */
    constructor() {
        this.inforation = {
            name: null, //商家名字
            headurl: null,//头像
            class: null, //分类
            clicks: null, //点击量
            level: null, //评分
            blance: null, //余额
            turnover: null, //交易额
            addres: null, //地址
            allOrderNumber: null, //总单量
            feight: null, //配送费
            preparingTime: null, //备餐时间
            startMoney: null //起送费
        }
    }

    @action
    updateHead=(url)=>{
        this.inforation.headurl=url;
    }
    /**
     * 网络请求
     * 接收商家信息
     */
    @action
    WsGetInformation = (status, data) => {
        if(status==1){
            this.inforation.name=data.seller_name;
            this.inforation.headurl=data.headurl;
            this.inforation.class=data.class;
            this.inforation.clicks=data.clicks;
            this.inforation.level=data.level;
            this.inforation.blance=data.blance;
            this.inforation.turnover=data.turnover;
            this.inforation.addres=data.seller_addes;
            this.inforation.allOrderNumber=data.all_order_number;
            this.inforation.feight=data.feight;
            this.inforation.preparingTime=data.preparing_time;
            this.inforation.startMoney=data.start_money;
            console.log(this.inforation);
        }else{
            Alert.alert("提示","获取信息失败，请重试")
        }
    }
}