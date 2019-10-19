import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import FastImage from 'react-native-fast-image';
import { unitWidth, fontscale } from '../../../../public/SreenUil';
import NavigationService from '../../../../public/NavigationService';
import { inject, observer } from 'mobx-react';
import ImagePicker from 'react-native-image-crop-picker';
import { sendWs } from '../../../../public/Websocket';

/**
 * 导航栏
 */
@inject("addGoodStore")
@observer
export class Top extends Component {

    store = this.props.addGoodStore;

    render() {
        return (
            <View style={style.top}>
                < TouchableOpacity onPress={() => NavigationService.back()}>
                    <FastImage
                        style={style.imageBack}
                        source={require("../../../../res/fanhui.png")}
                    />
                </TouchableOpacity>
                <Text style={style.textTitle}>添加商品</Text>
                <TouchableOpacity disabled={!this.store.isUp} onPress={() => this.addGood()} >
                    <Text style={this.store.isUp == true ? style.textYesConfim : style.textNoConfim}>确认</Text>
                </TouchableOpacity>
            </View>
        )
    }

    addGood() {
        const good_price = Number(this.store.info.price);
        if (isNaN(good_price) || good_price < 0) {
            Alert.alert("提示", "商品价格不能小于0")
            return;
        }
        this.putb64(this.store.info.base64)
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
                const data = {
                    class_name: this.store.info.onClass,
                    good_name: this.store.info.name,
                    good_price: Number(this.store.info.price),
                    good_url: responseData.key,
                }
                sendWs("add_good", data);
            })
            .catch((error) => { console.error('error', error) });
    }
}

/**
 * 输入
 */
@inject("addGoodStore")
@observer
export class Body extends Component {

    store = this.props.addGoodStore;

    render() {
        return (
            <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="never" >



                <View style={style.viewBody}>

                    <View style={style.viewItem}>
                        <Text style={style.textItem}>名称 : </Text>
                        <TextInput
                            defaultValue={this.store.info.name}
                            style={style.text2}
                            placeholder="请输入商品名称"
                            autoCapitalize="none"
                            maxLength={20}
                            onChangeText={(text) => this.store.onChangeText("name", text)}
                        />
                    </View>

                    <View style={style.viewItem}>
                        <Text style={style.textItem} >价格 : </Text>
                        <TextInput style={style.text2}
                            defaultValue={this.store.info.price}
                            placeholder="请输入商品价格"
                            keyboardType="numeric"
                            autoCapitalize="none"
                            maxLength={6}
                            onChangeText={(text) => this.store.onChangeText("price", text)}
                        />
                    </View>

                    <View style={style.viewItem}>
                        <Text style={style.textItem}>类别 : </Text>
                        <TouchableOpacity onPress={() => this.store.openModal()} >
                            <Text
                                style=
                                {
                                    this.store.info.onClass == "点击选择分类"
                                        ?
                                        { color: "#c7c7c7", marginLeft: unitWidth * 50, }
                                        :
                                        { marginLeft: unitWidth * 50, }
                                }
                            >
                                {this.store.info.onClass}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={style.viewImage}>
                        <Text style={style.textImage}>图片 : </Text>
                        <TouchableOpacity onPress={() => this.imagePicker()} >
                            {
                                this.store.info.loaclUrl == ''
                                    ?
                                    <Text style={style.textImageOn}>点击添加图片</Text>
                                    :
                                    <FastImage source={{ uri: this.store.info.loaclUrl }} style={style.image} />
                            }

                        </TouchableOpacity>
                    </View>

                </View>

            </ScrollView>
        )
    }

    imagePicker = () => {
        sendWs("get_qiniu_upload_token");
        //打开图库
        ImagePicker.openPicker({
            includeBase64: true,
            cropping: true
        }).then(image => {
            this.store.onImage(image.sourceURL, image.data);
        });
    }
}

const style = StyleSheet.create({
    top: {
        width: '100%',
        height: 44,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "#eaeaea"
    },
    imageBack: {
        marginLeft: 20,
        width: unitWidth * 40,
        height: unitWidth * 40
    },
    textTitle: {
        fontWeight: "500",
        fontSize: fontscale * 16
    },
    textNoConfim: {
        marginRight: 20,
        fontSize: fontscale * 15,
        color: "#c7c7c7"
    },
    textYesConfim: {
        marginRight: 20,
        fontSize: fontscale * 15,
        color: "red"
    },

    viewBody: {
        width: "92%",
        marginLeft: 20
    },
    viewItem: {
        width: "100%",
        flexDirection: "row",
        height: unitWidth * 100,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#eaeaea2B"
    },
    textItem: {
        fontSize: fontscale * 14,
        fontWeight: "300"
    },
    text4: {
        marginLeft: unitWidth * 50,
        fontSize: fontscale * 14,
        fontWeight: "500"

    },
    text2: {
        marginLeft: unitWidth * 50,
        fontSize: fontscale * 14,
        fontWeight: "500"
    },
    viewImage: {
        width: "100%",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#eaeaea2B"
    },
    textImage: {
        marginTop: 20,
        height: unitWidth * 80,
        fontSize: fontscale * 14,
        fontWeight: "300"
    },
    textImageOn: {
        marginTop: 20,
        height: unitWidth * 80,
        marginLeft: unitWidth * 50,
        fontSize: fontscale * 14,
        fontWeight: "500",
        color: "#c7c7c7"
    },
    image: {
        marginTop: 20,
        marginLeft: unitWidth * 50,
        width: unitWidth * 150,
        height: unitWidth * 150
    }
})