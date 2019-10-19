import {LoginStore} from '../pages/login/store';
import {HomeStore} from '../pages/home/store';
import {PositionStore} from '../pages/position/store';
import {AddSiteStore} from '../pages/addsite/store';
import {GoodStore} from '../pages/goods/store';
import {ShopCarStore} from '../pages/shopcar/store';
import {ConfimOrderStore} from '../pages/confimOrder/store';
import {MyAddressStore} from '../pages/myAddress/store';
import {MyLikeStore} from '../pages/myLike/store';
import {MyselfStore} from '../pages/myself/store';
import {MyOrderStore} from '../pages/myOrder/store';
import {MyOrderDetailStore} from '../pages/myOrderDetail/store';

/**
 * 将每个页面的store包含在内
 * 让provider传入每一个页面
 */
const Store={
    loginStore:new LoginStore(), //登陆 
    homeStore:new HomeStore(), // 首页
    positionStore:new PositionStore(), //选择地址
    addSiteStore:new AddSiteStore(), //添加地址
    goodStore:new GoodStore(), //商品操作
    shopCarStore:new ShopCarStore(), //购物车
    confimOrderStore:new ConfimOrderStore(), //确认订单
    myAddressStore:new MyAddressStore(), //我的地址
    myLikeStore:new MyLikeStore(), //我的收藏
    myselfStore:new MyselfStore(), //我的 
    myOrderStore:new MyOrderStore(), //我的订单
    myOrderDetailStore:new MyOrderDetailStore(), //订单详情
}

export default Store;