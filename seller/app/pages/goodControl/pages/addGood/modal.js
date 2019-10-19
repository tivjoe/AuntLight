import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import ModalBox from 'react-native-modalbox';
import FastImage from 'react-native-fast-image';
import { unitWidth, fontscale } from '../../../..//public/SreenUil';
import { inject, observer } from 'mobx-react';
import {toJS} from "mobx";


@inject("addGoodStore")
@observer
export class ModalClass extends Component {

    store = this.props.addGoodStore;

    render() {
        return (
            <ModalBox
                style={{ height: "60%" }}
                isOpen={this.store.isShowModal}
                onClosed={() => this.store.closeModal()}
                position="bottom"
                swipeToClose={false}
            >
                <Top />
                <ClassList />
            </ModalBox>
        )
    }
}

@inject("addGoodStore")
@observer
class Top extends Component {

    store = this.props.addGoodStore;

    render() {
        return (
            <View style={styleTop.top} >
                <TouchableOpacity onPress={() => this.store.closeModal()} >
                    <FastImage style={styleTop.closeImage} source={require("../../../../res/guanbi.png")} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styleTop = StyleSheet.create({
    top: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 44,
    },
    closeImage: {
        width: unitWidth * 25,
        height: unitWidth * 25,
        marginLeft: 20,
    }
})

@inject("addGoodStore")
@observer
class ClassList extends Component {

    store = this.props.addGoodStore;

    render() {
        return (
            <FlatList style={{ flex: 1, marginTop: 20 }}
                showsVerticalScrollIndicator={false}
                data={toJS(this.store.classList)}
                keyExtractor={item => item.id}
                extraData={this.state}
                renderItem={({ item, index }) =>
                    <TouchableOpacity onPress={()=>this.onClass(item.class_name)} >
                        <Text style={{marginBottom:20,marginLeft:20,fontSize:fontscale*14,fontWeight:"500"}} >{item.class_name}</Text>
                    </TouchableOpacity>
                }

                ListEmptyComponent={() =>
                    <View style={{ width: "100%", height: unitWidth * 300, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color:"red",fontSize: 16, fontWeight: "500" }}>请您返回上一页添加分类</Text>
                    </View>
                }
            />
        )
    }

    onClass=(name)=>{
        this.store.onChangeText("onClass",name);
        this.store.closeModal();
    }
}