import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { unitWidth, fontscale } from "../../../../public/SreenUil";
import { inject, observer } from 'mobx-react';

/**
 * 零件
 * 列表item
 */
@inject("shopCarStore", "goodStore")
@observer
export class ViewGoodInfo extends Component {

    //获取store
    store = this.props.shopCarStore;
    goodStore = this.props.goodStore

    render() {
        return (
            <View style={styleInfo.Info}>

                <TouchableOpacity onPress={() => this.removeGood(this.props.goodIndex, this.props.index)} >
                    <FastImage style={styleInfo.imageRemove} source={require('../../../../res/guanbi.png')} />
                </TouchableOpacity>

                <FastImage style={styleInfo.imageGood} source={{ uri: this.props.url }} />

                <View style={styleInfo.viewText}>
                    <Text style={styleInfo.textName} numberOfLines={2} >{this.props.name}</Text>
                    <Text style={styleInfo.textPrice} >¥ {this.props.price}</Text>
                </View>

                <TouchableOpacity onPress={() => this.store.controlGod("less", this.props.index)} >
                    <FastImage style={styleInfo.imageJj} source={require('../../../../res/jian.png')} />
                </TouchableOpacity>

                <View style={styleInfo.viewCount}>
                    <ViewGoodCount count={this.props.count} />
                </View>

                <TouchableOpacity onPress={() => this.store.controlGod("add", this.props.index)} >
                    <FastImage style={styleInfo.imageJj} source={require('../../../../res/jia.png')} />
                </TouchableOpacity>

            </View>
        )
    }

    removeGood = (goodIndex, index) => {
        this.store.controlGod("remove", index);
        this.goodStore.changeGosForShopcar(goodIndex);
    }
}

/* 样式 */
const styleInfo = StyleSheet.create({
    //父样式
    Info: {
        height: unitWidth * 100,
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    //删除图片
    imageRemove: {
        width: unitWidth * 30,
        height: unitWidth * 30,
        marginLeft: 20,
    },
    //商品图片
    imageGood: {
        marginLeft: 10,
        width: unitWidth * 100,
        height: unitWidth * 100,
        backgroundColor: "black"
    },
    //view文字
    viewText: {
        marginLeft: 10,
        width: unitWidth * 350,
        height: unitWidth * 100,
        justifyContent: "space-around",
    },
    //名字
    textName: {
        fontSize: fontscale * 12,
        width: unitWidth * 300,
    },
    //价格
    textPrice: {
        fontSize: fontscale * 12,
        color: "#c7c7c7"
    },
    //图片加减
    imageJj: {
        width: unitWidth * 35,
        height: unitWidth * 35,
    },
    //数量
    viewCount: {
        width: unitWidth * 80,
        alignItems: 'center',
    }
})

/**
 * 零件
 * 单个商品的计数
 */
@inject("shopCarStore")
@observer
class ViewGoodCount extends Component {

    //获取store
    store = this.props.shopCarStore;

    render() {
        return (
            <Text style={{ fontSize: fontscale * 14 }} >{this.props.count}</Text>
        )
    }
}

/**
 * 零件
 * 总价text
 */
@inject("shopCarStore")
@observer
export class ViewTotalPrice extends Component {
    //获取store
    store = this.props.shopCarStore;

    render() {
        return (
            <Text style={this.store.GoodTotalPrice >= this.store.StartMoney
                ?
                stylePrice.yes
                :
                stylePrice.no
            }
            >
                {
                    this.store.GoodTotalPrice >= this.store.StartMoney
                        ?
                        "确认  ¥"
                        :
                        "还差  ¥"
                }
                {
                    this.store.GoodTotalPrice >= this.store.StartMoney
                        ?
                        this.store.GoodTotalPrice
                        :
                        parseFloat((this.store.StartMoney - this.store.GoodTotalPrice).toFixed(2))//保留两位小数
                }
            </Text>
        )
    }
}

/* 样式 */
const stylePrice = StyleSheet.create({
    no: {
        fontSize: fontscale * 16,
        color: "white"
    },
    yes: {
        fontSize: fontscale * 16,
        color: "white"
    }
})