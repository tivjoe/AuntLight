import React, { Component } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { inject } from 'mobx-react';
import { Top } from './component/top';
import { AddClassGood } from './component/add';
import { sendWs } from '../../public/Websocket';
import { ViewSectionList } from './component/list';
import { ModalAddClass,ModalChangeClass } from './component/modal';

/**
 * 登陆页面
 * 入口
 */
@inject('goodControlStore')
export default class GoodControl extends Component {

    componentWillMount() {
        const data = { flag: "class" }
        sendWs("get_class_or_goods", data);
    }

    componentWillUnmount() {
        //页面卸载时，初始化confimOrderStore
        this.props.goodControlStore.constructor();
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Top />
                <ScrollView style={{ flex: 1 }} >
                    <AddClassGood />
                    <ViewSectionList />
                </ScrollView>
                <ModalAddClass />
                <ModalChangeClass />
            </SafeAreaView>
        );
    }
}