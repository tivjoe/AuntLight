import React, { Component } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { unitWidth, fontscale } from '../../../public/SreenUil';
import { inject, observer } from "mobx-react";
import { toJS } from 'mobx';

/**
 * 组件
 * 商品列表
 */
@inject("previewShopStore")
@observer
export class Body extends Component {

    // 获取store
    store = this.props.previewShopStore;

    render() {
        return (
            <FlatList
                style={{ flex: 1 }}
                numColumns={2}
                showsVerticalScrollIndicator={true}
                data={toJS(this.store.goodsList[this.store.onClassName])}
                //keyExtractor={}
                extraData={this.state}
                renderItem={({ item, index }) =>
                    <ViewGoodInfo
                        name={item.good_name}
                        price={item.good_price}
                        url={item.good_url}
                        index={item.goodIndex}
                    />
                }
                ListEmptyComponent={() =>
                    <View style={{ width: "100%", height: unitWidth * 300, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 16, fontWeight: "500", color: "red" }}>暂时未添加任何商品，赶紧添加营业吧！</Text>
                    </View>
                }
            />
        )
    }
}


/**
 * 零件
 * 商品信息
 */
@inject("previewShopStore")
@observer
class ViewGoodInfo extends Component {

    /* name = this.props.name; //商品名字
    url = this.props.url; //商品图片url
    price = this.props.price; //商品价格
    index = this.props.index; //数组下标 */

    //获取store
    store = this.props.previewShopStore;

    render() {
        return (
            <View style={styleInfo.info}>
                <FastImage style={styleInfo.imageGood} source={{ uri: this.props.url }} />
                <View style={styleInfo.viewInfo}>
                    <Text style={styleInfo.textInfo} numberOfLines={2} >{this.props.name}</Text>
                    <View style={styleInfo.viewPrice}>
                        <Text style={styleInfo.textPrice}>{this.props.price}</Text>
                    </View>
                </View>
            </View>
        )
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