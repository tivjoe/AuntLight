import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { unitWidth, fontscale } from "../../../public/SreenUil";
import { inject, observer } from 'mobx-react';
import NavigationService from '../../../public/NavigationService';

/**
 * 零件
 * 导航栏
 * 返回
 */
@inject("previewShopStore")
@observer
export class Top extends Component {

    store = this.props.previewShopStore;

    render() {
        return (
            <View style={styleBack.back}>
                < TouchableOpacity onPress={() => NavigationService.back()}>
                    <FastImage
                        style={styleBack.image}
                        source={require("../../../res/fanhui.png")}
                    />
                </TouchableOpacity>
                < TouchableOpacity onPress={()=>this.store.openClass()} >
                    <FastImage
                        style={styleBack.imageClass}
                        source={require("../../../res/category.png")}
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
    imageClass: {
        marginRight: 20,
        width: unitWidth * 40,
        height: unitWidth * 40
    }
});