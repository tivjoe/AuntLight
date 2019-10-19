import { observable, action } from 'mobx'
import {sendWs} from "../../public/Websocket";
import NavigationService from '../../public/NavigationService';

export class MyInformationStore {

    /* 注册变量，使其成为可检测 */
    @observable isChange; //是否修改
    @observable information; //商家信息
    @observable changeArrayText; //可以被更改的信息

    /* 初始化变量 */
    constructor() {
        this.isChange = false;
        this.information = {
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
        };
        this.changeArrayText={
            name: null, //商家名字
            feight: null, //配送费
            preparingTime: null, //备餐时间
            startMoney: null //起送费
        }
    }

    @action
    changeText=(flag,text)=>{
        if(this.isChange!=true){
            this.isChange=true;
        }
        switch (flag) {
            case "name":
                this.changeArrayText.name=text;
                break;
            case "feight":
                this.changeArrayText.feight=text;
                break;
            case "startMoney":
                this.changeArrayText.startMoney=text;
                break;
            case "preparingTime":
                this.changeArrayText.preparingTime=text;
                break;
        }
    }

    /**
     * 网络请求
     * 接收商家信息
     */
    @action
    constructorInformation = (data) => {
        //this.information.name = data.name;
        this.information.headurl = data.headurl;
        this.information.clicks = data.clicks;
        this.information.level = data.level;
        this.information.blance = data.blance;
        this.information.turnover = data.turnover;
        this.information.addres = data.addres;
        this.information.allOrderNumber = data.allOrderNumber;
        //this.information.feight = data.feight;
        // this.information.preparingTime = data.preparingTime;
        // this.information.startMoney = data.startMoney;

        this.changeArrayText.name=data.name;//商家名字
        this.changeArrayText.feight= data.feight; //配送费
        this.changeArrayText.preparingTime=data.preparingTime; //备餐时间
        this.changeArrayText.startMoney=data.startMoney;//起送费

        switch (data.class) {
            case 0:
                this.information.class = "便利商超";
                break;
            case 1:
                this.information.class = "甜点饮品";
                break;
            case 2:
                this.information.class = "生鲜蔬果";
                break;
            case 3:
                this.information.class = "零食";
                break;
            case 4:
                this.information.class = "美食";
                break;
        }
    }

    @action
    WsUpdateInfo=(status)=>{
        sendWs("get_information");
        NavigationService.back();
    }
}