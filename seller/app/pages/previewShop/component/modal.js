import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity,FlatList,View,Text,TouchableWithoutFeedback} from 'react-native';
import { inject, observer } from "mobx-react";
import ModalBox from 'react-native-modalbox';
import FastImage from 'react-native-fast-image';
import { unitWidth,fontscale } from '../../../public/SreenUil';
import {toJS} from 'mobx';

/**
 * 组件
 * 分类modal
 */
@inject("previewShopStore")
@observer
export class ModalClass extends Component {

    //导入store
    store = this.props.previewShopStore;

    render() {
        return (
            <ModalBox
                style={styleClass.modal}
                isOpen={this.store.isShowClass}
                onClosed={() => this.store.closeClass()}
                swipeToClose={false}
            >

                <TouchableOpacity onPress={() => this.store.closeClass()}>
                    <FastImage
                        style={styleClass.image}
                        source={require("../../../res/guanbi.png")}
                    />
                </TouchableOpacity>

                <ViewClassList />

            </ModalBox>
        )
    }
}

//样式
const styleClass = StyleSheet.create({
    //modal
    modal: {
        flex: 1
    },
    image: {
        width: unitWidth * 30,
        height: unitWidth * 30,
        marginTop:44,
        marginLeft:20
    }
})


@inject("previewShopStore")
@observer
class ViewClassList extends Component {

    //导入store
    store = this.props.previewShopStore;

    render() {
        return (
            <FlatList
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                data={toJS(this.store.classList)}
                //keyExtractor={item => item.seller_id}
                extraData={this.state}
                renderItem={({ item, index }) =>
                    <ViewListiItem
                        index={index}
                        name={item.class_name}
                    />
                }
            />
        )
    }
}

/**
 * 零件
 * 列表项
 */
@inject("previewShopStore")
@observer
class ViewListiItem extends Component {

    index = this.props.index; //数组下标
    name = this.props.name; //分类名

    //导入store
    store = this.props.previewShopStore;

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => this.onClass()}>

                <View style={styleItem.view}>

                    <Text style=
                        {
                            this.store.onClassName == this.name
                                ?
                                styleItem.on
                                :
                                styleItem.text
                        }
                    >
                        {this.name}
                    </Text>
                    
                </View>

            </TouchableWithoutFeedback>
        )
    }

    //选中分类
    onClass = () => {
        //选中分类
        this.store.onClass(this.index);
        //关闭modal
        this.store.closeClass();
    }
}

/* 样式 */
const styleItem = StyleSheet.create({
    //父
    view: {
        flexDirection: 'row',
        width: '100%',
        height: unitWidth * 90,
        alignItems: 'center'
    },
    //text
    text: {
        marginLeft: 20,
        fontSize: fontscale * 14,
        fontWeight: "400",
    },
    //选中
    on: {
        marginLeft: 20,
        fontSize: fontscale * 14,
        fontWeight: "400",
        color: "red",
    }
})