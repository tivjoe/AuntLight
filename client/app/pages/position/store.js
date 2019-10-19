import { observable, action } from "mobx";
import NavigationService from '../../public/NavigationService';

export class PositionStore {

    /* 注册变量，使其成为可检测 */
    @observable address //用户地址
    @observable pois


    /* 初始化变量 */
    constructor() {
        this.address = [];
        this.pois = [];
    }


    /**
     * 网络请求
     * 更新当前地理位置pois
     */
    @action
    upDatePois = (pois) => {
        this.pois=pois;
    }
    /**
     * 网络请求
     * 获取用户地址
     */
    @action
    WsAddress = (status, message) => {
        if (status === 1) {
            //更新用户地址
            this.address = message;
        }
    }
}