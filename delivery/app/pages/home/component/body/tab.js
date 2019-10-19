import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { unitWidth, fontscale } from '../../../../public/SreenUil';
import { observer, inject } from 'mobx-react';
import { ViewMoreInfo, ViewPreparingTop, ViewPreparingInfo } from './parts';
import { toJS } from "mobx"
import { sendWs } from "../../../../public/Websocket";

/**
 * 组件
 * 订单tab
 */
@inject("homeStore")
@observer
export default class Body extends Component {
    //获取store
    store = this.props.homeStore;
    render() {
        return (
            <ScrollableTabView
                renderTabBar={() => <ScrollableTabBar style={{ height: 40, borderWidth: 0 }} />}
                initialPage={0}
                tabBarPosition='top'
                tabBarUnderlineStyle={{ backgroundColor: "#d81e06", height: 2 }}
                tabBarActiveTextColor='#d81e06'
                tabBarTextStyle={{ fontSize: fontscale * 14, fontWeight: "300", marginBottom: 15 }}
            >
                <PreparingList tabLabel={"待取餐 " + "( " + this.store.countReadying + " )"} />
                <RunningList tabLabel={"配送中 " + "( " + this.store.countRunning + " )"} />
            </ScrollableTabView>
        );
    }
}

/**
 * 备餐中
 */
@inject("homeStore")
@observer
class PreparingList extends Component {
    //获取store
    store = this.props.homeStore;
    render() {
        return (
            <FlatList
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                data={toJS(this.store.readyingOrder)}
                keyExtractor={item => item.order_id}
                extraData={this.state}

                onRefresh={() => this._onRefreshing()}
                refreshing={this.store.refreshingReadying}

                renderItem={({ item, index }) =>
                    <View style={{ width: "88%", marginTop: 20, marginLeft: 20 }} >

                        <ViewPreparingTop
                            queue_number={item.queue_number}
                            delivery_profit={item.delivery_profit}
                            time={this.addTime(item.get_order_time, item.preparing_time)}
                            flag="ready"
                        />

                        <ViewMoreInfo
                            seller_name={item.seller_name}
                            seller_address={item.seller_address}
                            contact_name={item.contact_name}
                            contact_street={item.contact_street}
                        />

                        <ViewPreparingInfo
                            get_order_time={item.get_order_time}
                            order_id={item.order_id}
                            flag="ready"
                        />

                    </View>
                }

                ListEmptyComponent={() =>
                    <View style={{ width: "100%", height: unitWidth * 800, justifyContent: "center", alignItems: "center" }} >
                        <Text style={{ fontSize: 16, fontWeight: "500", color: "#c7c7c7" }} >暂无订单</Text>
                    </View>
                }
            />
        )
    }

    /**
     * 计算多久多久备好餐
     */
    addTime = (get_time, add_min) => {
        let getTime = new Date(get_time);
        let time = getTime.setMinutes(getTime.getMinutes() + add_min);
        let sendTime = new Date(time);
        const hou = sendTime.getHours();
        const min = sendTime.getSeconds();
        return hou + ":" + min;
    }

    /**
     * 刷新列表
     */
    _onRefreshing = () => {
        this.store.changeRefreshingReading("start");
        sendWs("get_all_readying_order");
    }
}

@inject("homeStore")
@observer
class RunningList extends Component {
    //获取store
    store = this.props.homeStore;
    render() {
        return (
            <FlatList
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                data={toJS(this.store.runningOrderl)}
                keyExtractor={item => item.order_id}
                extraData={this.state}

                onRefresh={() => this._onRefreshing()}
                refreshing={this.store.refreshingReadying}

                renderItem={({ item, index }) =>
                    <View style={{ width: "88%", marginTop: 20, marginLeft: 20 }} >

                        <ViewPreparingTop
                            queue_number={item.queue_number}
                            delivery_profit={item.delivery_profit}
                            time={this.addTime(item.get_order_time, item.preparing_time)}
                            flag="run"
                        />

                        <ViewMoreInfo
                            seller_name={item.seller_name}
                            seller_address={item.seller_address}
                            contact_name={item.contact_name}
                            contact_street={item.contact_street}
                        />

                        <ViewPreparingInfo
                            get_order_time={item.get_order_time}
                            order_id={item.order_id}
                            flag="run"
                        />

                    </View>
                }

                ListEmptyComponent={() =>
                    <View style={{ width: "100%", height: unitWidth * 800, justifyContent: "center", alignItems: "center" }} >
                        <Text style={{ fontSize: 16, fontWeight: "500", color: "#c7c7c7" }} >暂无订单</Text>
                    </View>
                }
            />
        )
    }

    /**
     * 计算多久多久备好餐
     */
    addTime = (get_time) => {
        let getTime = new Date(get_time);
        let time = getTime.setMinutes(getTime.getMinutes() + 8);
        let sendTime = new Date(time);
        const hou = sendTime.getHours();
        const min = sendTime.getSeconds();
        return hou + ":" + min;
    }

    /**
     * 刷新列表
     */
    _onRefreshing = () => {
        this.store.changeRefreshingRunning("start");
        sendWs("get_all_running_order");
    }
}