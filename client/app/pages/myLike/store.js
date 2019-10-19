import { observable, action } from 'mobx'

export class MyLikeStore {

    /* 注册变量，使其成为可检测 */
    @observable like //我的地址列表


    /* 初始化变量 */
    constructor() {
        this.like = [];
    }

    /**
     * 网络请求
     * 获取用户喜爱商家
     */
    @action
    WsLike = (status, message) => {
        if (status === 1) {
            //更新用户地址
            this.like = message;
        }
    }

    @action
    deleteSeller=(index)=>{
        let array=this.like;
        array.splice(index,1);
        this.like=array;
        this.like=[...this.like];
    }
}