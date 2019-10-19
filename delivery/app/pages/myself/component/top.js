import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import FastImage from "react-native-fast-image";
import { unitWidth, fontscale } from "../../../public/SreenUil";
import NavigationService from '../../../public/NavigationService';
import { inject, observer } from 'mobx-react';
import { toJS } from "mobx";

/**
 * 零件
 * 导航栏
 * 返回
 */
export class ViewBack extends Component {
    render() {
        return (
            <View style={styleBack.back}>
                < TouchableOpacity onPress={() => NavigationService.back()}>
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
        height: 44,
        justifyContent: "center",
    },
    image: {
        marginLeft: 20,
        width: unitWidth * 40,
        height: unitWidth * 40
    }
});

/**
 * 零件
 * 用户信息
 */
@inject("myselfStore")
@observer
export class ViewInfo extends Component {

    //获取store
    store = this.props.myselfStore;

    render() {
        return (
            <View style={{ flex: 1 }}>

                <TouchableWithoutFeedback onPress={() => NavigationService.navigate('myInformationPage', { information: toJS(this.store.inforation) })} >
                    <View style={styleInfo.viewInfo} >
                        <View style={styleInfo.viewHn}>
                            <FastImage style={styleInfo.head} source={{ uri: this.store.inforation.headurl }} />
                            <Text style={styleInfo.textName}>{this.store.inforation.name}</Text>
                        </View>
                        <FastImage style={styleInfo.imageRight} source={require("../../../res/jiantouyou.png")} />
                    </View>
                </TouchableWithoutFeedback>

                <View style={styleInfo.viewMoe}>

                    <View style={styleInfo.viewText} >
                        <Text style={styleInfo.textMessage} >¥215</Text>
                        <Text style={styleInfo.textInfo} >今日收入</Text>
                    </View>

                    <View style={styleInfo.viewText} >
                        <Text style={styleInfo.textNumber} >50</Text>
                        <Text style={styleInfo.textInfo} >今日单量</Text>
                    </View>

                    <View style={styleInfo.viewText} >
                        <Text style={styleInfo.textMoney} >{this.isPassText()}</Text>
                        <Text style={styleInfo.textInfo} >认证</Text>
                    </View>

                </View>

            </View>
        )
    }

    isPassText=()=>{
        switch(this.store.inforation.isPass){
            case 0:
                return "未认证";
            case 1:
                return "通过";
            case 2:
                return "最后一步";
            case 3:
                return "重新提交材料";
        }
    }
}

/* 样式 */
const styleInfo = StyleSheet.create({
    viewInfo: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    //用户头像名字view
    viewHn: {
        height: unitWidth * 160,
        flexDirection: "row",
    },
    //头像
    head: {
        marginTop: 20,
        marginLeft: 20,
        width: unitWidth * 120,
        height: unitWidth * 120,
        borderRadius: 10,
    },
    //箭头右
    imageRight: {
        marginTop: unitWidth * 120,
        marginRight: 20,
        width: unitWidth * 30,
        height: unitWidth * 30,
    },
    //名字
    textName: {
        marginTop: 30,
        marginLeft: 20,
        fontSize: fontscale * 21,
        fontWeight: '600',
    },
    //更多信息view
    viewMoe: {
        height: unitWidth * 130,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    //信息item
    viewText: {
        width: unitWidth * 230,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    //数字
    textNumber: {
        fontSize: fontscale * 18,
        fontWeight: "500"
    },
    textMoney: {
        fontSize: fontscale * 16,
        fontWeight: "500"
    },
    //有消息
    textMessage: {
        color: "red",
        fontSize: fontscale * 18,
        fontWeight: "500"
    },
    //信息名
    textInfo: {
        fontSize: fontscale * 14,
        color: "#c7c7c7",
        marginTop: 5
    }
})