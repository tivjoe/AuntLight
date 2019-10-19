import { observable, action } from 'mobx'
import { Alert } from 'react-native';

export class MyselfStore {

    /* 注册变量，使其成为可检测 */
    @observable inforation; //商家信息

    /* 初始化变量 */
    constructor() {
        this.inforation = {
            name:null,//配送员名字
            headurl:null,//头像
            level:null,//评分
            turnover:null,
            blance:null,
            allOrderNumber:null,
            isPass:null,
            isBindAlipay:null
        }
    }

    /**
     * 网络请求
     * 接收商家信息
     */
    @action
    WsGetInformation = (status, data) => {
        if (status == 1) {
            this.inforation.name=data.delivery_name;
            this.inforation.headurl=data.delivery_headurl;
            this.inforation.level=data.level;
            this.inforation.turnover=data.turnover;
            this.inforation.blance=data.blance;
            this.inforation.allOrderNumber=data.all_order_number;
            this.inforation.isPass=data.is_pass;
            this.inforation.isBindAlipay=data.is_bind_alipay;
            console.log(this.inforation);
        } else {
            Alert.alert("提示", "获取信息失败，请重试")
        }
    }
}