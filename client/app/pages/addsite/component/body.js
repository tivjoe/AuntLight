import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, FlatList } from 'react-native';
import { unitWidth, fontscale } from '../../../public/SreenUil'
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

/**
 * 组件
 * 输入
 */
@inject('addSiteStore')
@observer
export class ViewInput extends Component {

    //获取store
    store = this.props.addSiteStore

    constructor(props) {
        super(props);
        this.state = {
            houseNumber: "",
            contactName: "",
            contactPhone: ""
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styleInput.viewAddress}>
                    <Text style={styleInput.text}>收货地址 : </Text>
                    <Text style={this.store.poi.name == "" ? styleInput.noSelect : styleInput.select}>{this.store.poi.name == "" ? "请搜索列表中选择位置" : this.store.poi.name}</Text>
                </View>
                <View style={styleInput.viewText}>
                    <Text style={styleInput.text}>门牌号 : </Text>
                    <TextInput style={styleInput.textInput} placeholder="详细地址，例：18号楼6层608室" autoCapitalize="none" onChangeText={(text) => this.store.upDateContactInfo("house", text)} />
                </View>
                <View style={styleInput.viewText}>
                    <Text style={styleInput.text}>联系人 : </Text>
                    <TextInput style={styleInput.textInput} placeholder="请填写收货人姓名" autoCapitalize="none" onChangeText={(text) => this.store.upDateContactInfo("name", text)} />
                </View>
                <View style={styleInput.viewText}>
                    <Text style={styleInput.text}>手机号 : </Text>
                    <TextInput style={styleInput.textInput} placeholder="请填写收货人手机号码" autoCapitalize="none" onChangeText={(text) => this.store.upDateContactInfo("phone", text)} />
                </View>
            </View>
        )
    }

}


/* 样式 */
const styleInput = StyleSheet.create({
    viewAddress: {
        marginLeft: 20,
        marginTop: 20,
        flexDirection: "row",
    },
    viewText: {
        marginLeft: 20,
        marginTop: 30,
        flexDirection: "row",
    },
    text: {
        fontSize: fontscale * 14,
        fontWeight: "300"
    },
    textInput: {
        width: unitWidth * 550,
        marginLeft: 20
    },
    select: {
        fontSize: fontscale * 16,
        fontWeight: "500",
        marginLeft: 20
    },
    noSelect: {
        fontSize: fontscale * 14,
        fontWeight: "300",
        color: "#c7c7c7",
        marginLeft: 20
    }
})

/**
 * 零件
 * poi列表
 */
@inject('addSiteStore')
@observer
export class ViewPoisList extends Component {

    //获取store
    store = this.props.addSiteStore

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styleAddress.textTitle}>搜索列表</Text>
                <FlatList style={{ flex: 1, marginTop: 20 }}
                    showsVerticalScrollIndicator={false}
                    data={toJS(this.store.pois)}
                    keyExtractor={item => item.id}
                    extraData={this.state}
                    renderItem={({ item, index }) =>
                        <TouchableWithoutFeedback onPress={() => this.selectPosition(index)}>
                            <View style={styleAddress.viewAddress}>
                                <Text style={styleAddress.textAddress}>{item.name}</Text>
                                <Text style={styleAddress.textName}>{item.adname + item.address}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    }

                    ListEmptyComponent={() =>
                        <View style={styleAddress.address}>
                            <Text style={styleAddress.textTitle}>搜索列表</Text>
                            <View style={{ width: "100%", height: unitWidth * 300, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ fontSize: 16, fontWeight: "500" }}>没有找到，尝试输入建筑名称，或者街道名称。</Text>
                            </View>
                        </View>
                    }
                />
            </View>
        )
    }

    /* 选择地理位置 */
    selectPosition = (index) => {
        poiName = this.store.pois[index].name;
        position = this.store.pois[index].location;
        position = position.split(',');
        lat = position[1];
        lng = position[0];
        this.store.upDatePoi(poiName, lng, lat);
    }
}

/* 样式 */
const styleAddress = StyleSheet.create({
    address: {
        width: "100%",
        height: unitWidth * 400
    },
    textTitle: {
        marginTop: 30,
        marginLeft: 20,
        color: "#c7c7c7",
        fontWeight: "400",
        fontSize: fontscale * 16
    },
    viewAddress: {
        marginBottom: unitWidth * 20,
        marginLeft: unitWidth * 50,
        width: "85%",
        height: unitWidth * 100,
        justifyContent: "space-around",
    },
    textAddress: {
        fontWeight: "500",
        fontSize: fontscale * 16,
    },
    textName: {
        fontWeight: "500",
        fontSize: fontscale * 13,
        color: "#c7c7c7"
    }
})