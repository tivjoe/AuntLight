import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import login from "../pages/login/index";
import home from "../pages/home/index";
import myself from "../pages/myself/index";
import myInformation from "../pages/myInformation/index";
import myOrder from "../pages/myOrder/index";

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

    //我的页面
    myOrderPage:{screen:myOrder,navigationOptions: { header: null, }},
})