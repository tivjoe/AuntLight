import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { unitWidth, fontscale } from '../../../public/SreenUil';
import Modal from 'react-native-modalbox';
import { observer, inject } from 'mobx-react';
import { sendWs } from '../../../public/Websocket';

/**
 * 组件
 * 分类 modal
 */
@inject('goodControlStore')
@observer
export class ModalAddClass extends Component {

    //获取store
    store = this.props.goodControlStore

    constructor(props) {
        super(props);
        this.state = {
            class: ''
        }
    }

    render() {
        return (
            <Modal
                style={{ width: "70%", height: unitWidth * 200, borderRadius: 10 }}
                isOpen={this.store.isModalAdd}
                position="center"
                onClosed={() => this.store.closeModal()}
                swipeToClose={false}
            >
                <View style={styleRemake.viewInput} >
                    <TextInput style={styleRemake.input}
                        multiline={true}
                        maxLength={20}
                        placeholder="输入分类名字"
                        onChangeText={(text) => this.state.class = text} />
                </View>

                <View style={styleRemake.viewControl} >
                    <View style={styleRemake.view} >
                        <TouchableOpacity onPress={() => this.store.closeModal()}>
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
    confim = () => {
        if (this.state.class == "") {
            Alert.alert("提示", "分类名不能为空")
            return
        }
        const data = { class_name: this.state.class };
        sendWs("add_class", data)
    }
}


/**
 * 组件
 * 分类 modal
 */
@inject('goodControlStore')
@observer
export class ModalChangeClass extends Component {

    //获取store
    store = this.props.goodControlStore

    constructor(props) {
        super(props);
        this.state = {
            class: ''
        }
    }

    render() {
        return (
            <Modal
                style={{ width: "70%", height: unitWidth * 200, borderRadius: 10 }}
                isOpen={this.store.isModalChange.is}
                position="center"
                onClosed={() => this.store.closeModal()}
                swipeToClose={false}
            >
                <View style={styleRemake.viewInput} >
                    <TextInput style={styleRemake.input}
                        defaultValue={this.store.isModalChange.data}
                        multiline={true}
                        maxLength={20}
                        placeholder="输入新的分类名"
                        onChangeText={(text) => this.state.class = text} />
                </View>

                <View style={styleRemake.viewControl} >
                    <View style={styleRemake.view} >
                        <TouchableOpacity onPress={() => this.store.closeModal()}>
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
    confim = () => {
        if (this.state.class == "") {
            Alert.alert("提示", "分类名不能为空或未修改")
            return
        }
        const data = {
            class_name: this.store.isModalChange.data,
            new_name: this.state.class
        };
        sendWs("update_class", data)
    }
}

/* 样式 */
const styleRemake = StyleSheet.create({
    viewInput: {
        height: unitWidth * 100,
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