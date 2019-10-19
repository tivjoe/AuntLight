import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { unitWidth, fontscale } from '../../../public/SreenUil';
import FastImage from 'react-native-fast-image';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';


/**
 * 组件
 * 订单信息
 */
@inject("myOrderDetailStore")
@observer
export class OrderInfo extends Component {

    //获取store
    store = this.props.myOrderDetailStore;

    render() {
        return (
            <View style={{ flex: 1, marginTop: 10 }} >

                <View style={styleInfo.itemView}>
                    <Text style={styleInfo.textTitle}>下单时间</Text>
                    <View style={styleInfo.textView}>
                        <Text style={styleInfo.text}>{this.store.get_order_time}</Text>
                    </View>
                </View>

                <View style={styleInfo.itemView}>
                    <Text style={styleInfo.textTitle}>支付价格</Text>
                    <View style={styleInfo.textView}>
                        <Text style={styleInfo.text}>¥ {this.store.order.order_money}</Text>
                        <Text style={{ fontSize: fontscale * 12 }} > (含配送费¥{this.store.order.user_pay_freight})</Text>
                    </View>
                </View>

                <View style={styleInfo.itemView}>
                    <Text style={styleInfo.textTitle}>订单备注</Text>
                    <View style={styleInfo.textView}>
                        <Text style={styleInfo.text}>{this.store.order.remake == null ? "无" : this.store.order.contact_remake}</Text>
                    </View>
                </View>

                <View style={styleInfo.itemView}>
                    <Text style={styleInfo.textTitle}>订单编号</Text>
                    <View style={styleInfo.textView}>
                        <Text style={styleInfo.text}>{this.store.order.order_id}</Text>
                    </View>
                </View>

                <View style={styleInfo.itemView}>
                    <View style={styleInfo.viewSeller} >
                        <Text style={styleInfo.text}>联系用户</Text>
                        <FastImage style={styleInfo.image} source={require("../../../res/jiantouyou.png")} />
                    </View>
                    <View style={styleInfo.textView}>
                        <Text style={styleInfo.text}>联系配送员</Text>
                        <FastImage style={styleInfo.image} source={require("../../../res/jiantouyou.png")} />
                    </View>
                </View>

            </View>
        )
    }
}

/* 样式 */
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
        fontSize: fontscale * 14,
        fontWeight: '200',
        //color:"#c7c7c7"
    },
    text: {
        fontSize: fontscale * 14,
        //color: "#d81e06",
    },
    image: {
        width: unitWidth * 20,
        height: unitWidth * 20
    },
    viewAddress: {
        flexDirection: 'column',
        width: unitWidth * 400,
        height: unitWidth * 120,
        justifyContent: "center",
        alignItems: 'flex-end',
        marginRight: 20,
    },
    itemAddress: {
        height: unitWidth * 120,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    viewSeller: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
    }
});


/**
 * 组件
 * 购物车列表
 */
@inject("myOrderDetailStore")
@observer
export class GoodsList extends Component {

    //获取store
    store = this.props.myOrderDetailStore;


    render() {
        return (
            <FlatList
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                data={toJS(this.store.order.good_list)}
                //keyExtractor={item => item.seller_id}
                extraData={this.state}
                renderItem={({ item, index }) =>
                    <View style={styleList.item}>
                        <View style={styleList.imageItem}>
                            <FastImage style={styleList.image} source={{ uri: item.good_url }} />
                            <View style={styleList.viewText}>
                                <Text style={styleList.text}>{item.good_name}</Text>
                            </View>
                        </View>
                        <View style={styleList.itemText}>
                            <View style={styleList.viewCount}>
                                <Text style={styleList.text}>x {item.good_amount}</Text>
                            </View>
                            <View style={styleList.viewPrice} >
                                <Text style={styleList.text}>{item.good_price}</Text>
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