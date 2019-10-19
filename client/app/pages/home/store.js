import { observable, action } from 'mobx'
import NavigationService from '../../public/NavigationService';

export class HomeStore {

    /* 注册变量，使其成为可检测 */
    @observable poiName; //当前地理位置名称
    @observable shopList; //商家列表
    @observable headurl; //头像
    @observable searchStatus; //搜索栏状态
    @observable showModalDiscuss; //展示评论modal
    @observable discussList; //评论列表
    @observable showModalImage; //查看图片
    @observable discussImage; //评论图片
    @observable myselfMessage; //我的页面是否有消息
    lng; //纬度
    lat; //纬度

    /* 初始化变量 */
    constructor() {
        this.poiName = "定位中...";
        this.shopList = [];
        this.headurl = "";
        this.searchStatus = false;
        this.lng = 0;
        this.lat = 0;
        this.showModalDiscuss = false;
        this.discussList = null;
        this.showModalImage = false;
        this.discussImage = [];
        this.myselfMessage = false;
    }

    /* 改变搜索栏状态 */
    @action
    changeSearch = () => {
        this.searchStatus = !this.searchStatus;
    }

    /* 更新当前地理位置 */
    @action
    upDateLocatin = (poiName, lng, lat) => {
        this.poiName = poiName;
        this.lng = lng;
        this.lat = lat;
    }

    /**
     * 公共接口
     * 我的页面有新消息
     */
    @action
    onMyselefMessage = () => {
        this.myselfMessage=true;
    }

    /**
     * 清除我的页面消息
     */
    @action
    removeMyselefMessage=()=>{
        this.myselfMessage=false;
    }

    /* 打开modal */
    @action
    openModal = (flag) => {
        if (flag == "discuss") {
            //打开评论modal
            this.showModalDiscuss = true;
        }
    }
    /* 查看图片 */
    imageModal = (images) => {
        if (this.showModalImage == false) {
            let array = []
            for (let i = 0; i < 3; i++) {
                if (images[i] != null) {
                    let a = { "url": images[i] }
                    array.push(a);
                }
            }
            this.discussImage = array;
            this.showModalImage = true;
        } else {
            this.showModalImage = false;
        }
    }

    /* 关闭modal */
    @action
    closeModal = (flag) => {
        if (flag == "discuss") {
            //关闭modal
            this.showModalDiscuss = false;
        }
    }


    /**
     * 网络请求
     * 更新商家列表
     */
    @action
    WsUpdateShopList = (status, headurl, shopList) => {
        //获取数据成功
        if (status === 1) {
            //更新头像，商家列表
            this.headurl = headurl;
            this.shopList = shopList;
        }
    }

    /**
     * 网络请求
     * 更新商家评论
     */
    @action
    WsUpdateDiscuss = (status, data) => {
        //if (status == 1) {
            this.discussList = data;
        //}
        // } else {
        //     this.discussList = null;
        // }
    }

    /* 收藏商家 */
    @action
    likeShop = (index) => {
        this.shopList[index].isHeart = !this.shopList[index].isHeart;
    }
}