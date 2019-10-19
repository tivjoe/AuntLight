import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { unitWidth, fontscale } from "../../../../public/SreenUil";
import FastImage from "react-native-fast-image";
import { inject, observer } from 'mobx-react';

/**
 * 组件
 * 头部，返回+配送地址
 */
@inject("confimOrderStore")
@observer
export class Top extends Component {

    //获取store
    store = this.props.confimOrderStore;

    render() {
        return (
            <View style={styleTop.top} >
                <TouchableOpacity onPress={() => this.store.goBack()}>
                    <FastImage style={styleTop.image} source={require("../../../../res/fanhui.png")} />
                </TouchableOpacity>
            </View>
        )
    }
}

/* 样式 */
const styleTop = StyleSheet.create({
    top: {
        height: 44,
        justifyContent: 'center',
    },
    image: {
        marginLeft: 20,
        width: unitWidth * 40,
        height: unitWidth * 40
    }
})


/**
 * 组件
 * 地址选择
 */
@inject("confimOrderStore")
@observer
export class Address extends Component {

    //获取store
    store = this.props.confimOrderStore;

    render() {
        if (this.store.address.length == 0) {
            return (
                <TouchableWithoutFeedback onPress={() => this.openModal()} >
                    <View style={styleAddress.noView}>
                        <Text style={styleAddress.textAddress} >选择收货地址</Text>
                        <FastImage style={styleAddress.image} source={require("../../../../res/jiantouyou.png")} />
                    </View>
                </TouchableWithoutFeedback>
            )
        } else {
            return (
                <TouchableWithoutFeedback onPress={() => this.openModal()} >
                    <View>
                        <View style={styleAddress.noView}>
                            <Text style={styleAddress.textAddress} >{this.store.address.position_Name}     {this.store.address.house}</Text>
                            <FastImage style={styleAddress.image} source={require("../../../../res/jiantouyou.png")} />
                        </View>
                        <Text style={styleAddress.textContact} >{this.store.address.contact_name}    {this.store.address.contact_phone}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    }

    /* 打开addressModa l */
    openModal = () => {
        this.store.openModal("address");
    }
}

/* 样式 */
const styleAddress = StyleSheet.create({
    noView: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 10,
    },
    image: {
        marginLeft: 10,
        width: unitWidth * 20,
        height: unitWidth * 20
    },
    textAddress: {
        marginLeft: 20,
        fontSize: fontscale * 18,
        fontWeight: "500"
    },
    textContact: {
        marginTop: 10,
        marginLeft: 20,
        fontSize: fontscale * 14,
    }
})