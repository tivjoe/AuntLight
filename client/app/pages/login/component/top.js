import React, { Component } from 'react';
import { View,Text,TouchableOpacity,StyleSheet} from 'react-native';
import {unitWidth,fontscale} from '../../../public/SreenUil';
import { observer, inject } from 'mobx-react';

/**
 * 头部
 * 登陆/注册/微信 板块标题显示及板块控制
 */
@inject('loginStore')
@observer
export default class Top extends Component {
    //获取store
    store=this.props.loginStore;
    render() {
        return (
            <View style={styleTop.Top}>
                <TouchableOpacity onPress={()=>this.store.showLogin()}>
                    <Text style={this.store.loginStatus==true?styleTop.checkText:styleTop.unChectText} >登陆 |</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.store.showRegister()}>
                    <Text style={this.store.registerStatus==true?styleTop.checkText:styleTop.unChectText}> 注册 |</Text>
                </TouchableOpacity>
                <TouchableOpacity >
                    <Text style={styleTop.unChectText}> 微信</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

//样式
const styleTop=StyleSheet.create({
    //整个标题
    Top:{ 
        marginTop:unitWidth*150,
        flexDirection: "row", 
        alignItems: "flex-end",
        width:"88%",
        marginLeft:unitWidth*40
    },
    //选中标题
    checkText:{
        fontSize: fontscale * 25,
        fontWeight: "500"
    },
    //为选中
    unChectText:{
        fontSize: fontscale * 18,
        fontWeight: "400"
    }
})