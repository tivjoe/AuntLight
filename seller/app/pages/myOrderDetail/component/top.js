import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { unitWidth, fontscale } from '../../../public/SreenUil';
import FastImage from 'react-native-fast-image';
import NavigationService from '../../../public/NavigationService';
import { inject, observer } from 'mobx-react';

/**
 * 组件
 * tob
 * 导航栏
 */
export class Top extends Component {
    render() {
        return (
            <View style={styleTob.top}>
                <TouchableOpacity onPress={() => NavigationService.back()}>
                    <FastImage style={styleTob.image} source={require("../../../res/fanhui.png")} />
                </TouchableOpacity>
            </View>
        )
    }
}

/* 样式 */
const styleTob = StyleSheet.create({
    //主view
    top: {
        height: 44,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    },
    //图片
    image: {
        marginLeft: 20,
        width: unitWidth * 40,
        height: unitWidth * 40
    },
});

/**
 * 组件
 * 订单状态
 */
@inject("myOrderDetailStore")
@observer
export class OrderStatus extends Component {

    //获取store
    store = this.props.myOrderDetailStore;

    render() {
        return (
            <View style={styleStatus.top}>
                <Text style={styleStatus.text} ># {this.store.queue_number}  订单已完成</Text>
            </View>
        )
    }
}

/* 样式 */
const styleStatus = StyleSheet.create({
    //主view
    top: {
        height: 35,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    },
    text: {
        marginLeft: 22,
        fontSize: fontscale * 18,
        fontWeight: "500",
        color:"#d81e06"
    }
});