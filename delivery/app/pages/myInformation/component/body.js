import React, { Component } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import { unitWidth, fontscale } from '../../../public/SreenUil';
import { observer, inject } from 'mobx-react';

/*
 *我的，页面
 *主页面结构
 */
@inject('myInformationStore')
export default class ViewList extends Component {

    store = this.props.myInformationStore

    render() {
        return (
            <ScrollView keyboardShouldPersistTaps="never" >

                <View style={styleBody.viewItemClass} >
                    <Text style={styleBody.textTitle}>认证</Text>
                    <Text style={styleBody.text}>{this.store.information.isPass}</Text>
                </View>

                <View style={styleBody.viewItem} >
                    <Text style={styleBody.textTitle}>支付宝</Text>
                    <Text style={styleBody.text}>{this.store.information.isBindAlipay}</Text>
                </View>

                <View style={styleBody.viewItem}>
                    <Text style={styleBody.textTitle}>评分</Text>
                    <Text style={styleBody.text}>{this.store.information.level}</Text>
                </View>

                <View style={styleBody.viewItemClass}>
                    <Text style={styleBody.textTitle}>余额</Text>
                    <Text style={styleBody.text}>¥{this.store.information.blance}</Text>
                </View>
                <View style={styleBody.viewItem}>
                    <Text style={styleBody.textTitle}>总接单</Text>
                    <Text style={styleBody.text}>{this.store.information.allOrderNumber}单</Text>
                </View>

                <View style={styleBody.viewItem}>
                    <Text style={styleBody.textTitle}>总交易额</Text>
                    <Text style={styleBody.text}>¥{this.store.information.turnover}</Text>
                </View>

                <View style={{ backgroundColor: "white", marginTop: 20, height: unitWidth * 100, flexDirection: "row", justifyContent: "center", alignItems: "center", borderBottomWidth: 1, borderBottomColor: "#eaeaea" }}>
                    <Text style={{}}>提现</Text>
                </View>

            </ScrollView>
        );
    }
}

const styleBody = StyleSheet.create({
    viewItem: {
        backgroundColor: "white",
        height: unitWidth * 100,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#eaeaea"
    },
    textTitle: {
        marginLeft: 20,
        color: "#5a5a5a",
        fontSize: fontscale * 14,
        fontWeight: "300"
    },
    text: {
        marginRight: 20,
        fontSize: fontscale * 14,
        fontWeight: "500"
    },

    viewItemAddress: {
        backgroundColor: "white",
        height: unitWidth * 150,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#eaeaea"
    },
    textTitleAddress: {
        marginRight: unitWidth * 20,
        fontSize: fontscale * 12,
        color: "#c7c7c7",
        fontWeight: "500"
    },

    viewItemClass: {
        marginTop: 20,
        backgroundColor: "white",
        height: unitWidth * 100,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#eaeaea"
    }

})