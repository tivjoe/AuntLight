import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { unitWidth, fontscale } from '../../../public/SreenUil';
import FastImage from 'react-native-fast-image';
import NavigationService from '../../../public/NavigationService';
import {sendWs} from '../../../public/Websocket';

/**
 * 组件
 * tob
 * 导航栏
 */
export default class Top extends Component {
    render() {
        return (
            <View style={styleTob.top}>
                <TouchableOpacity onPress={() => NavigationService.back()}>
                    <FastImage style={styleTob.image} source={require("../../../res/fanhui.png")} />
                </TouchableOpacity>
                <Text style={styleTob.textTitle}>我的地址</Text>
                <TouchableOpacity onPress={() => NavigationService.navigate(
                    "addSitePag",
                    {
                        callBack: () =>
                            sendWs(4)
                    })
                }>
                    <Text style={styleTob.textAdd}>添加</Text>
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
    //标题
    textTitle: {
        marginLeft:10,
        fontSize: fontscale * 16,
        fontWeight: "500"
    },
    //添加
    textAdd: {
        marginRight: 20,
        fontSize: fontscale * 14,
        color:"#d81e06",
        fontWeight: "200"
    }
});