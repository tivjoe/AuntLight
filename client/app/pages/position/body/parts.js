import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { selectNearPoi, selectCurrentPoi } from '../../../public/Position'
import { unitWidth, fontscale } from '../../../public/SreenUil';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import NavigationService from '../../../public/NavigationService';

/**
 * 零件
 * 查询输入框
 */
@inject("positionStore")
export class ViewSelectInput extends Component {

    //获取store
    store = this.props.positionStore;

    constructor(props) {
        super(props);
        this.state = {
            selectText: '', //输入内容
            isClick: true //true禁止交互
        }
    }

    componentDidMount() {
        //获取当前地理位置poi
        selectNearPoi(this.props.location)
            .then(responseJson => {
                this.store.upDatePois(responseJson);
            })
    }


    render() {
        return (
            <View style={styleSelect.select}>
                <View style={styleSelect.viewImage}>
                    <FastImage style={styleSelect.image} source={require("../../../res/position.png")} />
                    <Text style={styleSelect.textCity}>杭州</Text>
                </View>
                <View style={styleSelect.viewInput}>
                    <TextInput style={styleSelect.input} placeholder="输入您的收货地址" autoCapitalize="none" onChangeText={(text) => this.changeText(text)} />
                </View>
                <TouchableOpacity disabled={this.state.isClick} onPress={() => this.selectPois()}>
                    <Text style={this.state.isClick == true ? styleSelect.textSelect : styleSelect.onTextSelect}>搜索</Text>
                </TouchableOpacity>
            </View>
        )
    }

    /* 输入 */
    changeText = (text) => {
        //同步输入内容，搜索可以交互
        if (text != '') {
            this.setState({ isClick: false, selectText: text })
        } else {
            this.setState({ isClick: true, selectText: '' })
        }
    }

    /* 搜索pois */
    selectPois = () => {
        //查询指定地理位置poi
        selectCurrentPoi(this.state.selectText)
            .then(responseJson => {
                this.store.upDatePois(responseJson);
            })
    }
}

/* 样式 */
const styleSelect = StyleSheet.create({
    //零件
    select: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
    },
    //图片view
    viewImage: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
    },
    //图片
    image: {
        width: unitWidth * 40,
        height: unitWidth * 40
    },
    //城市
    textCity: {
        fontSize: fontscale * 15,
        fontWeight: "300"
    },
    //输入框view
    viewInput: {
        marginLeft: 20,
        width: "57%",
        height: 25,
        backgroundColor: '#c7c7c72B',
        borderRadius: 15,
        justifyContent: "center",
        alignContent: "center",
    },
    //输入
    input: {
        width: "90%",
        marginLeft: 20,
        marginRight: 20
    },
    //可以搜索
    onTextSelect: {
        marginLeft: 20,
        fontSize: fontscale * 15,
        fontWeight: "400"
    },
    //不可以搜索
    textSelect: {
        marginLeft: 20,
        fontSize: fontscale * 15,
        fontWeight: "400",
        color: "#c7c7c7"
    }
});

/**
 * 零件
 * 用户地址列表
 */
@inject('positionStore', 'homeStore')
@observer
export class ViewAddressList extends Component {

    //获取store
    store = this.props.positionStore

    render() {
        return (
            <View style={styleAddress.address}>
                <Text style={styleAddress.textTitle}>我的收货地址</Text>
                <FlatList style={{ flex: 1, marginTop: 20 }}
                    showsVerticalScrollIndicator={false}
                    data={toJS(this.store.address)}
                    //keyExtractor={item => item.id}
                    extraData={this.state}
                    renderItem={({ item, index }) =>
                        <TouchableWithoutFeedback onPress={() => this.selectPosition(index)}>
                            <View style={styleAddress.viewAddress}>
                                <Text style={styleAddress.textAddress}>{item.position_Name}     {item.house}</Text>
                                <Text style={styleAddress.textName}>{item.contact_name}    {item.contact_phone}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    }

                    ListEmptyComponent={() =>
                        <View style={styleAddress.address}>
                            <View style={{ width: "100%", height: unitWidth * 300, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ fontSize: 16, fontWeight: "500" }}>没有您的收货地址，赶紧添加把！</Text>
                            </View>
                        </View>
                    }
                />
            </View>
        )
    }

    /* 选择地理位置 */
    selectPosition = (index) => {
        poiName = this.store.address[index].position_Name;
        lng = this.store.address[index].lnt;
        lat = this.store.address[index].lat;
        this.props.homeStore.upDateLocatin(poiName, lng, lat);
        NavigationService.back()
    }
}


/**
 * 零件
 * poi列表
 */
@inject('positionStore', 'homeStore')
@observer
export class ViewPoisList extends Component {

    //获取store
    store = this.props.positionStore

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
        this.props.homeStore.upDateLocatin(poiName, lng, lat);
        NavigationService.back()
    }
}

/* 样式 */
const styleAddress = StyleSheet.create({
    address: {
        width: "100%",
        height: unitWidth * 400
    },
    textTitle: {
        marginTop: 20,
        marginLeft: 20,
        color: "#c7c7c7",
        fontWeight: "400",
        fontSize: fontscale * 14
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

