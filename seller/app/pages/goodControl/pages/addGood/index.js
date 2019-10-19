import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import {Top,Body} from './add';
import {ModalClass} from './modal';
import {inject} from 'mobx-react';

/**
 * 添加商品
 * 入口
 */
@inject("addGoodStore")
export default class AddGood extends Component {

    //获取信息
    componentWillMount() {
        const {navigation} = this.props;
        const classList = navigation.getParam('classList');
        this.props.addGoodStore.initClassList(classList);
    }

    componentWillUnmount() {
        //页面卸载时，初始化confimOrderStore
        this.props.addGoodStore.constructor();
    }

    render() {
        return (
            <SafeAreaView style={{flex:1}}>
                <Top />
                <Body />
                <ModalClass />
            </SafeAreaView>
        );
    }
}