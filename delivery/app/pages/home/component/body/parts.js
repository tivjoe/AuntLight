import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import { unitWidth, fontscale } from '../../../../public/SreenUil';
import { observer, inject } from 'mobx-react';
import { sendWs } from '../../../../public/Websocket';



/**
 * 头部
 */
export class ViewPreparingTop extends Component {
    render() {
        return (
            <View style={preparingTopStyle.top} >
                <View style={preparingTopStyle.View} >
                    <Text style={preparingTopStyle.textGet} ># {this.props.queue_number}</Text>
                    {
                        this.props.flag == "ready"
                            ?
                            <Text style={preparingTopStyle.textTime}>({this.props.time}前完成取餐)</Text>
                            :
                            <Text style={preparingTopStyle.textTime}>({this.props.time}前送达)</Text>
                    }
                </View>
                <Text style={preparingTopStyle.textMoney}>预计收入:¥{this.props.delivery_profit}</Text>
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

export class ViewMoreInfo extends Component {
    render() {
        return (
            <View style={{ backgroundColor: "#c7c7c72B" }} >
                <View style={{ marginTop: 20, marginLeft: 5 }} >
                    <View style={moreInfoStyle.viewItem} >
                        <View style={moreInfoStyle.viewFlagQ} >
                            <Text style={moreInfoStyle.textFlag} >取</Text>
                        </View>
                        <View style={{ marginLeft: 10 }} >
                            <Text style={{ fontSize: fontscale * 14, fontWeight: "300" }}>{this.props.seller_name}</Text>
                        </View>
                        <FastImage style={moreInfoStyle.imagePhone} source={require("../../../../res/09.png")} />
                        <FastImage style={moreInfoStyle.imageAddress} source={require("../../../../res/dizhi.png")} />
                    </View>
                    <View style={{ marginTop: 10 }} >
                        <Text style={{ fontSize: fontscale * 16, fontWeight: "500" }} >{this.props.seller_address}</Text>
                    </View>
                </View>

                <View style={{ marginTop: 20, marginBottom: 20, marginLeft: 5 }} >
                    <View style={moreInfoStyle.viewItem} >
                        <View style={moreInfoStyle.viewFlagS} >
                            <Text style={moreInfoStyle.textFlag} >取</Text>
                        </View>
                        <View style={{ marginLeft: 10 }} >
                            <Text style={{ fontSize: fontscale * 14, fontWeight: "300" }}>{this.props.contact_name}</Text>
                        </View>
                        <FastImage style={moreInfoStyle.imagePhone} source={require("../../../../res/09.png")} />
                        <FastImage style={moreInfoStyle.imageAddress} source={require("../../../../res/dizhi.png")} />
                    </View>
                    <View style={{ marginTop: 10 }} >
                        <Text style={{ fontSize: fontscale * 16, fontWeight: "500" }} >{this.props.contact_street}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const moreInfoStyle = StyleSheet.create({
    viewItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    viewFlagQ: {
        justifyContent: "center",
        alignItems: "center",
        width: unitWidth * 50,
        height: unitWidth * 50,
        backgroundColor: "green",
        borderRadius: unitWidth * 50 / 2
    },
    viewFlagS: {
        justifyContent: "center",
        alignItems: "center",
        width: unitWidth * 50,
        height: unitWidth * 50,
        backgroundColor: "red",
        borderRadius: unitWidth * 50 / 2
    },
    textFlag: {
        fontSize: fontscale * 16,
        color: "white"
    },

    imagePhone: {
        marginLeft: 10,
        width: unitWidth * 40,
        height: unitWidth * 40
    },
    imageAddress: {
        marginLeft: 10,
        width: unitWidth * 35,
        height: unitWidth * 35
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
                <View style={infoStyle.button}>
                    {
                        this.props.flag == "ready"
                            ?
                            <TouchableOpacity onPress={()=>this.getGood(this.props.order_id)} >
                                <Text style={{ fontSize: fontscale * 16, color: "white" }}>已取餐</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={()=>this.orderDone(this.props.order_id)} >
                                <Text style={{ fontSize: fontscale * 16, color: "white" }}>已送达</Text>
                            </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }

    getGood=(order_id)=>{
        const data={order_id:order_id};
        sendWs("delivery_get_goods",data);
    }

    orderDone=(order_id)=>{
        const data={order_id:order_id};
        sendWs("delivery_order_done",data);
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