import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import FastImage from "react-native-fast-image";
import { unitWidth, fontscale } from "../../../public/SreenUil";
import NavigationService from '../../../public/NavigationService';
import { inject, observer } from 'mobx-react';
import {sendWs} from '../../../public/Websocket';

/**
 * 零件
 * 导航栏
 * 返回
 */
@inject('myInformationStore')
@observer
export class ViewBack extends Component {

    store = this.props.myInformationStore

    render() {
        return (
            <View style={styleBack.back}>
                <TouchableOpacity onPress={() => NavigationService.back()}>
                    <FastImage
                        style={styleBack.image}
                        source={require("../../../res/fanhui.png")}
                    />
                </TouchableOpacity>
                <TouchableOpacity disabled={!this.store.isChange} onPress={() => this.update()} >
                    <Text style={this.store.isChange == true ? styleBack.textYes : styleBack.textNo} >确认</Text>
                </TouchableOpacity>
            </View>
        )
    }

    update = () => {
        const name = this.store.changeArrayText.name;
        const feight = Number(this.store.changeArrayText.feight);
        const preparingTime = Number(this.store.changeArrayText.preparingTime);
        const startMoney = Number(this.store.changeArrayText.startMoney)
        if(name==null||name==""){
            Alert.alert("提示","店铺名不能为空");
            return;
        }else if(feight==null||feight<0){
            Alert.alert("提示","配送费错误");
            return;
        }else if(preparingTime==null||preparingTime<0){
            Alert.alert("提示","备餐时间错误");
            return;
        }else if(startMoney==null||startMoney<0){
            Alert.alert("提示","起送费错误");
            return;
        }
        const data={
            seller_name:name,
            feight:feight,
            preparing_time:preparingTime,
            start_money:startMoney
        };
        sendWs("update_information",data);
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
    textYes: {
        marginRight: 20,
        //fontSize: fontscale * 16,
        //fontWeight: "300",
        color: "red"
    },
    textNo: {
        marginRight: 20,
        //fontSize: fontscale * 16,
        //fontWeight: "300",
        color: "#c7c7c7"
    }
});