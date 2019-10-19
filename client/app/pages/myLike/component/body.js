import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { unitWidth, fontscale } from '../../../public/SreenUil';
import FastImage from 'react-native-fast-image';
import NavigationService from '../../../public/NavigationService';
import { inject, observer } from 'mobx-react';
import Swipeout from 'react-native-swipeout';
import { sendWs } from '../../../public/Websocket';

/**
 * 组件
 * 收藏列表
 */
@inject("myLikeStore")
@observer
export default class LikeList extends Component {

    //获取store
    store = this.props.myLikeStore;

    render() {
        return (
            <FlatList
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                data={this.store.like}
                keyExtractor={item => item.seller_id}
                extraData={this.state}
                renderItem={({ item, index }) => this.returnItem(item.seller_id, item.seller_name, item.seller_headurl, index)}
                ListEmptyComponent={() =>
                    <View style={{ width: "100%", height: unitWidth * 800, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 16, fontWeight: "500", color: "#d81e06" }}>暂无收藏的商家～</Text>
                    </View>
                }
            />
        );
    }
    returnItem = (seller_id, name, headurl, index) => {
        var swipeoutBtns = [
            {
                text: '删除',
                type: 'delete',
                onPress: () => {
                    const data = { seller_id: seller_id };
                    sendWs("remove_like_seller", data);
                    this.store.deleteSeller(index);
                }
            }
        ]
        return (
            <Swipeout autoClose={true} right={swipeoutBtns} close={true} style={{ backgroundColor: "white" }} >
                    <View style={styleLike.view}>
                        <FastImage source={{ uri: headurl }} style={styleLike.image} />
                        <Text style={styleLike.text}>{name}</Text>
                    </View>
            </Swipeout>
        );
    }
}

/* 样式 */
const styleLike = StyleSheet.create({
    view: {
        marginTop: 20,
        marginBottom: 20,
        height: unitWidth * 80,
        flexDirection: "row",
        alignItems: "center"
    },
    image: {
        marginLeft: 20,
        height: unitWidth * 80,
        width: unitWidth * 80,
        borderRadius: 5
    },
    text: {
        marginLeft: 20,
        fontSize: fontscale * 16
    }
});