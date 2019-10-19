import React, { Component } from 'react';
import { View } from 'react-native';
import { ViewSelectInput, ViewAddressList,ViewPoisList } from './parts'

/**
 * 组件
 * 查询位置
 * 展示我的地址
 * 展示查询列表
 */
export default class Body extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                <ViewSelectInput location={this.props.location} />
                <ViewAddressList />
                <ViewPoisList />
            </View>
        );
    }
}