import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { unitWidth, fontscale } from '../../../../public/SreenUil';
import FastImage from "react-native-fast-image";
import { inject, observer } from "mobx-react";
import * as Animatable from 'react-native-animatable';

/**
 * 零件
 * 商品信息
 */
@inject("goodStore", "shopCarStore")
@observer
export class ViewGoodInfo extends Component {

    /* name = this.props.name; //商品名字
    url = this.props.url; //商品图片url
    price = this.props.price; //商品价格
    index = this.props.index; //数组下标 */

    //获取store
    store = this.props.goodStore;
    shopCarStore = this.props.shopCarStore;

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => this.controlGood(this.props.index)}>
                <View style={styleInfo.info}>
                    <FastImage style={styleInfo.imageGood} source={{ uri: this.props.url }} />
                    <View style={styleInfo.viewInfo}>
                        <Text style={styleInfo.textInfo} numberOfLines={2} >{this.props.name}</Text>
                        <View style={styleInfo.viewPrice}>
                            <Text style={styleInfo.textPrice}>{this.props.price}</Text>
                            <ViewButton index={this.props.index} />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    controlGood = (index) => {
        //data,传输给购物车页面
        const data = {
            name: this.store.goodsList['全部'][index].good_name, //商品名字
            url: this.store.goodsList['全部'][index].good_url, //商品图片
            price: this.store.goodsList['全部'][index].good_price, //商品价格
            goodIndex: index, //基准数组下标
            count: 1, //商品数量
        }
        if (this.store.goodsList["全部"][index].is == true) {
            //购物车页面执行删除操作
            this.shopCarStore.controlShopCarForGood("remove", data);
        } else {
            //购物车页面执行添加操作
            this.shopCarStore.controlShopCarForGood("add", data);
        }
        //修改当前页面的商品状态
        this.store.changeGoodStatus(index);
    }
}

/* 样式 */
const styleInfo = StyleSheet.create({
    //父
    info: {
        marginLeft: unitWidth * 65,
        marginTop: 20,
        width: unitWidth * 280,
        height: unitWidth * 320,
        justifyContent: "center",
        alignItems: "center"
    },
    //商品图片
    imageGood: {
        width: unitWidth * 200,
        height: unitWidth * 200,
    },
    //信息view
    viewInfo: {
        width: unitWidth * 240,
        height: unitWidth * 100,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    //文字信息
    textInfo: {
        marginTop: unitWidth * 10,
        width: unitWidth * 280,
        //height: unitWidth * 50,
        fontSize: fontscale * 12
    },
    //价格view
    viewPrice: {
        width: unitWidth * 280,
        height: unitWidth * 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    //价格text
    textPrice: {
        fontSize: fontscale * 14,
        color: "red"
    }
})

/**
 * 零件
 * 点击状态反馈
 */
@inject("goodStore")
@observer
class ViewButton extends Component {

    //获取store
    store = this.props.goodStore;

    //动画
    handleViewRef = ref => this.view = ref;
    bounce = () => this.view.bounce(800);

    componentWillUpdate() {
        //当为选中状态时，触发动画效果
        if (this.store.goodsList["全部"][this.props.index].is == true) {
            this.bounce();
        }
    }

    render() {
        return (
            <Animatable.View ref={this.handleViewRef} style=
                {
                    this.store.goodsList["全部"][this.props.index].is == false
                        ?
                        styleButton.view
                        :
                        styleButton.on
                }>
            </Animatable.View>
        )
    }
}

/* 样式 */
const styleButton = StyleSheet.create({
    //未点击
    view: {
        width: unitWidth * 30,
        height: unitWidth * 30,
        borderRadius: unitWidth * 30 / 2,
        borderColor: "#c7c7c7",
        borderWidth: 1,
    },
    //点击
    on: {
        width: unitWidth * 30,
        height: unitWidth * 30,
        borderRadius: unitWidth * 30 / 2,
        backgroundColor: "red",
    },
})