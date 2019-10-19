import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import FastImage from "react-native-fast-image";
import { unitWidth, fontscale } from "../../../public/SreenUil";
import NavigationService from '../../../public/NavigationService';
import { inject, observer } from 'mobx-react';

/**
 * 零件
 * 导航栏
 * 返回
 */
@inject('myInformationStore')
@observer
export class ViewBack extends Component {

    store = this.props.myInformationStore

    render() {
        return (
            <View style={styleBack.back}>
                <TouchableOpacity onPress={() => NavigationService.back()}>
                    <FastImage
                        style={styleBack.image}
                        source={require("../../../res/fanhui.png")}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

/* 样式 */
const styleBack = StyleSheet.create({
    back: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 44,
    },
    image: {
        marginLeft: 20,
        width: unitWidth * 40,
        height: unitWidth * 40
    },
});