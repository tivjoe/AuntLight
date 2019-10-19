import React, { Component } from 'react';
import { SafeAreaView} from "react-native";
import {sendWs} from "../../public/Websocket";
import { inject } from 'mobx-react';
import Top from './component/top';
import AddressList from './component/body';

/**
 * 入口
 * 我的地址页面
 */
@inject("myAddressStore")
export default class MyAddress extends Component {

    componentDidMount() {
        //获取用户地址
        sendWs("get_address");
    }

    componentWillUnmount() {
        //页面卸载时，初始化shopCarStore
        this.props.myAddressStore.constructor();
    }
    
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Top />
                <AddressList />
            </SafeAreaView>
        )
    }
}
