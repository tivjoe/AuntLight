import { observable, action } from 'mobx'
import { Alert } from 'react-native'
import NavigationService from '../../../../public/NavigationService';
import {sendWs} from '../../../../public/Websocket';

export class AddGoodStore {

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
            onClass: '点击选择分类',
            price: '',
            name: '',
            loaclUrl: '',
            base64: ''
        }
        this.classList = [];
        this.isShowModal = false;
        this.isUp = false;
    }

    /**
     * 初始化分类列表
     */
    @action
    initClassList = (list) => {
        this.classList = list;
    }

    /**
     * 修改输入信息
     */
    @action
    onChangeText = (flag, text) => {
        switch (flag) {
            case "onClass":
                this.info.onClass = text;
                break;
            case "price":
                this.info.price = text;
                break;
            case "name":
                this.info.name = text;
                break;
        }
        this.upDateIsUp();
    }

    /**
     * 选择图片
     */
    @action
    onImage = (url, base64) => {
        this.info.loaclUrl = url;
        this.info.base64 = base64;
        this.upDateIsUp();
    }

    /**
     * 判断是否可以上传
     */
    @action
    upDateIsUp = () => {
        if (this.info.onClass == "点击选择分类" || this.info.price == '' || this.info.name == '' || this.info.loaclUrl == '' || this.info.base64 == '') {
            this.isUp = false;
        } else {
            this.isUp = true;
        }
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
     * 网络请求
     * 接收添加商品是是否成功消息
     */
    @action
    WsAddGood = (status) => {
        if (status == "no_class_or_good") {
            Alert.alert("提示", "没有当前分类或商品名重复")
        } else if (status == "error") {
            Alert.alert("提示", "未知错误，请稍后尝试")
        } else if (status === 1) {
            Alert.alert(
                '提示',
                '是否继续添加？',
                [
                    { text: '取消', onPress: () => this.back(), style: 'cancel' },
                    { text: '确定', onPress: () => this.goOn() },
                ],
            )
        }
    }

    back = () => {
        sendWs("get_class_or_goods", data={flag: "class"})
        NavigationService.back();
    }

    goOn=()=>{
        this.info = {
            onClass: '点击选择分类',
            price: '',
            name: '',
            loaclUrl: '',
            base64: ''
        }
        this.isShowModal = false;
        this.isUp = false;
    }
}