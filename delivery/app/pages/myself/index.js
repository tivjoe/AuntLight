import React, { Component } from 'react';
import { SafeAreaView, ScrollView } from "react-native";
import { inject, observer } from 'mobx-react';
import {sendWs} from '../../public/Websocket';
import {ViewBack,ViewInfo} from './component/top';
import Body from './component/body';

/**
 * 入口
 * 我的页面
 */
@inject("myselfStore")
@observer
export default class Myself extends Component {

    componentDidMount() {
        sendWs("get_information")
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
            </SafeAreaView>
        )
    }
}