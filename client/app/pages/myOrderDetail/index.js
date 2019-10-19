import React, { Component } from 'react';
import { SafeAreaView, ScrollView } from "react-native";
import { sendWs } from "../../public/Websocket";
import { inject, observer } from 'mobx-react';
import { Top, OrderStatus } from './component/top';
import { OrderInfo,GoodsList } from './component/body';

/**
 * 入口
 * 订单详情
 */
@inject("myOrderDetailStore","myOrderStore")
@observer
export default class MyOrderDetail extends Component {

    componentDidMount() {
        //从上个页面获取到订单info
        const { navigation } = this.props;
        const index = navigation.getParam('index');
        this.props.myOrderDetailStore.infoConstructor(this.props.myOrderStore.order[index]);
        //获取商品信息
        const data={order_id:this.props.myOrderStore.order[index].order_id};
        sendWs("get_an_order_detail",data);
    }

    componentWillUnmount() {
        //页面卸载时，初始化订单详情
        this.props.myOrderDetailStore.constructor();
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <Top />
                <OrderStatus />
                <ScrollView style={{ flex: 1, }}>
                    <OrderInfo />
                    <GoodsList />
                </ScrollView>
            </SafeAreaView>
        )
    }
}