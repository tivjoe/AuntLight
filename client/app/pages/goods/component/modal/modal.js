import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { inject, observer } from "mobx-react";
import ModalBox from 'react-native-modalbox';
import FastImage from 'react-native-fast-image';
import { unitWidth } from '../../../../public/SreenUil';
import {ViewClassList} from './parts';

/**
 * 组件
 * 分类modal
 */
@inject("goodStore")
@observer
export class ModalClass extends Component {

    //导入store
    store = this.props.goodStore;

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
                        source={require("../../../../res/guanbi.png")}
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