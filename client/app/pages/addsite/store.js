import { observable, action } from "mobx";
import NavigationService from '../../public/NavigationService';

export class AddSiteStore {

    /* 注册变量，使其成为可检测 */
    @observable poi //选择的poi
    @observable pois //poi列表
    houseNumber //门牌号
    contactName //联系人名字
    contactPhone //联系人手机
    callBack //回调函数


    /* 初始化变量 */
    constructor() {
        this.poi = { name: "", lng: "", lat: "" }
        this.pois = []
        houseNumber = ""
        contactName = ""
        contactPhone = ""
    }

    /**
     * 网络请求
     * 更新pois列表
     */
    @action
    upDatePois = (pois) => {
        this.pois = pois;
    }

    /**
     * 更新poi
     */
    @action
    upDatePoi = (name, lng, lat) => {
        this.poi = {
            name: name,
            lng: lng,
            lat: lat
        }
    }

    /**
     * 更新联系人信息
     */
    upDateContactInfo = (flag, text) => {
        switch (flag) {
            case "house":
                this.houseNumber = text;
                break;
            case "name":
                this.contactName = text;
                break;
            case "phone":
                this.contactPhone = text;
                break;
        }
    }

    /**
     * 网络请求
     * 接收添加地址回调
     */
    @action
    WsAddSite=(status)=>{
        if(status===1){
            NavigationService.back()
            this.callBack();
        }
    }

    /**
     * 传递返回页面回调函数
     */
    updateCallBack=(callBack)=>{
        this.callBack=callBack;
    }

}