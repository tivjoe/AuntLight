import React, { Component } from 'react';
import {View,StyleSheet,TouchableOpacity} from "react-native";
import {unitWidth} from '../../../public/SreenUil';
import FastImage from 'react-native-fast-image';
import NavigationService from '../../../public/NavigationService';


/**
 * 导航栏
 */
export default class Top extends Component{
    render(){
        return(
            <View style={styleTop.top} >
                <TouchableOpacity onPress={()=>NavigationService.back()}>
                    <FastImage style={styleTop.image} source={require("../../../res/fanhui.png")} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styleTop=StyleSheet.create({
    top:{
        height:44,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center'
    },
    image:{
        marginLeft:20,
        width:unitWidth*40,
        height:unitWidth*40
    }
})