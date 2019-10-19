import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ViewGoodInfo } from "./parts";
import { inject, observer } from "mobx-react";
import { toJS } from 'mobx';

/**
 * 组件
 * 商品列表
 */
@inject("goodStore")
@observer
export default class Body extends Component {

    // 获取store
    store = this.props.goodStore;

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
            />
        )
    }
}