import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Text, StyleSheet } from 'react-native';
import { unitWidth, fontscale } from '../../../public/SreenUil';
import { observer, inject } from 'mobx-react';
import {toJS} from 'mobx';
import FastImage from 'react-native-fast-image'
import NavigationService from '../../../public/NavigationService'

/*
 *列表
 */
@inject('goodControlStore')
@observer
export class AddClassGood extends Component {

    store = this.props.goodControlStore

    render() {
        return (
            <View>
                <TouchableWithoutFeedback onPress={()=>this.store.openModal("add")} >
                    <View style={styleAdd.viewItem}>
                        <FastImage source={require('../../../res/tj.png')} style={styleAdd.image} />
                        <Text style={styleAdd.text}>分类</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback  onPress={()=>this.goAddGood()} >
                    <View style={styleAdd.viewItem} >
                        <FastImage source={require('../../../res/tj.png')} style={styleAdd.image} />
                        <Text style={styleAdd.text}>商品</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    goAddGood=()=>{
        let classList=[];
        for(let i=0;i<toJS(this.store.sectionList).length;i++){
            let array={"class_name":""};
            array.class_name=this.store.sectionList[i].class_name;
            classList.push(array);
        }
        NavigationService.navigate("addGoodPage",{classList:classList})
    }
}

const styleAdd = StyleSheet.create({
    viewItem: {
        height: unitWidth * 100,
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#c7c7c72B",
        borderBottomWidth: 1
    },
    image: {
        marginLeft: 20,
        width: unitWidth * 35,
        height: unitWidth * 35
    },
    text: {
        marginLeft: 10,
        fontSize: fontscale * 14,
        fontWeight: "500"
    }
});
