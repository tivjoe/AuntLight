import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image'
import { fontscale, unitWidth } from '../../../public/SreenUil';
import { inject, observer } from 'mobx-react';
import { sendWs } from '../../../public/Websocket';
import NavigationService from "../../../public/NavigationService";

/**
 * 零件
 * 商家信息
 */
@observer
export class ViewShopInfo extends Component {

    //获取父组件传来的值
    headurl = this.props.headurl;//头像
    name = this.props.name; //商家名字
    startMoney = this.props.startMoney; //起送费
    feight = this.props.feight; //配送费
    seller_id = this.props.seller_id; //商家id

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => NavigationService.navigate("goodsPage", {
                seller_id: this.seller_id,
                startMoney: this.startMoney,
                feight: this.feight
            })}>
                <View style={styleInfo.info}>
                    <FastImage source={{ uri: this.headurl }} style={styleInfo.image} />
                    <View style={styleInfo.viewInfo}>
                        <View style={styleInfo.viewName}>
                            <Text style={styleInfo.textName}>{this.name}</Text>
                            <Text style={styleInfo.textRange}>   | 200m</Text>
                        </View>
                        <Text style={styleInfo.textTip}>起送:¥{this.startMoney}  |  备餐:2min  |   配送:¥{this.feight}</Text>
                        <Text style={styleInfo.textTip}>预计送达:10min</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

/* 商家信息样式 */
const styleInfo = StyleSheet.create({
    info: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        marginLeft: 20,
        width: unitWidth * 120,
        height: unitWidth * 120,
        borderRadius: 5,
    },
    viewInfo: {
        marginLeft: 20,
        width: unitWidth * 430
    },
    viewName: {
        flexDirection: 'row'
    },
    textName: {
        fontSize: fontscale * 18,
        fontWeight: '500',
    },
    textRange: {
        fontSize: fontscale * 10,
        fontWeight: '500',
        color: '#c7c7c7'
    },
    textTip: {
        fontSize: fontscale * 11,
        fontWeight: '400',
        color: '#524d4d',
        marginTop: unitWidth * 20
    }
});

/**
 * 零件
 * 评论和收藏
 */
@inject("homeStore")
@observer
export class ViewPower extends Component {

    //获取store
    store = this.props.homeStore;

    //接收父组件传值
    sellerId = this.props.sellerId //数组下标

    render() {
        return (
            <View style={stylePower.power}>
                <ViewHeart
                    index={this.props.index}
                />

                <TouchableOpacity onPress={() => this.getDiscuss()}>
                    <FastImage
                        style={stylePower.imageP}
                        source={require("../../../res/pinglun.png")}
                    />
                </TouchableOpacity>

            </View>
        )
    }

    //获取商家评论
    getDiscuss = () => {
        const data = { seller_id: this.sellerId };
        sendWs("get_seller_discuss", data);
        this.store.openModal("discuss")
    }
}

/* 样式 */
const stylePower = StyleSheet.create({
    power: {
        flexDirection: "column",
        marginLeft: unitWidth * 40,
        justifyContent: "space-between",
        height: unitWidth * 140
    },
    imageP: {
        //marginLeft:20,
        width: unitWidth * 35,
        height: unitWidth * 35
    }
})

/**
 * 零件
 * 收藏
 */
@inject("homeStore")
@observer
export class ViewHeart extends Component {
    //获取store
    store = this.props.homeStore

    //接收父组件传值
    index = this.props.index //数组下标

    render() {
        return (
            <TouchableOpacity onPress={() => this.likeShop()}>

                <FastImage
                    style={styleHeart.image}
                    source={
                        this.store.shopList[this.index].isHeart == false
                            ?
                            require('../../../res/aixin1.png')
                            :
                            require('../../../res/collect2-3.png')
                    }
                />

            </TouchableOpacity>
        );
    }

    //收藏/取消商家
    likeShop = () => {
        if (this.store.shopList[this.index].isHeart == false) {
            const message = {
                seller_id: this.store.shopList[this.index].seller_id,
                seller_name: this.store.shopList[this.index].seller_name,
                seller_headurl: this.store.shopList[this.index].headurl,
            }
            //发送请求
            sendWs("add_like_seller", message)
        } else {
            const message = {
                seller_id: this.store.shopList[this.index].seller_id,
            }
            //发送请求
            sendWs("remove_like_seller", message)
        }
        this.store.likeShop(this.index);
    }
}

/* 样式 */
const styleHeart = StyleSheet.create({
    image: {
        //marginBottom: 30,
        width: unitWidth * 30,
        height: unitWidth * 30
    },
})