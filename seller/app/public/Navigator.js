import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import login from "../pages/login/index";
import home from "../pages/home/index";
import myself from "../pages/myself/index";
import myInformation from "../pages/myInformation/index";
import goodControl from "../pages/goodControl/index";
import addGood from "../pages/goodControl/pages/addGood/index";
import changeGood from "../pages/goodControl/pages/changeGood/index";
import previewShop from "../pages/previewShop/index";
import myOrder from "../pages/myOrder/index";
import myOrderDetail from "../pages/myOrderDetail/index";

/**
 * 路由器
 * 创建路由，包含相应页面
 */

/* 登陆路由 */
export const LoginStack = createStackNavigator({
    loginPage: { screen: login, navigationOptions: { header: null, } },
})

/* app路由 */
export const AppStack = createStackNavigator({

    //首页
    homePage: { screen: home, navigationOptions: { header: null, } },

    //我的
    myselfPage: { screen: myself, navigationOptions: { header: null, } },

    //我的信息
    myInformationPage: { screen: myInformation, navigationOptions: { header: null, } },

    //商品操作
    goodControlPage: { screen: goodControl, navigationOptions: { header: null, } },

    //添加商品
    addGoodPage: { screen: addGood, navigationOptions: { header: null, } },

    //修改商品
    changeGoodPage: { screen: changeGood, navigationOptions: { header: null, } },

    //我的订单
    myOrderPage: { screen: myOrder, navigationOptions: { header: null, } },

    //订单详情
    orderDetailPage:{screen:myOrderDetail,navigationOptions: { header: null, } },

    //预览商店
    previewShopPage: { screen: previewShop, navigationOptions: { header: null, } },
})