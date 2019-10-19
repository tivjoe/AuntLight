import React, { Component } from 'react';
import { View, Text, FlatList,StyleSheet } from 'react-native';
import { unitWidth, fontscale } from '../../../public/SreenUil';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';

/**
 * 零件
 * 用户地址列表
 */
@inject("myAddressStore")
@observer
export default class AddressList extends Component {

    //获取store
    store = this.props.myAddressStore

    render() {
        return (
            <FlatList
                style={{ flex: 1,marginTop:10 }}
                showsVerticalScrollIndicator={true}
                data={toJS(this.store.address)}
                //keyExtractor={item => item.id}
                extraData={this.state}

                //不为空
                renderItem={({ item, index }) =>
                    <View style={styleAddress.viewAddress}>
                        <Text style={styleAddress.textAddress}>{item.position_Name}     {item.house}</Text>
                        <Text style={styleAddress.textName}>{item.contact_name}    {item.contact_phone}</Text>
                    </View>
                }

                //为空
                ListEmptyComponent={() =>
                    <View style={styleAddress.address}>
                        <View style={{ width: "100%", height: unitWidth * 300, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 16, fontWeight: "500" }}>没有您的收货地址，赶快添加吧！</Text>
                        </View>
                    </View>
                }
            />
        )
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
        fontWeight: "400",
        fontSize: fontscale * 16,
    },
    textName: {
        fontWeight: "500",
        fontSize: fontscale * 13,
        color: "#c7c7c7"
    }
})
