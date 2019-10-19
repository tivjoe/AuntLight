import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Switch, StyleSheet } from 'react-native';
import { unitWidth, fontscale } from '../../../../public/SreenUil';
import FastImage from 'react-native-fast-image';
import NavigationService from "../../../../public/NavigationService";
import { inject, observer } from 'mobx-react';
import {sendWs} from "../../../../public/Websocket";

/*
 *导航栏
 */
@inject("homeStore")
@observer
export default class ViewTop extends Component {
    //获取store
    store = this.props.homeStore;

    render() {
        return (
            <View style={styleTop.top}>
                <Switch
                    value={this.store.isGet}
                    style={styleTop.switch}
                    onValueChange={()=>this.changeIsGet()}
                />
                <Text style={styleTop.text}>
                    {
                        this.store.isGet == true
                            ?
                            "营业中"
                            :
                            "休息中"
                    }
                </Text>
                <TouchableOpacity onPress={() => NavigationService.navigate('myselfPage')} >
                    <FastImage style={styleTop.head} source={{uri:this.store.headurl}} />
                </TouchableOpacity>
            </View>
        );
    }

    changeIsGet=()=>{
        if(this.store.isGet==true){
            const data={flag:"close"};
            sendWs("update_isget",data);
        }else{
            const data={flag:"open"};
            sendWs("update_isget",data);
        }
    }
}

const styleTop = StyleSheet.create({
    top: {
        width: '100%',
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    switch: {
        height: 30,
        marginLeft: unitWidth * 20
    },
    text: {
        fontSize: fontscale * 16,
        fontWeight: "500"
    },
    head: {
        backgroundColor: "blue",
        marginRight: 20,
        width: unitWidth * 60,
        height: unitWidth * 60,
        borderRadius: unitWidth * 60 / 2
    },
})