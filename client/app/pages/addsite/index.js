import React, { Component } from 'react';
import { SafeAreaView,ScrollView,View } from 'react-native';
import Top from './component/top';
import {ViewInput,ViewPoisList} from './component/body';
import { inject } from "mobx-react";

/**
 * 添加地址
 * 入口
 */
@inject("addSiteStore")
export default class AddSite extends Component {

    componentWillUnmount() {
        //页面卸载时，初始化confimOrderStore
        this.props.addSiteStore.constructor();
    }

    render() {
        const { navigation } = this.props;
        const callBack = navigation.getParam('callBack');
        return (
            <View style={{ flex: 1 }} >
                <SafeAreaView>
                    <ScrollView keyboardShouldPersistTaps="never" alwaysBounceVertical={false}>
                        <Top callBack={callBack} />
                        <ViewInput />
                    </ScrollView>
                </SafeAreaView>
                <ViewPoisList />
            </View>
        );
    }
}