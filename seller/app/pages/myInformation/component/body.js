import React, { Component } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import { unitWidth, fontscale } from '../../../public/SreenUil';
import { observer, inject } from 'mobx-react';

/*
 *我的，页面
 *主页面结构
 */
@inject('myInformationStore')
export default class ViewList extends Component {

    store = this.props.myInformationStore

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         name: this.store.changeArrayText.name,
    //         feight: this.store.changeArrayText.feight,
    //         preparingTime: this.store.changeArrayText.preparingTime,
    //         startMoney: this.store.changeArrayText.startMoney,
    //     }
    // }

    render() {
        return (
            <ScrollView keyboardShouldPersistTaps="never" >

                <View style={styleBody.viewItem}>
                    <Text style={styleBody.textTitle}>店铺名字</Text>
                    <TextInput
                        defaultValue={this.store.changeArrayText.name}
                        placeholder="输入店铺名字"
                        maxLength={20}
                        onChangeText={(text) => this.changeText("name", text)}
                        style={styleBody.text}
                    />
                </View>

                <View style={styleBody.viewItem}>
                    <Text style={styleBody.textTitle}>配送费</Text>
                    <TextInput
                        defaultValue={"" + this.store.changeArrayText.feight}
                        placeholder="输入用户下单所付的配送费"
                        keyboardType="number-pad"
                        maxLength={3}
                        onChangeText={(text) => this.changeText("feight", text)}
                        style={styleBody.text}
                    />
                </View>

                <View style={styleBody.viewItem}>
                    <Text style={styleBody.textTitle}>起送费</Text>
                    <TextInput
                        defaultValue={"" + this.store.changeArrayText.startMoney}
                        placeholder="输入下单起步价格"
                        keyboardType="number-pad"
                        maxLength={4}
                        onChangeText={(text) => this.changeText("startMoney", text)}
                        style={styleBody.text}
                    />
                </View>

                <View style={styleBody.viewItem}>
                    <Text style={styleBody.textTitle}>备餐时间</Text>
                    <TextInput
                        defaultValue={"" + this.store.changeArrayText.preparingTime}
                        placeholder="输入备餐平均时间"
                        keyboardType="number-pad"
                        maxLength={2}
                        onChangeText={(text) => this.changeText("preparingTime", text)}
                        style={styleBody.text}
                    />
                </View>

                <View style={styleBody.viewItemAddress}>
                    <Text style={styleBody.textTitle}>地址</Text>
                    <View style={{ width: unitWidth * 500 }}>
                        <Text style={styleBody.textTitleAddress}>{this.store.information.addres}</Text>
                    </View>
                </View>

                <View style={styleBody.viewItemClass} >
                    <Text style={styleBody.textTitle}>店铺类别</Text>
                    <Text style={styleBody.text}>{this.store.information.class}</Text>
                </View>

                <View style={styleBody.viewItem}>
                    <Text style={styleBody.textTitle}>评分</Text>
                    <Text style={styleBody.text}>{this.store.information.level}</Text>
                </View>

                <View style={styleBody.viewItem}>
                    <Text style={styleBody.textTitle}>点击量</Text>
                    <Text style={styleBody.text}>{this.store.information.clicks}次</Text>
                </View>

                <View style={styleBody.viewItemClass}>
                    <Text style={styleBody.textTitle}>余额</Text>
                    <Text style={styleBody.text}>¥{this.store.information.blance}</Text>
                </View>
                <View style={styleBody.viewItem}>
                    <Text style={styleBody.textTitle}>总订单数</Text>
                    <Text style={styleBody.text}>{this.store.information.allOrderNumber}单</Text>
                </View>

                <View style={styleBody.viewItem}>
                    <Text style={styleBody.textTitle}>总交易额</Text>
                    <Text style={styleBody.text}>¥{this.store.information.turnover}</Text>
                </View>

                <View style={{ backgroundColor: "white", marginTop: unitWidth * 20, height: unitWidth * 100, flexDirection: "row", justifyContent: "center", alignItems: "center", borderBottomWidth: 1, borderBottomColor: "#eaeaea" }}>
                    <Text style={{}}>提现</Text>
                </View>

            </ScrollView>
        );
    }

    changeText = (flag, text) => {
        // switch (flag) {
        //     case "name":
        //         this.setState({name:text})
        //         break;
        //     case "feight":
        //         this.setState({feight:text})
        //         break;
        //     case "startMoney":
        //         this.setState({startMoney:text})
        //         break;
        //     case "preparingTime":
        //         this.setState({preparingTime:text})
        //         break;
        // }
        this.store.changeText(flag,text);
    }
}

const styleBody = StyleSheet.create({
    viewItem: {
        backgroundColor: "white",
        height: unitWidth * 100,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#eaeaea"
    },
    textTitle: {
        marginLeft: 20,
        color: "#5a5a5a",
        fontSize: fontscale * 14,
        fontWeight: "300"
    },
    text: {
        marginRight: 20,
        fontSize: fontscale * 14,
        fontWeight: "500"
    },

    viewItemAddress: {
        backgroundColor: "white",
        height: unitWidth * 150,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#eaeaea"
    },
    textTitleAddress: {
        marginRight: unitWidth * 20,
        fontSize: fontscale * 12,
        color: "#c7c7c7",
        fontWeight: "500"
    },

    viewItemClass: {
        marginTop: 20,
        backgroundColor: "white",
        height: unitWidth * 100,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#eaeaea"
    }

})