import React, { Component } from 'react';
import { Text, StyleSheet } from "react-native";
import { fontscale, unitWidth } from "../../../../public/SreenUil";
import { inject, observer } from 'mobx-react';
import { View } from 'react-native-animatable';


/**
 * 零件
 * 订单信息
 */
@inject("confimOrderStore")
@observer
export class ViewPayMethod extends Component {

    //获取store
    store = this.props.confimOrderStore;

    render() {
        return (
            <Text style={stylePay.text}>
                {this.store.payMethod == "alipay" ? "支付宝" : "微信"}
            </Text>
        )
    }
}

const stylePay = StyleSheet.create({
    text: {
        marginRight: 10,
        fontSize: fontscale * 14,
        fontWeight: '500',
    }
});

/**
 * 零件
 * 订单信息
 */
@inject("confimOrderStore")
@observer
export class ViewRemake extends Component {

    //获取store
    store = this.props.confimOrderStore;

    render() {
        return (
            <View style={styleRemake.view}>
                <Text style={this.store.remake == "" ? styleRemake.no : styleRemake.yes} numberOfLines={1} >
                    {this.store.remake == "" ? "添加备注" : this.store.remake}
                </Text>
            </View>
        )
    }
}

const styleRemake = StyleSheet.create({
    view:{
        justifyContent: 'flex-end', 
        alignItems: 'flex-end', 
        width: unitWidth * 350,
    },
    no: {
        marginRight: 10,
        fontSize: fontscale * 14,
        color: "#c7c7c7",
    },
    yes: {
        marginRight: 10,
        fontSize: fontscale * 14,
    }
});