import {LoginStore} from '../pages/login/store';
import {HomeStore} from '../pages/home/store';
import {MyselfStore} from '../pages/myself/store';
import {MyInformationStore} from '../pages/myInformation/store';
import {GoodContolStore} from "../pages/goodControl/store";
import {AddGoodStore} from "../pages/goodControl/pages/addGood/store";
import {ChangeGoodStore} from  "../pages/goodControl/pages/changeGood/store";
import {PreviewShopStore} from "../pages/previewShop/store";
import {MyOrderStore} from "../pages/myOrder/store";
import {MyOrderDetailStore} from "../pages/myOrderDetail/store";

/**
 * 将每个页面的store包含在内
 * 让provider传入每一个页面
 */
const Store={
    loginStore:new LoginStore(), //登陆 
    homeStore:new HomeStore(), // 首页
    myselfStore:new MyselfStore(), //我的
    myInformationStore:new MyInformationStore(), //我的信息
    goodControlStore:new GoodContolStore(), //商品操作
    addGoodStore:new AddGoodStore(), //添加商品
    changeGoodStore:new ChangeGoodStore(), //修改商品
    previewShopStore:new PreviewShopStore(), //预览商品
    myOrderStore:new MyOrderStore(), //我的订单
    myOrderDetailStore:new MyOrderDetailStore(), //订单详情
}

export default Store;