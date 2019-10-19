import { observable, action } from 'mobx'
import NavigationService from '../../public/NavigationService';

export class MyInformationStore {

    @observable informmation;

    constructor() {
        this.information = {
            level: null,//评分
            turnover: null,
            blance: null,
            allOrderNumber: null,
            isPass: null,
            isBindAlipay: null
        }
    }

    constructorInformation = (data) => {
        switch (data.isPass) {
            case 0:
                data.isPass = "未认证";
                break;
            case 1:
                data.isPass = "通过";
                break;
            case 2:
                data.isPass = "最后一步";
                break;
            case 3:
                data.isPass = "重新提交材料";
                break;
        }
        switch (data.isBindAlipay) {
            case 0:
                data.isBindAlipay = "未绑定";
                break;
            case 1:
                data.isBindAlipay = "已绑定";
                break;
        }
        this.information.level = data.level;
        this.information.turnover = data.turnover;
        this.information.blance = data.blance;
        this.information.allOrderNumber = data.allOrderNumber;
        this.information.isPass = data.isPass;
        this.information.isBindAlipay = data.isBindAlipay;

    }
}