import React, { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import NavigationService from "../../public/NavigationService";
import { unitWidth, fontscale } from "../../public/SreenUil";
import { inject } from 'mobx-react';

/**
 * 入口
 * 下单成功
 */
export default class PaySuccessOrder extends Component {
    
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Top />
                <Body />
            </SafeAreaView>
        )
    }
}

@inject("homeStore")
class Top extends Component {
    render() {
        return (
            <View style={stylePay.viewTop}>
                <TouchableOpacity onPress={() =>this.back()}  >
                    <FastImage style={stylePay.imageBack} source={require("../../res/fanhui.png")} />
                </TouchableOpacity>
            </View>
        )
    }

    back=()=>{
        this.props.homeStore.onMyselefMessage();
        NavigationService.navigate('homePage');
    }
}

class Body extends Component{
    render(){
        return(
            <View style={stylePay.body}>
                <FastImage style={stylePay.imageSuccess} source={require("../../res/zhifuchenggong-2.png")} />
                <Text style={stylePay.text} >预计10分钟内送达</Text>
            </View>
        )
    }
}

const stylePay = StyleSheet.create({
    //导航栏view
    viewTop: {
        height: 44,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    },
    //返回图片
    imageBack: {
        marginLeft: 20,
        width: unitWidth * 40,
        height: unitWidth * 40
    },
    body:{
        width:"100%",
        marginTop: unitWidth*200,
        justifyContent:"center",
        alignItems: 'center',
    },
    imageSuccess:{
        width:unitWidth*220,
        height:unitWidth*220,
    },
    text:{
        marginTop:20,
        fontSize:fontscale*16,
        color:"red",
    }
})