import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet, FlatList } from 'react-native';
import FastImag from 'react-native-fast-image';
import { unitWidth, fontscale } from '../../../../public/SreenUil';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';


/**
 * 零件
 * 我的地址列表
 */
@inject('confimOrderStore')
@observer
export class ViewAddressList extends Component {

    //获取store
    store = this.props.confimOrderStore

    render() {
        return (
            <FlatList
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                data={toJS(this.store.myAddressList)}
                //keyExtractor={item => item.id}
                extraData={this.state}

                //不为空
                renderItem={({ item, index }) =>
                    <TouchableWithoutFeedback onPress={() => this.selectAddress(index)}>
                        <View style={styleAddress.viewAddress}>
                            <Text style={styleAddress.textAddress}>{item.position_Name}     {item.house}</Text>
                            <Text style={styleAddress.textName}>{item.contact_name}    {item.contact_phone}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                }

                //为空
                ListEmptyComponent={() =>
                    <View style={styleAddress.address}>
                        <View style={{ width: "100%", height: unitWidth * 300, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 16, fontWeight: "500" }}>没有您的收货地址，赶快添加吧！</Text>
                        </View>
                    </View>
                }
            />
        )
    }

    /* 选择地理位置 */
    selectAddress = (index) => {
        this.store.selectAddress(index);
        this.store.closeModal("address");
    }
}

/* 样式 */
const styleAddress = StyleSheet.create({
    address: {
        width: "100%",
        height: unitWidth * 400
    },
    textTitle: {
        marginTop: 20,
        marginLeft: 20,
        color: "#c7c7c7",
        fontWeight: "400",
        fontSize: fontscale * 14
    },
    viewAddress: {
        marginBottom: unitWidth * 20,
        marginLeft: unitWidth * 50,
        width: "85%",
        height: unitWidth * 100,
        justifyContent: "space-around",
    },
    textAddress: {
        fontWeight: "500",
        fontSize: fontscale * 16,
    },
    textName: {
        fontWeight: "500",
        fontSize: fontscale * 13,
        color: "#c7c7c7"
    }
})

/**
 * 零件
 * 支付方式
 */
@inject('confimOrderStore')
@observer
export class ViewPayMethod extends Component {

    //获取store
    store = this.props.confimOrderStore

    render() {
        return (
            <View style={stylePay.pay}>

                <TouchableWithoutFeedback onPress={() => this.selectPayMethod("alipay")}>
                    <View style={stylePay.item} >
                        <View style={stylePay.viewItem} >
                            <FastImag style={stylePay.image} source={require("../../../../res/zhifubao.png")} />
                            <Text style={stylePay.text} >支付宝</Text>
                        </View>
                        <FastImag
                            style={stylePay.select}
                            source={
                                this.store.payMethod == "alipay"
                                    ?
                                    require('../../../../res/zhifuchenggong-2.png')
                                    :
                                    require('../../../../res/zhifuchenggong.png')
                            }
                        />
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => this.selectPayMethod("weichatpay")}>
                    <View style={stylePay.item} >
                        <View style={stylePay.viewItem} >
                            <FastImag style={stylePay.image} source={require("../../../../res/weixinzhifu.png")} />
                            <Text style={stylePay.text} >微信</Text>
                        </View>
                        <FastImag
                            style={stylePay.select}
                            source={
                                this.store.payMethod == "weichatpay"
                                    ?
                                    require('../../../../res/zhifuchenggong-2.png')
                                    :
                                    require('../../../../res/zhifuchenggong.png')
                            }
                        />
                    </View>
                </TouchableWithoutFeedback>


            </View>
        )
    }

    selectPayMethod = (method) => {
        this.store.selectPayMethod(method);
        this.store.closeModal("pay");
    }
}

/* 样式 */
const stylePay = StyleSheet.create({
    pay: {
        flex: 1
    },
    item: {
        height: unitWidth * 100,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    viewItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        marginLeft: 20,
        width: unitWidth * 40,
        height: unitWidth * 40
    },
    text: {
        marginLeft: 20,
        fontSize: fontscale * 14
    },
    select: {
        marginRight: 20,
        width: unitWidth * 40,
        height: unitWidth * 40
    }
});