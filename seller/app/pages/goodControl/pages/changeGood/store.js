import { observable, action } from 'mobx'
import { Alert } from 'react-native'
import NavigationService from '../../../../public/NavigationService';
import {sendWs} from '../../../../public/Websocket';

export class ChangeGoodStore {

    /*
     *注册变量，使其成为可检测
     */
    @observable info //上传的信息
    @observable classList //分类列表
    @observable isShowModal //modal显示控制
    @observable isUp //是否允许点击确定

    /*
     *初始化变量
     */
    constructor() {
        this.info = {
            old_class: '',
            change_class: '',
            old_name: '',
            change_name: '',
            price: '',
            is_out: '',
            url: '',
            base64: '',
        }
        this.classList = [];
        this.isShowModal = false;
        this.isUp = false;
    }

    /**
     * 接收上个页面传来的值并初始化
     */
    @action
    initInfo = (classList, old_class, name, price, is_out, url) => {
        this.classList = classList;
        this.info.old_class = old_class;
        this.info.change_class = old_class;
        this.info.old_name = name;
        this.info.change_name = name;
        this.info.price = price;
        this.info.is_out = is_out;
        this.info.url = url;
    }

    /**
     * 判断是否可以上传
     */
    @action
    upDateIsUp = () => {
        if (this.info.change_class == '' || this.info.old_class == ''
            || this.info.price == '' || this.info.change_name == '' || this.info.url == '' || this.info.url == '') {
            this.isUp = false;
        } else {
            this.isUp = true;
        }
    }

    /**
     * 修改输入信息
     */
    @action
    onChangeText = (flag, text) => {
        switch (flag) {
            case "onClass":
                this.info.change_class = text;
                break;
            case "price":
                this.info.price = text;
                break;
            case "name":
                this.info.change_name = text;
                break;
        }
        this.upDateIsUp();
    }

    /**
     * 标记是否售尽
     */
    updateIsout=(flag)=>{
        if(flag=="yes"){
            this.info.is_out=1;
        }else if(flag=="no"){
            this.info.is_out=0;
        }
        this.upDateIsUp();
    }

    /**
     * 选择图片
     */
    @action
    onImage = (url, base64) => {
        this.info.url = url;
        this.info.base64 = base64;
        this.upDateIsUp();
    }

    /**
    * 打开modal
    */
    @action
    openModal = () => {
        this.isShowModal = true;
    }

    /**
     * 关闭modal
     */
    @action
    closeModal = () => {
        this.isShowModal = false
    }

    /**
     * 接收网络请求
     * 删除商品
     */
    @action
    WsDeleteGood = (status) => {
        if (status == "no_class_or_good") {
            Alert.alert("提示", "没有当前分类或商品名重复")
        } else if (status == "error") {
            Alert.alert("提示", "未知错误，请稍后尝试")
        } else if (status === 1) {
            sendWs("get_class_or_goods", data = { flag: "class" })
            NavigationService.back();
        }
    }

    /**
     * 接收网络请求
     * 更新商品信息
     */
    @action
    WsUpdateGood = (status) => {
        if (status == "no_class_or_good") {
            Alert.alert("提示", "没有当前分类或商品名重复")
        } else if (status === 1) {
            sendWs("get_class_or_goods", data = { flag: "class" })
            NavigationService.back();
        }
    }
}