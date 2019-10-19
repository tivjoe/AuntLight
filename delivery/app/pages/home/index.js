import React, { Component } from 'react';
import { SafeAreaView, View } from 'react-native';
import { inject } from 'mobx-react';
import Top from './component/top/top';
import Body from './component/body/tab';
import {sendWs} from '../../public/Websocket';

/**
 * 首页
 * 入口
 */
@inject('homeStore')
export default class Home extends Component {

    componentDidMount() {
        //获取商家营业状态
        sendWs("get_information");
        //获取取餐订单
        sendWs("get_all_readying_order");
        //获取配送中订单
        sendWs("get_all_running_order");
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#ffffff2B" }}>
                <SafeAreaView>
                    <Top />
                </SafeAreaView>
                <Body />
            </View>
        );
    }
}