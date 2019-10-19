import React, { Component } from 'react';
import { SafeAreaView, ScrollView } from "react-native";
import { inject } from 'mobx-react';
import { Top, Address } from "./component/top/top";
import { ModalAddress,ModalPay,ModalRemake } from "./component/modal/modal";
import { OrderInfo,GoodsList,Confim } from "./component/body/body";

/**
 * 入口
 * 确认订单
 */
@inject("confimOrderStore")
export default class ConfimOrder extends Component {

    componentWillMount() {
        const { navigation } = this.props;
        const seller_id = navigation.getParam('seller_id');
        const startMoney = navigation.getParam('startMoney');
        const feight = navigation.getParam('feight');
        const goodTotalPrice = navigation.getParam('goodTotalPrice');
        const shopCar = navigation.getParam('shopCar');
        this.props.confimOrderStore.constructorOrderInfo(seller_id, startMoney, feight, goodTotalPrice, shopCar);
    }

    componentWillUnmount() {
        //页面卸载时，初始化confimOrderStore
        this.props.confimOrderStore.constructor();
    }


    render() {

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Top />
                <Address />
                <ScrollView style={{ flex: 1 }}>
                    <OrderInfo />
                    <GoodsList />
                </ScrollView>
                <Confim />
                <ModalAddress />
                <ModalPay />
                <ModalRemake />
            </SafeAreaView>
        )
    }
}