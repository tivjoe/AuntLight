import React, { Component } from 'react';
import { SafeAreaView, View } from "react-native";
import { sendWs } from "../../public/Websocket";
import { inject, observer } from 'mobx-react';
import Top from './component/top';
import OrderList from './component/body';

/**
 * 入口
 * 我的订单
 */
@inject("myOrderStore")
@observer
export default class MyOrder extends Component {

    componentDidMount() {
        //获取用户订单
        this.props.myOrderStore.changeRefreshing("start");
        let data = { flag: "refresh" }
        sendWs("get_history_order", data);
    }

    componentWillUnmount() {
        //页面卸载时，初始化我的订单
        this.props.myOrderStore.constructor();
    }

    render() {
        return (
            <View style={{flex:1}} >
                <SafeAreaView>
                    <Top />
                </SafeAreaView>
                <OrderList />
            </View>
        )
    }
}