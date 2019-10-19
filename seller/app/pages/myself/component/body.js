import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import FastImage from "react-native-fast-image";
import { unitWidth, fontscale } from "../../../public/SreenUil";
import NavigationService from "../../../public/NavigationService";

/**
 * 组件
 * 功能块 
 */
export default class Body extends Component {
    render() {
        return (
            <View style={{ flex: 1, marginTop: unitWidth * 40 }}>

                <TouchableWithoutFeedback onPress={() => NavigationService.navigate('goodControlPage')} >
                    <View style={styleBody.view}>
                        <FastImage source={require('../../../res/yunliankeji-.png')} style={styleBody.image} />
                        <View style={styleBody.viewC}>
                            <Text style={styleBody.text}>商品</Text>
                            <FastImage source={require('../../../res/arrow-right.png')} style={styleBody.imageGo} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => NavigationService.navigate('myOrderPage')} >
                    <View style={styleBody.view}>
                        <FastImage source={require('../../../res/dingdan-2.png')} style={styleBody.image1} />
                        <View style={styleBody.viewC1} >
                            <Text style={styleBody.text}>订单</Text>
                            <FastImage source={require('../../../res/arrow-right.png')} style={styleBody.imageGo} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => NavigationService.navigate('previewShopPage')} >
                    <View style={styleBody.view}>
                        <FastImage source={require('../../../res/dianpu.png')} style={styleBody.image} />
                        <View style={styleBody.viewC}>
                            <Text style={styleBody.text}>店铺预留</Text>
                            <FastImage source={require('../../../res/arrow-right.png')} style={styleBody.imageGo} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>

            </View>
        )
    }
}

/* 样式 */
const styleBody = StyleSheet.create({
    //功能item父
    view: {
        flexDirection: 'row',
        width: '100%',
        height: unitWidth * 90,
        alignItems: 'center'
    },
    //功能图片
    image: {
        marginLeft: 20,
        width: unitWidth * 50,
        height: unitWidth * 50,
    },
    //功能图片
    image1: {
        marginLeft: 20,
        width: unitWidth * 40,
        height: unitWidth * 40,
    },
    //功能view
    viewC: {
        flexDirection: 'row',
        width: unitWidth * 600,
        marginLeft: 20,
        height: unitWidth * 80,
        justifyContent: 'space-between',
        alignItems: "center"
    },
    //功能view
    viewC1: {
        flexDirection: 'row',
        width: unitWidth * 600,
        marginLeft: 25,
        height: unitWidth * 80,
        justifyContent: 'space-between',
        alignItems: "center"
    },
    //功能text
    text: {
        fontSize: fontscale * 16,
        fontWeight: "400"
    },
    //跳转
    imageGo: {
        width: unitWidth * 50,
        height: unitWidth * 50
    }
})