import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import FastImage from "react-native-fast-image";
import { unitWidth, fontscale } from "../../../public/SreenUil";
import NavigationService from '../../../public/NavigationService';
import {sendWs} from '../../../public/Websocket';

/**
 * 零件
 * 导航栏
 * 返回
 */
export class Top extends Component {
    render() {
        return (
            <View style={styleBack.back}>
                < TouchableOpacity onPress={() => NavigationService.back()}>
                    <FastImage
                        style={styleBack.image}
                        source={require("../../../res/fanhui.png")}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>sendWs("get_class_or_goods", data={flag: "class"})} >
                    <Text style={styleBack.textF5} >刷新</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

/* 样式 */
const styleBack = StyleSheet.create({
    back: {
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems:"center",
        height: 44,
    },
    image: {
        marginLeft: 20,
        width: unitWidth * 40,
        height: unitWidth * 40
    },
    textF5: {
        marginRight: 20,
        fontSize:fontscale*14,
        color: "#2196f3",
    }
});