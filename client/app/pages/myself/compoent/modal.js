import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { unitWidth, fontscale } from '../../../public/SreenUil';
import Modal from 'react-native-modalbox';
import { observer, inject } from 'mobx-react';
import { sendWs } from '../../../public/Websocket';

/**
 * 组件
 * 名字 modal
 */
@inject("myselfStore")
@observer
export class ModalName extends Component {

    //获取store
    store = this.props.myselfStore

    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }

    render() {
        return (
            <Modal
                style={{ width: "70%", height: unitWidth * 200, borderRadius: 10 }}
                isOpen={this.store.nameModal}
                position="center"
                onClosed={() => this.store.closeModal("name")}
                swipeToClose={false}
            >
                <View style={styleRemake.viewInput} >
                    <TextInput style={styleRemake.input} defaultValue={this.store.info.user_name} multiline={true} maxLength={10} placeholder="输入您的新昵称" onChangeText={(text) => this.state.name = text} />
                </View>

                <View style={styleRemake.viewControl} >
                    <View style={styleRemake.view} >
                        <TouchableOpacity onPress={() => this.store.closeModal("name")}>
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
        if (this.state.name != '') {
            const data = { name: this.state.name }
            sendWs("update_name", data);
            this.store.closeModal("name");
            this.store.updateInfo("name", this.state.name);
        }
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