import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import Top from "./component/top/top";
import Body from "./component/body/body";
import { sendWs } from "../../public/Websocket";
import {ModalClass} from "./component/modal/modal";
import { inject } from "mobx-react";

/**
 * 选择商品
 * 入口
 */
@inject("goodStore")
export default class Goods extends Component {

    //获取商品，分类信息
    componentWillMount() {
        //请求数据
        const {navigation} = this.props;
        const seller_id = navigation.getParam('seller_id');
        const data = { seller_id:seller_id }
        sendWs("get_seller_good", data);
    }

    componentWillUnmount(){
        //页面卸载时，初始化goodStore
        this.props.goodStore.constructor();
    }

    render() {
       
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Top />
                <Body />
                <ModalClass />
            </SafeAreaView>
        );
    }
}