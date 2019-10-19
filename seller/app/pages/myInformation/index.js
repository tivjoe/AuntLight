import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { inject } from 'mobx-react';
import { ViewBack } from './component/top';
import ViewBody from './component/body';


/**
 * 登陆页面
 * 入口
 */
@inject('myInformationStore')
export default class MyInformation extends Component {

    //获取信息
    componentWillMount() {
        //请求数据
        const {navigation} = this.props;
        const information = navigation.getParam('information');
        this.props.myInformationStore.constructorInformation(information);
    }

    componentWillUnmount() {
        //页面卸载时，初始化confimOrderStore
        this.props.myInformationStore.constructor();
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#c7c7c72B" }}>
                <ViewBack />
                <ViewBody />
            </SafeAreaView>
        );
    }
}