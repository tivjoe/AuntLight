import React, { Component } from 'react';
import { SafeAreaView} from "react-native";
import { inject, observer } from 'mobx-react';
import {sendWs} from '../../public/Websocket';
import {Top} from './component/top';
import {Body} from './component/body';
import {ModalClass} from './component/modal';

/**
 * 入口
 * 我的页面
 */
@inject("previewShopStore")
@observer
export default class PreviewShop extends Component {

    componentDidMount() {
        sendWs("get_all_goods_class")
    }

    componentWillUnmount() {
        //页面卸载时，初始化previewShopStore
        this.props.previewShopStore.constructor();
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Top />
                <Body />
                <ModalClass />
            </SafeAreaView>
        )
    }
}