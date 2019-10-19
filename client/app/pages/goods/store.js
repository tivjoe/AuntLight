import { observable, action, toJS } from 'mobx'

export class GoodStore {

    /* 注册变量，使其成为可检测 */
    @observable goodsList //商品列表
    @observable classList //分类列表
    @observable isShowClass //分类moodal是否显示
    @observable onClassName; //当前选择的分类名字

    /* 初始化变量 */
    constructor() {
        this.goodsList = { "全部": [] };
        this.classList = [];
        this.isShowClass = false;
        this.onClassName = "全部"
    }

    /* 显示分类modal  */
    @action
    openClass = () => {
        this.isShowClass = true;
    }

    /* 关闭分类modal */
    @action
    closeClass = () => {
        this.isShowClass = false;
    }

    /* 改变商品状态 */
    @action
    changeGoodStatus = (goodIndex) => {
        if (this.goodsList["全部"][goodIndex].is == true) {
            //设置为未选中
            this.goodsList["全部"][goodIndex].is = false;
        } else {
            //设置为选中
            this.goodsList["全部"][goodIndex].is = true;
        }
    }

    /* 对购物车提供的接口=》指定商品为未选中状态 */
    @action
    changeGosForShopcar=(goodIndex)=>{
        this.goodsList["全部"][goodIndex].is = false;
    }

    /* 选中分类 */
    @action
    onClass = (index) => {
        this.onClassName = this.classList[index].class_name;
    }

    /**
     * 网络请求
     * 接收商品+分类数组
     */
    @action
    WsUpdateInfo = (status, goodList, classList) => {
        if (status === 1) {
            if (classList != null) {
                classList.unshift({ class_name: "全部" })
            }
            for (let g = 0; g < goodList.length; g++) {
                //添加属性
                goodList[g].is = false;
                goodList[g].goodIndex = g;
                //商品在list【“全部”】末尾添加
                this.goodsList["全部"][this.goodsList["全部"].length] = goodList[g];
                //判断当前分类是否存在
                if (this.isArrayNull(this.goodsList[goodList[g].class_name]) == true) {
                    //存在，并且在该分类末尾添加元素
                    this.goodsList[goodList[g].class_name][this.goodsList[goodList[g].class_name].length] = goodList[g]
                } else {
                    //不存在这个分类，添加这个分类
                    this.goodsList[goodList[g].class_name] = [];
                    //向该分类末尾添加商品
                    this.goodsList[goodList[g].class_name][this.goodsList[goodList[g].class_name].length] = goodList[g]
                }
            }
            this.classList = classList;
        }
    }

    /* 判断数组是否为空 */
    isArrayNull = (array) => {
        if (array != null) {
            return true;
        } else {
            return false;
        }
    }
}

/*
if (status === 1) {
            if (classList != null) {
                classList.unshift({ class_name: "全部" })
            }
            let list = [];
            list["全部"] = [];
            for (let g = 0; g < goodList.length; g++) {
                //添加属性
                goodList[g].is = false;
                goodList[g].goodIndex = g;
                //商品在list【“全部”】末尾添加
                list["全部"].push(goodList[g]);
                //判断当前分类是否存在
                if (this.isArrayNull(list[goodList[g].class_name]) == true) {
                    //存在，并且在该分类末尾添加元素
                    list[goodList[g].class_name].push(goodList[g])
                } else {
                    //不存在这个分类，添加这个分类
                    list[goodList[g].class_name] = [];
                    //向该分类末尾添加商品
                    list[goodList[g].class_name].push(goodList[g]);
                }
            }
        }
*/