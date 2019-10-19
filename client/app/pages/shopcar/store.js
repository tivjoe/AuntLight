import { observable, action, toJS } from "mobx";
import NavigationService from '../../public/NavigationService';

export class ShopCarStore {

    /* 注册变量，使其成为可检测 */
    @observable Feight //配送费
    @observable StartMoney //起送费
    @observable seller_id //商家id
    @observable shopCar //购物车
    @observable goodsCount //购物车数量
    @observable GoodTotalPrice //总价


    /* 初始化变量 */
    constructor() {
        this.seller_id = "";
        this.Feight = 0;
        this.StartMoney = 0;
        this.shopCar = [];
        this.goodsCount = 0;
        this.GoodTotalPrice = 0;
    }

    /* 初始化商家id，配送费，起送费 */
    @action
    constructorShopInfo = (id, startMoney, feight) => {
        this.seller_id = id;
        this.StartMoney = startMoney;
        this.Feight = feight;
    }

    /* 跳转到确认订单页面 */
    @action
    goConfimOrderPage=()=>{
        //跳转页面传参
        NavigationService.navigate("confimOrderPage", {
            seller_id: this.seller_id,
            startMoney: this.StartMoney,
            feight: this.Feight,
            goodTotalPrice:this.GoodTotalPrice ,
            shopCar:toJS(this.shopCar),
        })
    }

    /* 商品添加/删除/减少操作 */
    @action
    controlGod = (flag, index) => {
        if (flag === "remove") {
            const lessCount = this.shopCar[index].count;
            //减少总价
            this.GoodTotalPrice = this.GoodTotalPrice - lessCount * this.shopCar[index].price;
            this.GoodTotalPrice = parseFloat(this.GoodTotalPrice.toFixed(2)) //保留两位小数
            //计数减去
            this.goodsCount = this.goodsCount - lessCount;
            //从购物车中删除商品
            this.shopCar.splice(index, 1);
            return
        } else if (flag === "add") {
            //增加总价
            this.GoodTotalPrice = this.GoodTotalPrice + 1 * this.shopCar[index].price;
            this.GoodTotalPrice = parseFloat(this.GoodTotalPrice.toFixed(2)) //保留两位小数
            //计数+1
            this.goodsCount = this.goodsCount + 1;
            this.shopCar[index].count = this.shopCar[index].count + 1
            return
        } else if (flag === "less") {
            if (this.shopCar[index].count > 1) {
                //减少总价
                this.GoodTotalPrice = this.GoodTotalPrice - 1 * this.shopCar[index].price;
                this.GoodTotalPrice = parseFloat(this.GoodTotalPrice.toFixed(2)) //保留两位小数
                //计数-1
                this.goodsCount = this.goodsCount - 1;
                this.shopCar[index].count = this.shopCar[index].count - 1
            }
            return
        }
    }

    /* 对商品页面提供的接口，添加和删除一个指定商品 */
    @action
    controlShopCarForGood = (flag, data) => {
        if (flag === "add") {
            //增加总价
            this.GoodTotalPrice = data.count * data.price + this.GoodTotalPrice;
            this.GoodTotalPrice = parseFloat(this.GoodTotalPrice.toFixed(2)) //保留两位小数
            //商品添加操作
            this.shopCar.push(data);
            //购物车数量+1
            this.goodsCount = this.goodsCount + 1;
            return
        } else if (flag === "remove") {
            //商品删除操作
            for (let i = 0; this.shopCar.length; i++) {
                if (this.shopCar[i].name == data.name) {
                    //减少总价
                    this.GoodTotalPrice = this.GoodTotalPrice - this.shopCar[i].count * this.shopCar[i].price;
                    this.GoodTotalPrice = parseFloat(this.GoodTotalPrice.toFixed(2)) //保留两位小数
                    //购物车数量-商品相应数量计数
                    this.goodsCount = this.goodsCount - this.shopCar[i].count;
                    //从购物车移除商品
                    this.shopCar.splice(i, 1);
                    return
                }
            }
        }
    }
}