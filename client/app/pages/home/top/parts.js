import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import FastImage from 'react-native-fast-image';
import { unitWidth, fontscale } from '../../../public/SreenUil';
import { observer, inject } from 'mobx-react';
import NavigationService from '../../../public/NavigationService';

/**
 * 零件
 * 获取当前位置
 */
@inject('homeStore')
@observer
export class ViewPosition extends Component {
    //获取store
    store = this.props.homeStore;
    render() {
        return (
            <View style={stylePosition.position}>
                <FastImage style={stylePosition.image} source={require('../../../res/position.png')} />
                <TouchableOpacity onPress={() => this.navigtionPosition()}>

                    <Text
                        numberOfLines={1}
                        style=
                        {
                            this.store.searchStatus == true
                                ?
                                stylePosition.text
                                :
                                stylePosition.noText
                        }
                    >
                        {this.store.poiName}
                    </Text>
                </TouchableOpacity>

                <ViewSelectInput />
            </View>
        );
    }

    /* 跳转到选择位置页面 */
    navigtionPosition = () => {
        NavigationService.navigate('positionPage', {
            location: this.store.lng + ',' + this.store.lat
        });
    }
}

/* 样式 */
const stylePosition = StyleSheet.create({
    position: {
        marginLeft: 10,
        width: "73%",
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: unitWidth * 50,
        height: unitWidth * 50
    },
    text: {
        width: unitWidth * 100,
        fontSize: fontscale * 16,
        fontWeight: "500"
    },
    noText: {
        width: unitWidth * 300,
        fontSize: fontscale * 16,
        fontWeight: "500"
    }
});

/**
 *  零件
 * 搜索框
 */
@inject("homeStore")
@observer
class ViewSelectInput extends Component {
    //获取store
    store = this.props.homeStore;
    render() {
        if (this.store.searchStatus == true) {
            return (
                <View style={styleSelect.view}>
                    <TextInput
                        style={styleSelect.input}
                        placeholder='搜索商家或者商品'
                    />
                </View>
            )
        } else {
            return null;
        }
    }
}
const styleSelect = StyleSheet.create({
    view: {
        marginLeft: 10,
        width: unitWidth * 380,
        height: unitWidth * 50,
        backgroundColor: "#c7c7c72B",
        justifyContent: "center",
        alignContent: "center",
        borderRadius: 15
    },
    input: {
        marginLeft: unitWidth * 80
    }
})

/**
 * 零件
 * 头像
 */
@inject("homeStore")
@observer
export class ViewHead extends Component {
    //获取store
    store = this.props.homeStore
    render() {
        return (
            <TouchableOpacity onPress={() => this.goMyself() }>
                <FastImage
                    source={{ uri: this.store.headurl }}
                    style={styleHead.head}
                />
                <ViewHeadIcon />
            </TouchableOpacity>
        )
    }

    goMyself = () => {
        this.store.removeMyselefMessage();
        NavigationService.navigate('myselfPage')
    }
}

/**
 * 角标
 */
@inject("homeStore")
@observer
class ViewHeadIcon extends Component {

    //获取store
    store = this.props.homeStore

    render() {
        if (this.store.myselfMessage == true) {
            return (
                <View style={styleHead.icon}></View>
            );
        } else {
            return null
        }
    }
}

/* 样式 */
const styleHead = StyleSheet.create({
    head: {
        marginRight: 20,
        width: unitWidth * 60,
        height: unitWidth * 60,
        borderRadius: unitWidth * 60 / 2
    },
    icon: {
        position: 'absolute',
        marginLeft: unitWidth * 45,
        backgroundColor: '#d81e06',
        width: unitWidth * 15,
        height: unitWidth * 15,
        borderRadius: unitWidth * 15 / 2,
    },
})

/**
 * 零件
 * 搜索按钮
 */
@inject("homeStore")
@observer
export class ViewSelectImage extends Component {
    //获取store
    store = this.props.homeStore
    render() {
        return (
            <TouchableOpacity onPress={() => this.store.changeSearch()}>
                <FastImage
                    style={styleSelectImage.bigImage}
                    source={
                        this.store.searchStatus == false
                            ?
                            require('../../../res/sousuo.png')
                            :
                            require('../../../res/arrow-right.png')
                    }
                />
            </TouchableOpacity>
        )
    }
}

/* 样式 */
const styleSelectImage = StyleSheet.create({
    bigImage: {
        width: unitWidth * 60,
        height: unitWidth * 60,
        //marginLeft: 50
    }
})
