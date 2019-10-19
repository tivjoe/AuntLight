import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Modal } from 'react-native';
import ModalBox from 'react-native-modalbox';
import { inject, observer } from 'mobx-react';
import ImageViewer from 'react-native-image-zoom-viewer';
import FastImag from 'react-native-fast-image';
import { unitWidth, fontscale } from '../../../public/SreenUil';
import { ViewDiscuss } from './parts';
import { toJS } from 'mobx';

/**
 * 组件
 * modal
 * 评论
 */
@inject("homeStore")
@observer
export class ModalDiscuss extends Component {

    //获取store
    store = this.props.homeStore;

    render() {
        return (
            <ModalBox
                style={styleDiscuss.modal}
                isOpen={this.store.showModalDiscuss}
                onClosed={() => this.store.closeModal("discuss")}
                position="bottom"
                swipeToClose={false}
            >
                <View style={styleDiscuss.viewImage}>

                    <TouchableOpacity onPress={() => this.store.closeModal("discuss")}>
                        <FastImag
                            style={styleDiscuss.closeImage}
                            source={require("../../../res/guanbi.png")}
                        />
                    </TouchableOpacity>

                    {this.returnTitle()}

                    <TouchableOpacity >
                        <FastImag
                            style={styleDiscuss.imageGo}
                            source={require("../../../res/jiantouyou.png")}
                        />
                    </TouchableOpacity>
                </View>

                <ViewDiscuss />

            </ModalBox>
        )
    }

    //返回标题
    returnTitle = () => {
        if (toJS(this.store.discussList) == null) {
            return (<Text style={styleDiscuss.textTitel}>评价(0)</Text>)
        } else {
            return (<Text style={styleDiscuss.textTitel}>评价({toJS(this.store.discussList).length})</Text>)
        }
    }
}

/* 样式 */
const styleDiscuss = StyleSheet.create({
    modal: {
        height: "70%",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    viewImage: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        height: 55
    },
    closeImage: {
        width: unitWidth * 25,
        height: unitWidth * 25,
        marginLeft: 20,
    },
    imageGo: {
        width: unitWidth * 30,
        height: unitWidth * 30,
        marginRight: 20,
    },
    textTitel: {
        fontSize: fontscale * 16,
        fontWeight: "500"
    }
});

/**
 * 组件
 * 查看图片
 */
@inject('homeStore')
@observer
export class LookImage extends Component {

    //获取store
    store = this.props.homeStore

    render() {
        return (
            <Modal
                visible={this.store.showModalImage}
                transparent={true}
                animationType="slide"
            >
                <ImageViewer
                    imageUrls={toJS(this.store.discussImage)}
                    saveToLocalByLongPress={false}
                    enableSwipeDown={true}
                    onSwipeDown={() => this.store.imageModal()}
                    onClick={() => this.store.imageModal()}
                />

            </Modal>
        )
    }
}