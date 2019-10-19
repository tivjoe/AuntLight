import React, { Component } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { unitWidth, fontscale } from '../../../public/SreenUil';
import NavigationService from '../../../public/NavigationService';
import { inject, observer } from "mobx-react";
import { sendWs } from "../../../public/Websocket";

/**
 * 订单列表
 */
@inject("myOrderStore")
@observer
export default class Body extends Component {

    store = this.props.myOrderStore

    render() {
        return (
            <FlatList
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                data={this.store.order}
                keyExtractor={item => item.order_id}
                extraData={this.state}

                onEndReachedThreshold={0.3}
                onEndReached={() => this._onEndReached()}
                onRefresh={() => this._onRefresh()}
                refreshing={this.store.isRefreshing}

                renderItem={({ item, index }) =>
                    <TouchableWithoutFeedback onPress={() => NavigationService.navigate("orderDetailPage",{order_id:item.order_id})} >
                        <View style={styleBody.body} >
                            <View style={styleBody.info} >
                                <Text style={{ fontSize: fontscale * 14, fontWeight: "300" }} >#{item.queue_number} {item.order_id}</Text>
                                <Text style={{ fontSize: fontscale * 14, fontWeight: "300", color: "#c7c7c7" }} >{item.get_order_time}</Text>
                            </View>
                            <Text style={{ marginRight: 20, fontSize: fontscale * 16, fontWeight: "300", color:"#d81e06" }} >收入: ¥{item.seller_profit}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                }
                ListEmptyComponent={() =>
                    <View style={{ width: "100%", height: unitWidth * 800, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 16, fontWeight: "500", color: "#c7c7c7" }}>暂无订单～</Text>
                    </View>
                }
            />
        )
    }

    //上拉加载
    _onEndReached() {
        if (this.store.order.length < this.store.toalCount && this.store.isLoadMore == false) {
            this.store.changeLoadMore("start");
            let data = { flag: "page", pageNo: this.store.pageNo + 1 };
            sendWs("get_history_order", data);
        }
    }

    //下拉刷新
    _onRefresh() {
        this.store.changeRefreshing("start");
        let data = { flag: "refresh" };
        sendWs("get_history_order", data);
    }
}

const styleBody = StyleSheet.create({
    body: {
        marginBottom: 20,
        height: unitWidth * 80,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    info: {
        marginLeft: 20,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: 'center'
    }
})