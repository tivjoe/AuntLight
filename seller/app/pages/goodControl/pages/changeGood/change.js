import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Alert,TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';
import { unitWidth, fontscale } from '../../../../public/SreenUil';
import NavigationService from '../../../../public/NavigationService';
import { inject, observer } from 'mobx-react';
import ImagePicker from 'react-native-image-crop-picker';
import { sendWs } from '../../../../public/Websocket';

/**
 * 导航栏
 */
@inject("changeGoodStore")
@observer
export class Top extends Component {

    store = this.props.changeGoodStore;

    render() {
        return (
            <View style={style.top}>
                < TouchableOpacity onPress={() => NavigationService.back()}>
                    <FastImage
                        style={style.imageBack}
                        source={require("../../../../res/fanhui.png")}
                    />
                </TouchableOpacity>
                <Text style={style.textTitle}>修改商品</Text>
                <View style={style.viewC}>
                    <TouchableOpacity onPress={() => this.deleteGood()} >
                        <FastImage style={style.imageG} source={require("../../../../res/Group-.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity disabled={!this.store.isUp} onPress={() => this.updateGood()} >
                        <Text style={this.store.isUp == true ? style.textYesConfim : style.textNoConfim}>修改</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    deleteGood() {
        Alert.alert(
            '提示',
            '确定删除？',
            [
                { text: '取消', style: 'cancel' },
                { text: '确定', onPress: () => this.delete() },
            ],
        )
    }

    delete() {
        const data = {
            class_name: this.store.info.old_class,
            good_name: this.store.info.old_name
        }
        sendWs("delete_good", data);
    }

    updateGood() {
        const good_price = Number(this.store.info.price);
        if (isNaN(good_price) || good_price < 0) {
            Alert.alert("提示", "商品价格不能小于0")
            return;
        }
        if (this.store.info.base64 == '') {
            const data = {
                old_class: this.store.info.old_class,
                class_name: this.store.info.change_class,
                old_name: this.store.info.old_name,
                good_name: this.store.info.change_name,
                good_price: Number(this.store.info.price),
                is_out: this.store.info.is_out,
                good_url: this.store.info.url,
            }
            sendWs("update_good", data);
            return;
        } else {
            this.putb64(this.store.info.base64)
        }
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
                    old_class: this.store.info.old_class,
                    class_name: this.store.info.change_class,
                    old_name: this.store.info.old_name,
                    good_name: this.store.info.change_name,
                    good_price: Number(this.store.info.price),
                    is_out: this.store.info.is_out,
                    good_url: responseData.key,
                }
                sendWs("update_good", data);
            })
            .catch((error) => { console.error('error', error) });
    }
}

@inject("changeGoodStore")
@observer
export class Body extends Component {

    store = this.props.changeGoodStore;

    render() {
        return (
            <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="never" >



                <View style={style.viewBody}>

                    <View style={style.viewItem}>
                        <Text style={style.textItem}>名称 : </Text>
                        <TextInput
                            defaultValue={this.store.info.change_name}
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
                            defaultValue={"" + this.store.info.price}
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
                            <Text style={{ marginLeft: unitWidth * 50, }}>{this.store.info.change_class}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={style.viewImage}>
                        <Text style={style.textImage}>图片 : </Text>
                        <TouchableOpacity onPress={() => this.imagePicker()} >
                            <FastImage source={{ uri: this.store.info.url }} style={style.image} />
                        </TouchableOpacity>
                    </View>

                    <View style={style.viewCheck} >
                        <TouchableWithoutFeedback onPress={()=>this.store.updateIsout("yes")} >
                            <View style={style.viewCheckItem} >
                                <View style={this.store.info.is_out === 1 ? style.viewYesCheck : style.viewNoCheck} />
                                <Text style={style.textCheck} >有货</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>this.store.updateIsout("no")} >
                            <View style={style.viewCheckItem} >
                                <View style={this.store.info.is_out === 0 ? style.viewYesCheck : style.viewNoCheck} />
                                <Text style={style.textCheck} >售尽</Text>
                            </View>
                        </TouchableWithoutFeedback>
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
    viewC: {
        flexDirection: 'row',
        justifyContent: "center",
    },
    imageG: {
        marginRight: 10,
        width: unitWidth * 35,
        height: unitWidth * 35
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
    },

    viewCheck: {
        flexDirection: "row",
        marginTop: 40,
        justifyContent: "space-around",
        alignItems: "center"
    },
    viewCheckItem: {
        flexDirection: "row",
        alignItems: "center"
    },
    textCheck: {
        fontSize: fontscale * 14,
        fontWeight: "300"
    },
    viewYesCheck: {
        width: unitWidth * 40,
        height: unitWidth * 40,
        marginRight: 10,
        borderRadius: unitWidth * 40 / 2,
        backgroundColor: "red"
    },
    viewNoCheck: {
        width: unitWidth * 40,
        height: unitWidth * 40,
        marginRight: 10,
        borderRadius: unitWidth * 40 / 2,
        borderWidth: 1,
        borderColor: "red"
    }
})