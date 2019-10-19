import {observable,action} from 'mobx'

export class MyOrderStore{

    /* 注册变量，使其成为可检测 */
    @observable order //我的订单列表
    @observable pageNo //页码
    @observable isRefreshing //刷新状态
    @observable isLoadMore//加载状态
    @observable totalCount //记录总条数


    /* 初始化变量 */
    constructor() {
        this.order = [];
        this.pageNo = 0;
        this.totalCount= 0;
        this.isRefreshing = false;
        this.isLoadMore = false;
    }

    /**
     * 改变刷新状态
     */
    @action
    changeRefreshing = (flag) => {
        if (flag == "start") {
            this.isRefreshing = true;
        } else if (flag == "stop") {
            this.isRefreshing = false;
            this.pageNo = 0;
        }
    }

    /**
     * 改变加载状态
     */
    @action
    changeLoadMore=(flag)=>{
        if(flag=="start"){
            this.isLoadMore=true;
        }else if(flag=="stop"){
            this.isLoadMore=false;
            this.pageNo=this.pageNo+1;
        }
    }

    /**
     * 网络请求
     * 获取用户订单列表
     */
    @action
    WsOrder = (status, flag, message,totalCount) => {
        if (status === 1) {
            //判断是刷新还是加载
            if (flag == "refresh") {
                this.changeRefreshing("stop");
                this.totalCount=totalCount;
                this.order = message;
            } else if (flag == "page") {
                //加载不为空
                if (message.length != 0) {
                    //合并数组
                    this.changeLoadMore("stop");
                    this.order = this.order.concat(message);
                }
            }
        }
    }
    
}