import React, { Component } from 'react';
import { SafeAreaView} from "react-native";
import {sendWs} from "../../public/Websocket";
import { inject, observer } from 'mobx-react';
import Top from './component/top';
import LikeList from './component/body';

/**
 * 入口
 * 用户喜爱商家列表
 */
@inject("myLikeStore")
@observer
export default class MyLike extends Component {

    componentDidMount() {
        //获取用户喜爱商家列表
        sendWs("get_like_seller_list");
    }

    componentWillUnmount() {
        //页面卸载时，初始化shopCarStore
        this.props.myLikeStore.constructor();
    }
    
    render() {
        return (
            <SafeAreaView style={{ flex: 1,}}>
                <Top />
                <LikeList />
            </SafeAreaView>
        )
    }
}