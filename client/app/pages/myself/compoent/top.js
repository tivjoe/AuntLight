import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { unitWidth, fontscale } from "../../../public/SreenUil";
import NavigationService from '../../../public/NavigationService';
import { inject, observer } from 'mobx-react';
import { sendWs } from '../../../public/Websocket';
import ImagePicker from 'react-native-image-crop-picker';

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

                <View style={styleInfo.viewHn}>
                    <TouchableOpacity onPress={() => this.imagePicker()} >
                        <FastImage
                            style={styleInfo.head}
                            source={{ uri: this.store.info.user_headurl }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.store.openModal("name")} >
                        <Text style={styleInfo.textName}>{this.store.info.user_name}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styleInfo.viewMoe}>

                    <View style={styleInfo.viewText} >
                        <Text style={styleInfo.textMessage} >2</Text>
                        <Text style={styleInfo.textInfo} >消息</Text>
                    </View>

                    <View style={styleInfo.viewText} >
                        <Text style={styleInfo.textNumber} >{this.store.info.user_count_outlay}</Text>
                        <Text style={styleInfo.textInfo} >花费</Text>
                    </View>

                    <View style={styleInfo.viewText} >
                        <Text style={styleInfo.textNumber} >{this.store.info.user_count_orders}</Text>
                        <Text style={styleInfo.textInfo} >下单</Text>
                    </View>

                </View>

            </View>
        )
    }

    /* 打开相机 */
    imagePicker = () => {
        //获取上传凭证
        sendWs("get_qiniu_upload_token");
        //打开图库
        ImagePicker.openPicker({
            includeBase64: true,
            cropping: true
        }).then(image => {
            this.store.updateInfo("head", image.sourceURL);
            this.putb64(image.data);
        });
    }

    putb64 = (pic) => {
        fetch('http://upload.qiniup.com/putb64/-1', {
            method: 'POST',
            headers: {
                "Content-Type": "application/octet-stream",
                "Authorization": "UpToken " + global.qiniuToken
            },
            body: pic
        })
            .then((response) => response.json())
            .then((responseData) => {
                const data={key: responseData.key}
                sendWs("update_head",data);
            })
            .catch((error) => { console.error('error', error) });
    }
}

/* 样式 */
const styleInfo = StyleSheet.create({
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