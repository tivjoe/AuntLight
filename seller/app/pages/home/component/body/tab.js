import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { fontscale, unitWidth } from '../../../../public/SreenUil';
import { observer, inject } from 'mobx-react';
import { ViewPreparingTop, ViewMoreInfo, ViewGood, ViewPreparingInfo } from './parts';
import { sendWs } from '../../../../public/Websocket';

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
                <PreparingList tabLabel={"待备餐 " + "( " + this.store.countReadying + " )"} />
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
                data={this.store.readyingOrder}
                keyExtractor={item => item.order_id}
                extraData={this.state}

                onRefresh={() => this._onRefreshing()}
                refreshing={this.store.refreshingReadying}

                renderItem={({ item, index }) =>
                    <View style={{ width: "88%", marginTop: 20, marginLeft: 20 }} >

                        <ViewPreparingTop
                            queue_number={item.queue_number}
                            order_money={item.order_money}
                            time={this.addTime(item.get_order_time, item.preparing_time)}
                            flag="ready"
                        />

                        <ViewMoreInfo 
                            order_state={item.order_state}
                        />

                        <ViewGood
                            good={item.good_list[0]}
                            goods={item.good_list}
                            flag="ready"
                            index={index}
                        />

                        <ViewPreparingInfo
                            get_order_time={item.get_order_time}
                            order_id={item.order_id}
                            flag="ready"
                        />

                    </View>
                }

                ListEmptyComponent={() =>
                    <View style={{ width: "100%", height: unitWidth * 800, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 16, fontWeight: "500", color: "#c7c7c7" }} >暂无订单</Text>
                    </View>
                }
            />
        )
    }

    /**
     * 计算多久之前备好餐
     */
    addTime = (get_time, add_min) => {
        let getTime = new Date(get_time);
        let time = getTime.setMinutes(getTime.getMinutes() + add_min);
        let sendTime = new Date(time);
        const hou = sendTime.getHours();
        const min = sendTime.getMinutes();
        return hou + ":" + min;
    }

    //刷新等待备餐列表
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
                data={this.store.runningOrder}
                keyExtractor={item => item.order_id}
                extraData={this.state}

                onRefresh={() => this._onRefreshing()}
                refreshing={this.store.refreshingRunning}

                renderItem={({ item, index }) =>
                    <View style={{ width: "88%", marginTop: 20, marginLeft: 20 }} >

                        <ViewPreparingTop
                            queue_number={item.queue_number}
                            order_money={item.order_money}
                            flag="run"
                        />

                        <ViewMoreInfo 
                            order_state={item.order_state}
                        />

                        <ViewGood
                            good={item.good_list[0]}
                            goods={item.good_list}
                            flag="ready"
                            index={index}
                        />

                        <ViewPreparingInfo
                            get_order_time={item.get_order_time}
                            order_id={item.order_id}
                            flag="run"
                        />

                    </View>
                }

                ListEmptyComponent={() =>
                    <View style={{ width: "100%", height: unitWidth * 800, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 16, fontWeight: "500", color: "#c7c7c7" }} >暂无订单</Text>
                    </View>
                }
            />
        )
    }

    //刷新等待备餐列表
    _onRefreshing = () => {
        this.store.changeRefreshingRunning("start");
        sendWs("get_all_running_order");
    }
}