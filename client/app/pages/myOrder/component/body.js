import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import { unitWidth, fontscale } from '../../../public/SreenUil';
import FastImage from 'react-native-fast-image';
import NavigationService from '../../../public/NavigationService';
import { inject, observer } from 'mobx-react';
import {sendWs} from '../../../public/Websocket';

/**
 * 组件
 * 订单列表
 */
@inject("myOrderStore")
@observer
export default class OrderList extends Component {

    //获取store
    store = this.props.myOrderStore;

    render() {
        return (
            <FlatList
                style={{ flex:1 }}
                showsVerticalScrollIndicator={false}
                data={this.store.order}
                keyExtractor={item => item.order_id}
                extraData={this.state}

                onEndReachedThreshold={0.3}
                onEndReached={()=>this._onEndReached()}
                onRefresh={()=>this._onRefresh()}
                refreshing={this.store.isRefreshing}

                renderItem={({ item, index }) =>

                    <TouchableWithoutFeedback onPress={() => NavigationService.navigate("orderDetailPage", { index:index })} >
                        <View style={styleList.item}>

                            <ViewOrderInfo
                                seller_id={item.seller_id}
                                name={item.seller_name}
                                url={item.seller_url}
                                time={item.get_order_time}
                            />

                            <ViewOrderStatus
                                money={item.order_money}
                                status={item.order_state}
                                appraise={item.appraise_state}
                                level={item.level}
                            />

                        </View>
                    </TouchableWithoutFeedback>

                }

                ListEmptyComponent={() =>
                    <View style={{ width: "100%", height: unitWidth * 800, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 16, fontWeight: "500", color: "#d81e06" }}>暂无订单，赶紧下单吧～</Text>
                    </View>
                }
            />
        )
    }

    //上拉加载
    _onEndReached(){
        if(this.store.order.length<this.store.toalCount&&this.store.isLoadMore==false){
            this.store.changeLoadMore("start");
            let data = { flag: "page",pageNo:this.store.pageNo+1 };
            sendWs("get_history_order", data);
        }
    }

    //下拉刷新
    _onRefresh(){
        this.store.changeRefreshing("start");
        let data = { flag: "refresh" };
        sendWs("get_history_order", data);
    }
}

/* 样式 */
const styleList = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        height: unitWidth * 80,
        marginTop: 20,
        marginBottom: 20,
    }
});


/**
 * 零件
 * 订单信息
 */
@observer
class ViewOrderInfo extends Component {
    render() {
        return (
            <View style={styleInfo.info} >
                <FastImage style={styleInfo.imageSeller} source={{ uri: this.props.url }} />
                <View style={styleInfo.viewInfo} >
                    <View style={styleInfo.viewName} >
                        <TouchableOpacity onPress={() => NavigationService.navigate("goodsPage", { seller_id: this.props.seller_id })}>
                            <Text style={styleInfo.textName} >{this.props.name}</Text>
                        </TouchableOpacity>
                        <FastImage style={styleInfo.imageGo} source={require("../../../res/jiantouyou.png")} />
                    </View>
                    <Text style={styleInfo.textTime} >{this.props.time}</Text>
                </View>
            </View>
        )
    }
}

/* 样式 */
const styleInfo = StyleSheet.create({
    info: {
        flexDirection: 'row',
        width: unitWidth * 500,
        height: unitWidth * 80,
    },
    imageSeller: {
        borderRadius: 5,
        marginLeft: 20,
        width: unitWidth * 80,
        height: unitWidth * 80
    },
    viewInfo: {
        flexDirection: 'column',
        marginLeft: 20,
        justifyContent: "space-between"
    },
    viewName: {
        width: unitWidth * 300,
        alignItems: 'center',
        flexDirection: 'row',
    },
    textName: {
        fontSize: fontscale * 14,
    },
    imageGo: {
        //marginLeft: 10,
        width: unitWidth * 20,
        height: unitWidth * 20,
    },
    textTime: {
        fontSize: fontscale * 12,
        color: "#c7c7c7"
    }
});


/**
 * 零件
 * 订单状态
 */
@observer
class ViewOrderStatus extends Component {
    render() {
        switch (this.props.status) {
            case 3:
                if (this.props.appraise != 0) {
                    return (
                        <View style={styleStatus.view1} >
                            <FastImage style={styleStatus.imagaLevel} source={require("../../../res/pingjiaxingxing.png")} />
                            <Text style={styleStatus.textLevel} > {this.props.level}</Text>
                            <Text style={styleStatus.textMoney1} >    ¥ {this.props.money}</Text>
                        </View>
                    )
                } else {
                    return (
                        <View style={styleStatus.view23} >
                            <TouchableOpacity>
                                <Text style={styleStatus.textDisscuss} >评价</Text>
                            </TouchableOpacity>
                            <Text style={styleStatus.textMoney} >¥ {this.props.money}</Text>
                        </View>
                    )
                }
            case 1:
                return (
                    <View style={styleStatus.view23} >
                        <Text style={styleStatus.text23} >备餐中</Text>
                        <Text style={styleStatus.textMoney} >¥ {this.props.money}</Text>
                    </View>
                )
            case 2:
                return (
                    <View style={styleStatus.view23} >
                        <Text style={styleStatus.text23} >配送中</Text>
                        <Text style={styleStatus.textMoney} >¥ {this.props.money}</Text>
                    </View>
                )
        }
    }
}

/* 样式 */
const styleStatus = StyleSheet.create({
    view23: {
        height: unitWidth * 80,
        flexDirection: 'column',
        marginRight: 20,
        justifyContent: "space-between",
        alignItems: 'flex-end',
    },
    text23: {
        fontSize: fontscale * 14,
        color: "#ff9800"
    },
    textMoney: {
        fontSize: fontscale * 12,
    },
    textDisscuss: {
        fontSize: fontscale * 16,
        color: "#2196f3"
    },
    view1: {
        marginRight: 20,
        height: unitWidth * 80,
        flexDirection: "row",
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    textLevel: {
        fontSize: fontscale * 14,
        color: "#d81e06"
    },
    textMoeny1: {
        fontSize: fontscale * 14,
    },
    imagaLevel: {
        width: unitWidth * 30,
        height: unitWidth * 30
    },
});