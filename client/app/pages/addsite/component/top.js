import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { unitWidth, fontscale } from '../../../public/SreenUil';
import FastImage from 'react-native-fast-image';
import NavigationService from '../../../public/NavigationService';
import { selectNearPoi, selectCurrentPoi } from '../../../public/Position'
import { inject } from "mobx-react";
import { verificationPhoneNumber } from "../../../public/InputValidation";
import {sendWs} from "../../../public/Websocket";

/**
 * 组件
 * 导航栏+零件
 */
@inject("addSiteStore")
export default class Top extends Component {

    //获取store
    store = this.props.addSiteStore;

    componentDidMount(){
        this.store.updateCallBack(this.props.callBack)
    }

    render() {
        return (
            <View style={{ height: 88 }}>
                <ViewTop />
                <ViewSelectInput />
            </View>
        )
    }
}



/**
 * 零件
 * 导航栏
 */
@inject("addSiteStore")
class ViewTop extends Component {

    //获取store
    store = this.props.addSiteStore;

    render() {
        return (
            <View style={styleTop.viewTop}>
                < TouchableOpacity onPress={() => NavigationService.back()}>
                    <FastImage style={styleTop.imageBack} source={require("../../../res/fanhui.png")} />
                </ TouchableOpacity>
                <Text style={styleTop.textTitle}>新增收货地址</Text>
                < TouchableOpacity onPress={() => this.confim()}>
                    <Text style={styleTop.textConfim}>确认</Text>
                </TouchableOpacity>
            </View>
        )
    }

    //添加地址
    confim = () => {
        //输入验证
        if (this.store.poi.name == "" ||this.store.poi.lng == "" || this.store.poi.lat == "") {
            Alert.alert("提示", "请选择收货地址喔");
            return;
        }
        if (this.store.houseNumber == null) {
            Alert.alert("提示", "请输入门牌号喔");
            return;
        }
        if (this.store.contactName == null) {
            Alert.alert("提示", "请输入联系人");
            return;
        }
        if (this.store.contactPhone == null) {
            Alert.alert("提示", "请输入手机号");
            return;
        }
        if (verificationPhoneNumber(this.store.contactPhone) == false) {
            Alert.alert("提示", "请输入手机号");
            return;
        }
        const data = {
            positionName: this.store.poi.name,
            location: this.store.poi.lng+","+this.store.poi.lat,
            houseNumber: this.store.houseNumber,
            contactName: this.store.contactName,
            contactPhone: this.store.contactPhone
        }
        sendWs("add_address",data);
    }
}

/* 样式 */
const styleTop = StyleSheet.create({
    //导航栏view
    viewTop: {
        height: 44,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    },
    //返回图片
    imageBack: {
        marginLeft: 20,
        width: unitWidth * 40,
        height: unitWidth * 40
    },
    //标题
    textTitle: {
        marginLeft: 20,
        fontSize: fontscale * 16,
        fontWeight: "500"
    },
    //确认
    textConfim: {
        marginRight: 20,
        fontSize: fontscale * 14,
        fontWeight: "400",
        color: "#c7c7c7"
    },
    //选中确认
    textConfim: {
        marginRight: 20,
        fontSize: fontscale * 14,
        fontWeight: "400",
        color: "#19d5a2"
    },
});


/**
 * 零件
 * 查询输入框
 */
@inject("addSiteStore", "homeStore")
class ViewSelectInput extends Component {

    //获取store
    store = this.props.addSiteStore;

    constructor(props) {
        super(props);
        this.state = {
            selectText: '', //输入内容
            isClick: true //true禁止交互
        }
    }

    componentDidMount() {
        //获取当前地理位置poi
        selectNearPoi(this.props.homeStore.lng + "," + this.props.homeStore.lat)
            .then(responseJson => {
                this.store.upDatePois(responseJson);
            })
    }

    render() {
        return (
            <View style={styleSelect.select}>
                <View style={styleSelect.viewImage}>
                    <FastImage style={styleSelect.image} source={require("../../../res/position.png")} />
                    <Text style={styleSelect.textCity}>杭州</Text>
                </View>
                <View style={styleSelect.viewInput}>
                    <TextInput style={styleSelect.input} placeholder="输入您的收货地址" autoCapitalize="none" onChangeText={(text) => this.changeText(text)} />
                </View>
                <TouchableOpacity disabled={this.state.isClick} onPress={() => this.selectPois()}>
                    <Text style={this.state.isClick == true ? styleSelect.textSelect : styleSelect.onTextSelect}>搜索</Text>
                </TouchableOpacity>
            </View>
        )
    }

    /* 输入 */
    changeText = (text) => {
        //同步输入内容，搜索可以交互
        if (text != '') {
            this.setState({ isClick: false, selectText: text })
        } else {
            this.setState({ isClick: true, selectText: '' })
        }
    }

    /* 搜索pois */
    selectPois = () => {
        //查询指定地理位置poi
        selectCurrentPoi(this.state.selectText)
            .then(responseJson => {
                this.store.upDatePois(responseJson);
            })
    }
}
/* 样式 */
const styleSelect = StyleSheet.create({
    //零件
    select: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
    },
    //图片view
    viewImage: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
    },
    //图片
    image: {
        width: unitWidth * 40,
        height: unitWidth * 40
    },
    //城市
    textCity: {
        fontSize: fontscale * 15,
        fontWeight: "300"
    },
    //输入框view
    viewInput: {
        marginLeft: 20,
        width: "57%",
        height: 25,
        backgroundColor: '#c7c7c72B',
        borderRadius: 15,
        justifyContent: "center",
        alignContent: "center",
    },
    //输入
    input: {
        width: "90%",
        marginLeft: 20,
        marginRight: 20
    },
    //可以搜索
    onTextSelect: {
        marginLeft: 20,
        fontSize: fontscale * 15,
        fontWeight: "400"
    },
    //不可以搜索
    textSelect: {
        marginLeft: 20,
        fontSize: fontscale * 15,
        fontWeight: "400",
        color: "#c7c7c7"
    }
});