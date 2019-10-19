import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import FastImage from 'react-native-fast-image';
import { unitWidth, fontscale } from '../../../../public/SreenUil';
import { observer, inject } from 'mobx-react';
import {sendWs} from "../../../../public/Websocket";


/**
 * 头部
 */
export class ViewPreparingTop extends Component {
    render() {
        return (
            <View style={preparingTopStyle.top} >
                <View style={preparingTopStyle.View} >
                    <Text style={preparingTopStyle.textGet} >#  {this.props.queue_number}</Text>
                    {
                        this.props.flag == "ready"
                            ?
                            <Text style={preparingTopStyle.textTime}>({this.props.time}前完成备餐)</Text>
                            :
                            <Text style={preparingTopStyle.textTime}>已完成备餐</Text>
                    }

                </View>
                <Text style={preparingTopStyle.textMoney}>实付：¥{this.props.order_money}</Text>
            </View>
        )
    }
}

const preparingTopStyle = StyleSheet.create({
    top: {
        height: unitWidth * 80,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    View: {
        flexDirection: "row",
        alignItems: "center"
    },
    textGet: {
        fontSize: fontscale * 23,
        fontWeight: "500"
    },
    textTime: {
        marginLeft: 10,
        fontSize: fontscale * 12,
        fontWeight: "100"
    },
    textMoney: {
        fontSize: fontscale * 14
    }
})

/**
 * 零件
 * 地址，电话，配送员状态
 */
export class ViewMoreInfo extends Component {
    render() {
        return (
            <View style={moreInfoStyle.moreInfo} >
                <View style={moreInfoStyle.viewImage} >
                    <TouchableOpacity>
                        <FastImage style={moreInfoStyle.imagePhone} source={require("../../../../res/09.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FastImage style={moreInfoStyle.imageAddress} source={require("../../../../res/dizhi.png")} />
                    </TouchableOpacity>
                </View>
                <Text style={{ color: "#d81e06" }} >
                    {
                        this.props.order_state == 1
                            ?
                            "派发骑手中"
                            :
                            "骑手正赶来"
                    }
                </Text>
            </View>
        )
    }
}

const moreInfoStyle = StyleSheet.create({
    moreInfo: {
        height: unitWidth * 80,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    viewImage: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    imagePhone: {
        width: unitWidth * 50,
        height: unitWidth * 50
    },
    imageAddress: {
        marginLeft: 10,
        width: unitWidth * 45,
        height: unitWidth * 45
    }
})

/**
 * 零件
 * 商品
 */
@inject("homeStore")
@observer
export class ViewGood extends Component {

    //获取store
    store = this.props.homeStore;

    render() {
        return (
            <View style={goodStyle.good} >
                <View style={goodStyle.viewItem} >

                    <View style={goodStyle.viewName}>
                        <Text style={goodStyle.textName} >{this.props.good.good_name}</Text>
                    </View>

                    <View style={goodStyle.viewCount}>
                        <Text style={goodStyle.textCount} >x{this.props.good.good_amount}</Text>
                    </View>

                    <View style={goodStyle.viewMoney}>
                        <Text style={goodStyle.textMoney} >¥{this.props.good.good_price}</Text>
                    </View>

                </View>

                <View style={goodStyle.viewD}>
                    <Text style={goodStyle.textD} >......</Text>
                </View>

                <View style={goodStyle.viewMore} >
                    <Text style={goodStyle.textMore} >共{this.countGood(this.props.goods)}件商品</Text>
                    {
                        this.props.flag == "ready"
                            ?
                            <TouchableOpacity onPress={() => this.store.openModal("goods", "readying", this.props.index)} >
                                <Text style={goodStyle.textButton} >展开全部商品</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => this.store.openModal("goods", "running", this.props.index)} >
                                <Text style={goodStyle.textButton} >展开全部商品</Text>
                            </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }

    /**
     * 计算商品数量
     */
    countGood = (goods) => {
        let count = 0;
        for (let i = 0; i < goods.length; i++) {
            count = count + goods[i].good_amount;
        }
        return count;
    }
}

const goodStyle = StyleSheet.create({
    good: {
        height: unitWidth * 200,
        //marginTop: unitWidth * 20,
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#c7c7c72B"
        //alignItems: "center"
    },
    viewItem: {
        height: unitWidth * 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    viewName: {
        marginLeft: unitWidth * 10,
        width: unitWidth * 380,
    },
    textName: {
        fontSize: fontscale * 12,
        fontWeight: "300",
    },

    viewCount: {
        //justifyContent:"flex-end",
        alignItems: "flex-end",
        width: unitWidth * 90,
    },
    textCount: {
        fontSize: fontscale * 12,
        fontWeight: "300",
    },

    viewMoney: {
        //justifyContent:"flex-end",
        marginRight: unitWidth * 10,
        alignItems: "flex-end",
        width: unitWidth * 140,
    },
    textMoney: {
        fontSize: fontscale * 12,
        fontWeight: "300",
    },

    viewMore: {
        marginTop: unitWidth * 20,
        marginRight: unitWidth * 10,
        height: unitWidth * 40,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    textMore: {
        fontSize: fontscale * 14,
        fontWeight: "300",
        marginRight: 20,
    },
    textButton: {
        color: "#2196f3",
        fontSize: fontscale * 16,
        fontWeight: "500"
    },

    viewD: {
        marginRight: unitWidth * 10,
        alignItems: "flex-end",
    },
    textD: {
        fontSize: fontscale * 16,
        fontWeight: "500"
    }
})


export class ViewPreparingInfo extends Component {
    render() {
        return (
            <View style={infoStyle.info} >
                <View style={infoStyle.view} >
                    <Text style={{ fontSize: fontscale * 12, color: "#c7c7c7" }} >下单时间：{this.props.get_order_time}</Text>
                    <Text style={{ fontSize: fontscale * 12, color: "#c7c7c7" }}>订单编号：{this.props.order_id}</Text>
                </View>
                {
                    this.props.flag == "ready"
                        ?
                        <Text style={{ fontSize: fontscale * 16, color: "#d81e06" }}>备餐中</Text>
                        :
                        <Text style={{ fontSize: fontscale * 16, color: "#d81e06" }}>配送中</Text>
                }
            </View>
        )
    }
}

const infoStyle = StyleSheet.create({
    info: {
        height: unitWidth * 100,
        marginTop: unitWidth * 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    view: {
        height: unitWidth * 80,
        flexDirection: "column",
        justifyContent: "space-around",
    },
    button: {
        width: unitWidth * 250,
        height: unitWidth * 60,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#d81e06",
        borderRadius: 5,
    }
})