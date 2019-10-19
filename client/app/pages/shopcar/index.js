import React, { Component } from 'react';
import { SafeAreaView } from "react-native";
import { inject } from 'mobx-react';
import { Top } from './component/top/top';
import { ShopCarList,Confim } from './component/body/body';

/**
 * 入口
 * 购物车
 */
@inject("shopCarStore")
export default class ShopCar extends Component {

    componentWillMount() {
        const { navigation } = this.props;
        const seller_id = navigation.getParam('seller_id');
        const startMoney = navigation.getParam('startMoney');
        const feight = navigation.getParam('feight');
        this.props.shopCarStore.constructorShopInfo(seller_id,startMoney,feight);
    }

    componentWillUnmount() {
        //页面卸载时，初始化shopCarStore
        this.props.shopCarStore.constructor();
    }

    render() {
        
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Top/>
                <ShopCarList />
                <Confim />
            </SafeAreaView>
        )
    }
}