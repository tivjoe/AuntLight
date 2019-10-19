import { observable, action } from 'mobx'
import { Alert } from 'react-native'
import NavigationService from '../../public/NavigationService';

export class GoodContolStore {

    /*
     *注册变量，使其成为可检测
     */
    @observable sectionList;
    @observable isModalAdd;
    @observable isModalChange;

    /*
     *初始化变量
     */
    constructor() {
        this.sectionList = [];
        this.isModalAdd = false;
        this.isModalChange = { is: false, data: null };
    }

    /**
     * 打开modal
     */
    @action
    openModal = (flag, data) => {
        if (flag == "add") {
            this.isModalAdd = true;
            this.isModalChange = { is: false, data: null }
        } else if (flag == "change") {
            this.isModalChange = { is: true, data: data }
            this.isModalAdd = false;
        }
    }
    /**
     * 关闭modal
     */
    @action
    closeModal = () => {
        this.isModalAdd = false;
        this.isModalChange = { is: false, data: null }
    }

    /**
     * 网络请求
     * 获取全部分类
     * @param array classLit //分类列表
     */
    @action
    WsGetClass = (classList) => {
        for (let i = 0; i < classList.length; i++) {
            classList[i].data = [];
        }
        this.sectionList = classList;
    }

    /**
     * 网络请求
     * 获取指定分类下的所有商品
     * @param string name 指定分类
     * @param array array 所有商品
     */
    @action
    WsGetGoods = (name, array) => {
        for (let i = 0; i < this.sectionList.length; i++) {
            if (this.sectionList[i].class_name == name && this.sectionList[i].data.length == 0) {
                this.sectionList[i].data = array;
            } else {
                this.sectionList[i].data = [];
            }
        }
    }

    /**
     * 网络请求
     * 添加一个分类
     */
    @action
    WsAddClass = (status, data) => {
        if (status === 1) {
            data.data = [];
            this.sectionList.push(data);
            this.closeModal();
            return;
        } else if (status == "class_repeat") {
            Alert.alert("提示", "添加失败，分类名重复")
        }
    }

    /**
     * 网络请求
     * 修改一个分类
     */
    @action
    WsChangeClass=(status,newName)=>{
        if(status=="class_reapt"){
            Alert.alert("提示", "修改失败，分类名重复")
        }else if(status=="error"){
            Alert.alert("提示", "未知错误，请稍后尝试")
        }else if(status===1){
            for (let i = 0; i < this.sectionList.length; i++) {
                if (this.sectionList[i].class_name == this.isModalChange.data) {
                    this.sectionList[i].class_name = newName;
                    this.closeModal();
                    return;
                }
            }
        }
    }

    /**
     * 网络请求
     * 删除一个分类
     */
    @action
    WsdDeleteClass=(status,name)=>{
        if(status=="error"){
            Alert.alert("提示", "未知错误，请稍后尝试")
        }else if(status=="no_class"){
            Alert.alert("提示", "没有当前分类或已被删除，尝试刷新")
        }else if(status===1){
            for (let i = 0; i < this.sectionList.length; i++) {
                if (this.sectionList[i].class_name == name) {
                    this.sectionList.splice(i, 1);
                    return;
                }
            }
        }
    }
}