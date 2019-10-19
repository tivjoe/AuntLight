import React, { Component } from 'react';
import { SectionList, View, TouchableWithoutFeedback, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { unitWidth, fontscale } from '../../../public/SreenUil';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import FastImage from 'react-native-fast-image'
import { sendWs } from '../../../public/Websocket';
import NavigationService from '../../../public/NavigationService'

/*
 *列表
 */
@inject('goodControlStore')
@observer
export class ViewSectionList extends Component {

    store = this.props.goodControlStore

    render() {
        return (
            <SectionList
                style={{ flex: 1 }}
                renderItem={({ item, index, section }) => this.returnItem(index, item.class_name, item.good_name, item.good_price, item.is_out, item.good_url)}
                renderSectionHeader={({ section: { class_name, count_goods } }) => this.returnHeader(class_name, count_goods)}
                sections={toJS(this.store.sectionList)}
            />
        )
    }

    returnHeader(name, count) {
        return (
            <TouchableWithoutFeedback onPress={() => this.getGoods(name)}>
                <View style={styleList.headView}>
                    <Text style={styleList.headText}>{name}   ({count})</Text>
                    <View style={styleList.view} >
                        <TouchableOpacity onPress={() => this.store.openModal("change", name)} >
                            <Text style={styleList.textChange} >修改</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.deleteClass(name)} >
                            <FastImage source={require("../../../res/Group-.png")} style={styleList.imageDelete} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    returnItem = (index, class_name, name, price, is_out, url) => {
        return (
            <TouchableWithoutFeedback onPress={() => this.goChange(class_name, name, price, is_out, url)} >
                <View style={styleList.goodView}>
                    <View style={styleList.imageView}>
                        <FastImage source={{ uri: url }} style={styleList.imageGood} />
                        <Text style={styleList.name}>{name}</Text>
                    </View>
                    <Text style={styleList.price}>¥{price}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    goChange(class_name, name, price, is_out, url) {
        let classList = [];
        for (let i = 0; i < toJS(this.store.sectionList).length; i++) {
            let array = { "class_name": "" };
            array.class_name = this.store.sectionList[i].class_name;
            classList.push(array);
        }
        NavigationService.navigate("changeGoodPage", {
            classList: classList,
            old_class: class_name,
            name: name,
            price: price,
            is_out: is_out,
            url: url
        })
    }

    getGoods(name) {
        const data = { flag: "goods", class: name }
        sendWs("get_class_or_goods", data);
    }

    deleteClass(name) {
        Alert.alert(
            '提示',
            '确定删除' + name + "分类和该分类的所有商品?",
            [
                { text: '取消', style: 'cancel' },
                { text: '确定', onPress: () => sendWs("delete_class", data = { class_name: name }) },
            ],
        )
    }

}

const styleList = StyleSheet.create({
    headView: {
        //backgroundColor: "white", 
        flexDirection: "row",
        height: unitWidth * 100,
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: "#c7c7c72B",
        borderBottomWidth: 1
    },
    headText: {
        marginLeft: 20,
        fontSize: fontscale * 14,
        fontWeight: "500"
    },
    view: {
        flexDirection: "row",
        alignItems: "center",
    },
    imageDelete: {
        marginRight: 20,
        width: unitWidth * 40,
        height: unitWidth * 40
    },
    textChange: {
        marginRight: 10,
        fontSize: fontscale * 14,
        color: "#515151"
    },

    goodView: {
        //backgroundColor: "white", 
        height: unitWidth * 100,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: "#c7c7c72B",
        borderBottomWidth: 1
    },
    imageView: {
        marginLeft: 20,
        flexDirection: "row",
        alignItems: "center",
        height: unitWidth * 80
    },
    imageGood: {
        width: unitWidth * 80,
        height: unitWidth * 80,
        //backgroundColor: "blue"
    },
    name: {
        marginLeft: 10,
        fontSize: fontscale * 12
    },
    price: {
        marginRight: 20,
        color: "red"
    }
})