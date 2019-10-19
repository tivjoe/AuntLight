import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, FlatList } from 'react-native';
import ModalBox from 'react-native-modalbox';
import { unitWidth, fontscale } from '../../../../public/SreenUil';
import { inject, observer } from 'mobx-react';
import FastImag from 'react-native-fast-image';


/**
 * modal
 * 商品列表
 */
@inject("homeStore")
@observer
export class ModalGoodsList extends Component {

    //获取store
    store = this.props.homeStore;

    render() {
        return (
            <ModalBox
                style={{ height: "70%" }}
                isOpen={this.store.showModalGoods}
                onClosed={() => this.store.closeModal("goods")}
                position="bottom"
                swipeToClose={false}
            >
                <ViewModalGoodsTop />
                <ViewModalGoodsItem />

            </ModalBox>
        )
    }
}

/**
 * 零件
 * 商品列表头部
 */
@inject("homeStore")
@observer
class ViewModalGoodsTop extends Component {

    //获取store
    store = this.props.homeStore;

    render() {
        return (
            <View>
                <View style={goodsStyle.top} >
                    <View style={goodsStyle.viewText} >
                        <Text style={goodsStyle.textGet} >#11</Text>
                        <Text style={goodsStyle.textGetMoney} >  (预计收入：¥
                    {this.store.showGoodsInfo.list_flag == "readying"
                                ?
                                this.store.readyingOrder[this.store.showGoodsInfo.order_index].seller_profit
                                :
                                this.store.runningOrder[this.store.showGoodsInfo.order_index].seller_profit
                            })
                    </Text>
                    </View>
                    <TouchableOpacity onPress={() => this.store.closeModal("goods")} >
                        <FastImag style={goodsStyle.closeImage} source={require("../../../../res/guanbi.png")} />
                    </TouchableOpacity>
                </View>
                <Text style={{marginLeft:20}} >备注:
                    {this.store.showGoodsInfo.list_flag == "readying"
                        ?
                        this.store.readyingOrder[this.store.showGoodsInfo.order_index].contact_remake
                        :
                        this.store.runningOrder[this.store.showGoodsInfo.order_index].contact_remake
                    }
                </Text>
            </View>
        )
    }
}

/**
 * 零件
 * 商品列表头部
 */
@inject("homeStore")
@observer
class ViewModalGoodsItem extends Component {

    //获取store
    store = this.props.homeStore;

    render() {
        return (
            <FlatList
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                data={this.store.showGoodsInfo.list_flag == "readying"
                    ?
                    this.store.readyingOrder[this.store.showGoodsInfo.order_index].good_list
                    :
                    this.store.runningOrder[this.store.showGoodsInfo.order_index].good_list
                }
                //keyExtractor={item => item.order_id}
                extraData={this.state}

                renderItem={({ item, index }) =>
                    <View style={goodsStyle.viewItem} >

                        <View style={goodsStyle.viewName}>
                            <Text style={goodsStyle.textName} >{item.good_name}</Text>
                        </View>

                        <View style={goodsStyle.viewCount}>
                            <Text style={goodsStyle.textCount} >x{item.good_amount}</Text>
                        </View>

                        <View style={goodsStyle.viewMoney}>
                            <Text style={goodsStyle.textMoney} >¥{item.good_price}</Text>
                        </View>

                    </View>
                }
            />
        )
    }
}

const goodsStyle = StyleSheet.create({
    top: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        height: 44
    },
    viewText: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 20
    },
    textGet: {
        fontSize: fontscale * 23,
        fontWeight: "500",
        color: "#d81e06"
    },
    textGetMoney: {
        fontSize: fontscale * 14,
        fontWeight: "300",
    },
    closeImage: {
        width: unitWidth * 25,
        height: unitWidth * 25,
        marginRight: 20,
    },

    viewItem: {
        height: unitWidth * 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },


    viewItem: {
        //height: unitWidth * 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
    },
    viewName: {
        marginLeft: 20,
        width: unitWidth * 380,
    },
    textName: {
        fontSize: fontscale * 14,
        fontWeight: "300",
    },

    viewCount: {
        //justifyContent:"flex-end",
        alignItems: "flex-end",
        width: unitWidth * 90,
    },
    textCount: {
        fontSize: fontscale * 14,
        fontWeight: "300",
    },

    viewMoney: {
        //justifyContent:"flex-end",
        marginRight: 20,
        alignItems: "flex-end",
        width: unitWidth * 140,
    },
    textMoney: {
        fontSize: fontscale * 14,
        fontWeight: "300",
    },
});