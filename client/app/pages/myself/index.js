import React, { Component } from 'react';
import { SafeAreaView, ScrollView } from "react-native";
import { ViewBack, ViewInfo } from "./compoent/top";
import Body from './compoent/body';
import {ModalName} from './compoent/modal';
import {sendWs} from "../../public/Websocket";
import { inject, observer } from 'mobx-react';

/**
 * 入口
 * 我的页面
 */
@inject("myselfStore")
@observer
export default class Myself extends Component {

    componentDidMount() {
        //获取用户信息
        sendWs("get_user_information");
    }

    componentWillUnmount() {
        //页面卸载时，初始化myselfStore
        this.props.myselfStore.constructor();
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ViewBack />
                <ScrollView style={{ flex: 1 }}>
                    <ViewInfo />
                    <Body />
                </ScrollView>
                <ModalName />
            </SafeAreaView>
        )
    }
}