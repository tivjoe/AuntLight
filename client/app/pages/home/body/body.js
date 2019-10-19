import React, { Component } from 'react';
import { View, FlatList, StyleSheet} from 'react-native';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { fontscale } from '../../../public/SreenUil';
import { ViewShopInfo, ViewPower, ViewHeart } from './parts';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';

/**
 * 组件
 * 选择商家
 * 入口
 */
export default class Body extends Component {
    render() {
        return (
            <ScrollableTabView
                renderTabBar={() => <ScrollableTabBar style={{ height: 40, borderWidth: 0 }} />}
                initialPage={0}
                tabBarPosition='top'
                tabBarUnderlineStyle={{ backgroundColor: "#d81e06",height:2 }}
                tabBarActiveTextColor='#d81e06'
                tabBarTextStyle={{ fontSize: fontscale * 14, fontWeight: "500", marginBottom: 15 }}
            >
                <ShopList tabLabel="全部" class="all" />
                <ShopList tabLabel="超市" class={0} />
                <ShopList tabLabel='奶茶饮品' class={1} />
                <ShopList tabLabel="水果蔬菜" class={2} />
                <ShopList tabLabel="零食" class={3} />
                <ShopList tabLabel="美食" class={4} />
            </ScrollableTabView>
        );
    }
}

/**
 * 组件
 * 商家列表
 */
@inject("homeStore")
@observer
class ShopList extends Component {
    //获取store
    store = this.props.homeStore;
    render() {
        //如果商家列表不为空
        if (toJS(this.store.shopList) != null) {
            return (
                <FlatList
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    data={toJS(this.store.shopList)}
                    keyExtractor={item => item.seller_id}
                    extraData={this.state}
                    onScrollBeginDrag={() => this.startScroll()}
                    renderItem={({ item, index }) => this.returnItem(item, index)}
                />

            )
        } else {
            return null;
        }
    }

    /* 根据分类返回相应的商家 */
    returnItem = (item, index) => {
        if (this.props.class == "all") {
            return (
                <View style={styleList.item}>

                    <ViewShopInfo
                        headurl={item.headurl}
                        name={item.seller_name}
                        startMoney={item.start_money}
                        feight={item.feight}
                        seller_id={item.seller_id}
                    />

                    <ViewPower
                        sellerId={item.seller_id}
                        index={index}
                    />

                </View>
            )
        }
        if (item.class == this.props.class) {
            return (
                <View style={styleList.item}>

                    <ViewShopInfo
                        headurl={item.headurl}
                        name={item.seller_name}
                        startMoney={item.start_money}
                        feight={item.feight}
                        seller_id={item.seller_id}
                    />

                    <ViewPower
                        sellerId={item.seller_id}
                        index={index}
                    />

                </View>
            )
        }
    }
    /* 开始滚动 */
    startScroll = () => {
        //如果搜索状态为false
        if (this.store.searchStatus == false) {
            //展示搜索栏
            this.store.changeSearch();
        }
    }
}

/* 样式 */
const styleList = StyleSheet.create({
    item: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20
    }
})