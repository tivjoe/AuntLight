import React, { Component } from 'react';
import { SafeAreaView, View } from 'react-native';
import Top from './top/top';
import Body from './body/body';
import { sendWs } from '../../public/Websocket';
import { inject } from 'mobx-react';
import { geolocationInit, getPosition } from '../../public/Position';
import {ModalDiscuss,LookImage} from './modal/modal';

/**
 * 首页
 * 入口
 */
@inject('homeStore')
export default class Home extends Component {

    //获取当前地理位置
    componentDidMount() {
        //初始化地位API
        geolocationInit();
        //获取当前定位
        getPosition();
        //获取商家信息
        sendWs("get_seller_list");
    }

    render() {
        return (
            <View  style={{ flex: 1, backgroundColor: "#ffffff2B" }}>
                <SafeAreaView>
                    <Top />
                </SafeAreaView>
                <Body />
                <ModalDiscuss />
                <LookImage />
            </View>
        );
    }
}