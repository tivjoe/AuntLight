import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import FastImag from 'react-native-fast-image';
import { unitWidth, fontscale } from '../../../../public/SreenUil';
import Modal from 'react-native-modalbox';
import { observer, inject } from 'mobx-react';
import { ViewAddressList, ViewPayMethod } from './parts';
import { sendWs } from '../../../../public/Websocket';
import NavigationService from '../../../../public/NavigationService';

/**
 * 组件
 * 选择地址modal
 */
@inject('confimOrderStore')
@observer
export class ModalAddress extends Component {

    //获取store
    store = this.props.confimOrderStore

    componentDidMount() {
        //获取用户地址
        sendWs("get_address");
    }

    render() {
        return (
            <Modal
                style={{ height: "60%", borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
                isOpen={this.store.addressModal}
                position="bottom"
                onClosed={() => this.store.closeModal("address")}
                swipeToClose={false}
            >
                <View style={styleAddress.view}>

                    <TouchableOpacity onPress={() => this.store.closeModal("address")}>
                        <FastImag
                            style={styleAddress.closeImage}
                            source={require("../../../../res/guanbi.png")}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => NavigationService.navigate(
                        "addSitePag",
                        {
                            callBack: () =>
                                sendWs(4)
                        })} >
                        <Text style={styleAddress.text}>添加</Text>
                    </TouchableOpacity>

                </View>

                <ViewAddressList />

            </Modal>
        )
    }
}

/* 样式 */
const styleAddress = StyleSheet.create({
    view: {
        height: 44,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    closeImage: {
        marginLeft: 20,
        width: unitWidth * 20,
        height: unitWidth * 20
    },
    text: {
        marginRight: 20,
        fontSize: fontscale * 14,
        color: "#d81e06",
        marginRight: 20,
    }
})


/**
 * 组件
 * 选择支付方式modal
 */
@inject('confimOrderStore')
@observer
export class ModalPay extends Component {

    //获取store
    store = this.props.confimOrderStore

    render() {
        return (
            <Modal
                style={{ height: "50%", borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
                isOpen={this.store.payModal}
                position="bottom"
                onClosed={() => this.store.closeModal("pay")}
            //swipeToClose={false}
            >
                <View style={stylePay.view}>

                    <TouchableOpacity onPress={() => this.store.closeModal("address")}>
                        <FastImag
                            style={stylePay.closeImage}
                            source={require("../../../../res/guanbi.png")}
                        />
                    </TouchableOpacity>

                    <Text style={stylePay.text} >选择支付方式</Text>

                </View>

                <ViewPayMethod />

            </Modal>
        )
    }
}

/* 样式 */
const stylePay = StyleSheet.create({
    view: {
        height: 44,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    closeImage: {
        marginLeft: 20,
        width: unitWidth * 20,
        height: unitWidth * 20
    },
    text: {
        marginRight: unitWidth * 300,
        fontSize: fontscale * 16,
    }
})

/**
 * 组件
 * 备注remake modal
 */
@inject('confimOrderStore')
@observer
export class ModalRemake extends Component {

    //获取store
    store = this.props.confimOrderStore
    constructor(props) {
        super(props);
        this.state = {
            remake: ''
        }
    }

    render() {
        return (
            <Modal
                style={{ width: "70%", height: "20%", borderRadius: 10 }}
                isOpen={this.store.remakeModal}
                position="center"
                onClosed={() => this.store.closeModal("remake")}
                swipeToClose={false}
            >
                <View style={styleRemake.viewInput} >
                    <TextInput style={styleRemake.input} defaultValue={this.store.remake} multiline={true} maxLength={50} placeholder="提醒商家或配送员 例：不要辣，请提前联系我" onChangeText={(text) => this.state.remake = text} />
                </View>

                <View style={styleRemake.viewControl} >
                    <View style={styleRemake.view} >
                        <TouchableOpacity onPress={() => this.store.closeModal("remake")}>
                            <Text style={styleRemake.textNo} >取消</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styleRemake.view}>
                        <TouchableOpacity onPress={() => this.confim()}>
                            <Text style={styleRemake.textYes} >确认</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
        )
    }

    /* 确认 */
    confim=()=>{
        this.store.closeModal("remake");
        this.store.updateRemake(this.state.remake);
    }
}

/* 样式 */
const styleRemake = StyleSheet.create({
    viewInput: {
        height: unitWidth * 220,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "#eaeaea2B",
    },
    input: {
        width: "90%",
        marginTop: 20,
    },
    viewControl: {
        flexDirection: 'row',
        height: unitWidth * 100
    },
    view: {
        width: "50%",
        justifyContent: "center",
        alignItems: 'center',
    },
    textNo: {
        fontSize: fontscale * 14,
    },
    textYes: {
        fontSize: fontscale * 14,
        color: "#2196f3"
    }
})