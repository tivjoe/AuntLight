import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { unitWidth, fontscale } from '../../../../public/SreenUil';
import { observer, inject } from 'mobx-react';

/*
 *组件
 *导航栏
 */
@observer
export class Top extends Component {

    render() {
        return (
            <View style={styleTop.view}>
                <Text style={styleTop.title}>购物车</Text>
                <ViewCount />
            </View>
        );
    }
}

/* 样式 */
const styleTop = StyleSheet.create({
    view: {
        height: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    title:{
        marginBottom: 20, 
        marginLeft: 20,
        fontSize: fontscale * 24, 
        fontWeight: "600" 
    },
    count:{
        marginBottom: 20, 
        marginRight:20, 
        color: "#c7c7c7", 
        fontSize: fontscale * 14, 
    }
})
/**
 * 零件
 * 购物车计数
 */
@inject("shopCarStore")
@observer
class ViewCount extends Component {

    //获取store
    store=this.props.shopCarStore

    render(){
        return(
            <Text style={styleTop.count}>共 {this.store.goodsCount} 件</Text>
        )
    }
}