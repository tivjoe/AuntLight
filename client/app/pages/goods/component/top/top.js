import React, { Component } from "react";
import { View, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { unitWidth } from "../../../../public/SreenUil";
import FastImage from "react-native-fast-image";
import NavigationService from "../../../../public/NavigationService";
import {inject,observer} from "mobx-react";

/**
 * 组件
 * 导航栏
 */
@inject("goodStore")
@observer
export default class Top extends Component {

    //导入store
    store=this.props.goodStore;

    render() {
        return (
            <View style={styleTop.top}>

                < TouchableOpacity onPress={() => NavigationService.back()}>
                    <FastImage
                        style={styleTop.imageBack}
                        source={require("../../../../res/fanhui.png")}
                    />
                </TouchableOpacity>

                <View style={styleTop.view}>
                    <TextInput
                        style={styleTop.input}
                        placeholder='搜索商品'
                    />
                </View>

                <TouchableOpacity onPress={()=>this.store.openClass()}>
                    <FastImage
                        style={styleTop.imageClass}
                        source={require("../../../../res/category.png")}
                    />
                </TouchableOpacity>

            </View>
        )
    }
}

/* 样式 */
const styleTop = StyleSheet.create({
    //父view
    top: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    //返回图片
    imageBack: {
        marginLeft: 20,
        width: unitWidth * 40,
        height: unitWidth * 40
    },
    //分类图片
    imageClass:{
        marginRight: 20,
        width: unitWidth * 40,
        height: unitWidth * 40
    },
    //输入框view
    view: {
        width: unitWidth * 480,
        height: unitWidth * 50,
        backgroundColor: "#c7c7c72B",
        justifyContent: "center",
        alignContent: "center",
        borderRadius: 15
    },
    //输入框
    input: {
        marginLeft: unitWidth * 180
    }

});