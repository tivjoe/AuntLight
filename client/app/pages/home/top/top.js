import React, { Component } from 'react';
import { View,StyleSheet } from 'react-native';
import {ViewPosition,ViewHead,ViewSelectImage} from './parts';

/**
 * 组件
 * 导航栏
 */
export default class Top extends Component {
    render() {
        return (
            <View style={styleTop.top}>
                <ViewPosition />
                <ViewSelectImage />
                <ViewHead />
            </View>
        );
    }
}

/* 样式 */
const styleTop=StyleSheet.create({
    top: {
        height: 44,
        flexDirection: 'row',
        justifyContent:"space-between",
        alignItems: 'center',
    },
});