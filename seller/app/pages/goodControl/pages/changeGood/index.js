import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import {inject} from 'mobx-react';
import {Top,Body} from './change';
import {ModalClass} from './modal';

/**
 * 修改商品信息
 */
@inject("changeGoodStore")
export default class ChangeGood extends Component {

    //获取信息
    componentWillMount() {
        const { navigation } = this.props;
        const classList = navigation.getParam('classList');
        const old_class = navigation.getParam('old_class');
        const name = navigation.getParam('name');
        const price = navigation.getParam('price');
        const is_out = navigation.getParam('is_out');
        const url = navigation.getParam('url');
        this.props.changeGoodStore.initInfo(classList,old_class,name,price,is_out,url);
    }

    componentWillUnmount() {
        //页面卸载时，初始化confimOrderStore
        this.props.changeGoodStore.constructor();
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Top />
                <Body />
                <ModalClass />
            </SafeAreaView>
        );
    }
}