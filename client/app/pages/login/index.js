import React, { Component } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import Top from './component/top';
import Block from './component/block';
import { sendWs } from '../../public/Websocket';
import { inject } from 'mobx-react';

/**
 * 登陆页面
 * 入口
 */
@inject('loginStore')
export default class Login extends Component {
    //获取store
    store = this.props.loginStore;

    componentWillUnmount() {
        //页面卸载时，初始化confimOrderStore
        this.props.loginStore.constructor();
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="never" alwaysBounceVertical={false}>
                <SafeAreaView>
                    <Top></Top>
                    <Block></Block>
                </SafeAreaView>
            </ScrollView>
        );
    }
}