import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { unitWidth, fontscale } from '../../../public/SreenUil';
import FastImage from 'react-native-fast-image';
import NavigationService from '../../../public/NavigationService';

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