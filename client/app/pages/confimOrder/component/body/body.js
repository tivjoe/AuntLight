import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, FlatList } from "react-native";
import { unitWidth, fontscale } from "../../../../public/SreenUil";
import FastImage from "react-native-fast-image";
import { inject, observer } from 'mobx-react';
import { ViewPayMethod, ViewRemake } from './parts';
import * as Animatable from 'react-native-animatable';
import { toJS } from 'mobx';
import { sendWs } from '../../../../public/Websocket';
import { WXTip } from 'react-native-wxtip';

/**
 * 组件
 * 订单信息
 */
@inject("confimOrderStore")
@observer
export class OrderInfo extends Component {

    //获取store
    store = this.props.confimOrderStore;


    render() {
        return (
            <View style={{ flex: 1, marginTop: 20, borderBottomColor: "#eaeaea", borderBottomWidth: 1, }} >

                <View style={styleInfo.itemView}>
                    <Text style={styleInfo.textTitle}>送达时间</Text>
                    <View style={styleInfo.textView}>
                        <Text style={styleInfo.text}>预计10分钟</Text>
                    </View>
                </View>

                <View style={styleInfo.itemView}>
                    <Text style={styleInfo.textTitle}>支付方式</Text>
                    <TouchableWithoutFeedback onPress={() => this.store.openModal("pay")} >
                        <View style={styleInfo.textView}>
                            <ViewPayMethod />
                            <FastImage style={styleInfo.image} source={require("../../../../res/jiantouyou.png")} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <View style={styleInfo.itemView}>
                    <Text style={styleInfo.textTitle}>备注</Text>
                    <TouchableWithoutFeedback onPress={() => this.store.openModal("remake")} >
                        <View style={styleInfo.textView}>
                            <ViewRemake />
                            <FastImage style={styleInfo.image} source={require("../../../../res/jiantouyou.png")} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>

            </View>
        )
    }
}

const styleInfo = StyleSheet.create({
    itemView: {
        height: unitWidth * 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    textTitle: {
        marginLeft: 20,
        fontSize: fontscale * 14
    },
    text: {
        fontSize: fontscale * 14,
        color: "#d81e06",
    },
    image: {
        width: unitWidth * 20,
        height: unitWidth * 20
    },
});


/**
 * 组件
 * 购物车列表
 */
@inject("confimOrderStore")
@observer
export class GoodsList extends Component {

    //获取store
    store = this.props.confimOrderStore;


    render() {
        return (
            <FlatList
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                data={toJS(this.store.shopCar)}
                //keyExtractor={item => item.seller_id}
                extraData={this.state}
                renderItem={({ item, index }) =>
                    <View style={styleList.item}>
                        <View style={styleList.imageItem}>
                            <FastImage style={styleList.image} source={{ uri: item.url }} />
                            <View style={styleList.viewText}>
                                <Text style={styleList.text}>{item.name}</Text>
                            </View>
                        </View>
                        <View style={styleList.itemText}>
                            <View style={styleList.viewCount}>
                                <Text style={styleList.text}>x {item.count}</Text>
                            </View>
                            <View style={styleList.viewPrice} >
                                <Text style={styleList.text}>{item.price}</Text>
                            </View>

                        </View>
                    </View>
                }
            />
        )
    }
}

const styleList = StyleSheet.create({
    item: {
        width: "100%",
        marginTop: 20,
        height: unitWidth * 80,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center"
    },
    imageItem: {
        flexDirection: 'row',
        alignItems: "center"
    },
    image: {
        width: unitWidth * 80,
        height: unitWidth * 80,
        marginLeft: 20
    },
    viewText: {
        marginLeft: 10,
        width: unitWidth * 300,
        height: unitWidth * 80,
        justifyContent: "space-around",
    },
    text: {
        fontSize: fontscale * 12,
    },
    itemText: {
        flexDirection: 'row',
        alignItems: "center"
    },
    viewCount: {
        width: unitWidth * 60,
        alignItems: 'flex-end',
    },
    viewPrice: {
        marginRight: 20,
        width: unitWidth * 130,
        alignItems: 'flex-end',
    },
})


/**
 * 确认支付按钮
 */
@inject("confimOrderStore")
@observer
export class Confim extends Component {

    //获取store
    store = this.props.confimOrderStore;
    //动画
    handleViewRef = ref => this.view = ref;
    bounceIn = () => this.view.bounceIn(800);

    render() {
        return (
            <View style={styleConfim.confim} >

                <TouchableWithoutFeedback onPress={() => this.confim()}>
                    <Animatable.View ref={this.handleViewRef} style={styleConfim.yes}>
                        <Text style={styleConfim.textPrice} >支付：¥{this.store.payMoney}  </Text>
                        <Text style={styleConfim.textFeight} >  (含配送费¥{this.store.feight})</Text>
                    </Animatable.View>
                </TouchableWithoutFeedback>

            </View>
        )
    }

    confim = () => {
        this.bounceIn();
        //对发送请求对数据标准化
        if (this.store.address.length != 0) {
            let good = [];
            for (let i = 0; i < this.store.shopCar.length; i++) {
                good[i] = {
                    good_name: this.store.shopCar[i].name,
                    good_price: this.store.shopCar[i].price,
                    good_amount: this.store.shopCar[i].count,
                    good_url: this.store.shopCar[i].url,
                }
            }
            let order = {
                seller_id: this.store.seller_id,
                order_money: this.store.payMoney,
                freight: this.store.feight,
                pay_method: this.store.payMethod,
                contact_name: this.store.address.contact_name,
                contact_phone: this.store.address.contact_phone,
                contact_street: this.store.address.position_Name + "--" + this.store.address.house,
                contact_remake:this.store.remake,
                lnt: this.store.address.lnt,
                lat: this.store.address.lat,
                good: good,
            }
            //发送请求
            sendWs("place_an_order",order);
        }else{
            WXTip.showToast("请先选择收货地址");
        }
    }
}

/* 样式 */
const styleConfim = StyleSheet.create({
    confim: {
        height: unitWidth * 80,
        width: "100%",
        alignItems: 'center',
    },
    yes: {
        width: "90%",
        height: unitWidth * 80,
        flexDirection: 'row',
        backgroundColor: "#d81e06",
        justifyContent: 'center',
        alignItems: 'center',
    },
    textPrice: {
        fontSize: fontscale * 16,
        color: "white"
    },
    textFeight: {
        fontSize: fontscale * 10,
        color: "white"
    }
})