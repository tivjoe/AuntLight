import React, { Component } from 'react';
import { View, Text, StyleSheet } from "react-native";
import FastImage from 'react-native-fast-image';
import { unitWidth } from './SreenUil';
import { inject, observer } from 'mobx-react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import login from "../pages/login/index";
import home from "../pages/home/index";
import position from "../pages/position/index";
import addSite from "../pages/addsite/index";
import myself from "../pages/myself/index";
import goods from "../pages/goods/index";
import shopCar from "../pages/shopcar/index";
import confimOrder from "../pages/confimOrder/index";
import paySuccessOrder from "../pages/paySuccessOrder/index";
import myAddress from "../pages/myAddress/index";
import myLike from "../pages/myLike/index";
import myOrder from "../pages/myOrder/index";
import myOrderDetail from "../pages/myOrderDetail/index";

/**
 * 路由器
 * 创建路由，包含相应页面
 */

/* 登陆路由 */
export const LoginStack = createStackNavigator({
    loginPage: {
        screen: login,
        navigationOptions: {
            header: null,
        },
    },
})

/* 我的路由 */
const myselfStack = createBottomTabNavigator({
    myself: {
        screen: myself,
        navigationOptions: {
            tabBarLabel: '我',
            tabBarIcon: ({ tintColor, focused }) => (
                <FastImage
                    source={require('../res/wodedangxuan1.png')} style={{ width: 20, height: 20 }}
                />
            ),
            tabBarOptions: {
                labelStyle: {
                    color: "#d81e06",
                    fontSize: 12,
                },
                style: {
                    borderTopWidth: 0,
                    backgroundColor: "#eaeaea2B",
                },
            },

        },
    }
})

/* 商品操作路由 */
const goodsControlStack = createBottomTabNavigator({

    //商品页面
    goods: {
        screen: goods,
        navigationOptions: {
            tabBarLabel: '商品',
            tabBarIcon: ({ tintColor, focused }) => (
                focused
                    ?
                    <FastImage
                        source={require('../res/shangpin.png')} style={{ width: 20, height: 20 }}
                    />
                    :
                    <FastImage
                        source={require('../res/goods-jf.png')} style={{ width: 20, height: 20 }}
                    />
            ),
            tabBarOptions: {
                activeTintColor: "#d81e06",
                labelStyle: {
                    fontSize: 12,
                },
                style: {
                    borderTopWidth: 0,
                    backgroundColor: "#eaeaea2B",
                },
            },

        },
    },

    //购物车页面
    shopCar: {
        screen: shopCar,
        navigationOptions: {
            tabBarLabel: '购物车',
            tabBarIcon: ({ tintColor, focused }) => (
                focused
                    ?
                    <View>
                        <FastImage
                            source={require('../res/gouwucheman.png')} style={{ width: 20, height: 20 }}
                        />
                        <ViewShopCarIcon />
                    </View>
                    :
                    <View>
                        <FastImage
                            source={require('../res/gouwuchekong.png')} style={{ width: 20, height: 20 }}
                        />
                        <ViewShopCarIcon />
                    </View>
            ),
            tabBarOptions: {
                activeTintColor: "#d81e06",
                labelStyle: {
                    fontSize: 12,
                },
                style: {
                    borderTopWidth: 0,
                    backgroundColor: "#eaeaea2B",
                },
            },

        },
    }

});

/* app路由 */
export const AppStack = createStackNavigator({

    //首页
    homePage: {
        screen: home,
        navigationOptions: {
            header: null,
        },
    },

    //选择位置
    positionPage: {
        screen: position,
        navigationOptions: {
            header: null,
        },
    },

    //添加地址
    addSitePag: {
        screen: addSite,
        navigationOptions: {
            header: null,
        },
    },

    //我的路由
    myselfPage: {
        screen: myselfStack,
        navigationOptions: {
            header: null,
        },
    },

    //商品路由
    goodsPage: {
        screen: goodsControlStack,
        navigationOptions: {
            header: null,
        }
    },

    //确认订单
    confimOrderPage: {
        screen: confimOrder,
        navigationOptions: {
            header: null,
        }
    },

    //下单成功
    paySuccessOrderPage: {
        screen: paySuccessOrder,
        navigationOptions: {
            header: null,
            gesturesEnabled: false,
        },
    },

    //我的地址
    myAddressPage: {
        screen: myAddress,
        navigationOptions: {
            header: null,
        },
    },

    //我的收藏
    myLikePage: {
        screen: myLike,
        navigationOptions: {
            header: null,
        },
    },

    //我的订单
    myOrderPage: {
        screen: myOrder,
        navigationOptions: {
            header: null,
        },
    },

    //订单详情
    orderDetailPage: {
        screen: myOrderDetail,
        navigationOptions: {
            header: null,
        },
    },
})

/**
 * 购物车图标，右上圆角计数器
 */
@inject("shopCarStore")
@observer
class ViewShopCarIcon extends Component {

    //获取store
    store = this.props.shopCarStore;

    render() {
        if (this.store.goodsCount > 0) {
            return (
                <View style={styleCar.view}>
                    <Text style={styleCar.text}>{this.store.goodsCount}</Text>
                </View>
            );
        } else {
            return null
        }
    }
}

const styleCar = StyleSheet.create({
    view: {
        position: 'absolute',
        marginLeft: unitWidth * 35,
        backgroundColor: 'red',
        width: unitWidth * 30,
        height: unitWidth * 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: unitWidth * 30 / 2,
    },
    text: {
        color: 'white',
        fontSize: 10
    }
})