import React, { Component } from 'react';
import { FlatList, View, StyleSheet, TouchableWithoutFeedback, Text } from "react-native";
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { ViewGoodInfo, ViewTotalPrice } from './parts';
import { unitWidth } from '../../../../public/SreenUil';
import * as Animatable from 'react-native-animatable';


/**
 * 组件
 * 购物车列表
 */
@inject("shopCarStore")
@observer
export class ShopCarList extends Component {

    //获取store
    store = this.props.shopCarStore;

    render() {
        return (
            <FlatList
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={true}
                data={toJS(this.store.shopCar)}
                //keyExtractor={item => item.seller_id}
                extraData={this.state}
                renderItem={({ item, index }) =>
                    <ViewGoodInfo
                        goodIndex={item.goodIndex}
                        name={item.name}
                        price={item.price}
                        count={item.count}
                        url={item.url}
                        index={index}
                    />
                }

                ListEmptyComponent={() =>
                    <View style={{ width: "100%", height: unitWidth * 800, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 16, fontWeight: "500",color:"#d81e06" }}>购物车空空入也～</Text>
                    </View>
                }
            />
        )
    }
}

/**
 * 确认支付按钮
 */
@inject("shopCarStore")
@observer
export class Confim extends Component {

    //获取store
    store = this.props.shopCarStore;
    //动画
    handleViewRef = ref => this.view = ref;
    bounceIn = () => this.view.bounceIn(800);

    render() {
        return (
            <View style={styleConfim.confim} >

                <TouchableWithoutFeedback
                    onPress={() => this.confim()}
                    disabled={this.store.GoodTotalPrice >= this.store.StartMoney ? false : true}
                >

                    <Animatable.View ref={this.handleViewRef}
                        style={this.store.GoodTotalPrice >= this.store.StartMoney
                            ?
                            styleConfim.yes
                            :
                            styleConfim.no
                        }
                    >
                        <ViewTotalPrice />

                    </Animatable.View>

                </TouchableWithoutFeedback>

            </View>
        )
    }

    confim = () => {
        this.bounceIn();
        //跳转到确认订单页面
        this.store.goConfimOrderPage();
    }
}

/* 样式 */
const styleConfim = StyleSheet.create({
    confim: {
        height: unitWidth * 80,
        alignItems: 'center',
        marginBottom: 20,
    },
    no: {
        width: "90%",
        height: unitWidth * 80,
        backgroundColor: "#c7c7c7",
        justifyContent: 'center',
        alignItems: 'center',
    },
    yes: {
        width: "90%",
        height: unitWidth * 80,
        backgroundColor: "#d81e06",
        justifyContent: 'center',
        alignItems: 'center',
    }
})