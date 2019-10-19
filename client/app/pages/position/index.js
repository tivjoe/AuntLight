import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { sendWs } from '../../public/Websocket';
import Top from './top/top';
import Body from './body/body';
import { inject } from "mobx-react";

/**
 *  选择位置
 */
@inject("positionStore")
export default class Position extends Component {

    componentDidMount() {
        //获取用户地址
        sendWs("get_address");
    }

    componentWillUnmount() {
        //页面卸载时，初始化confimOrderStore
        this.props.positionStore.constructor();
    }

    render() {
        const { navigation } = this.props;
        const location = navigation.getParam('location');
        return (
            <View style={{ flex: 1 }} >
                <SafeAreaView>
                    <ScrollView keyboardShouldPersistTaps="never" alwaysBounceVertical={false}>
                        <Top />
                    </ScrollView>
                </SafeAreaView>
                <Body location={location} />
            </View>
        );
    }
}