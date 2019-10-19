import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react';
import FastImag from 'react-native-fast-image';
import { unitWidth, fontscale } from '../../../public/SreenUil';
import { toJS } from 'mobx';

/**
 * 零件
 */
@inject("homeStore")
@observer
export class ViewDiscuss extends Component {

    //获取store
    store = this.props.homeStore;

    render() {
        if (toJS(this.store.discussList) != null) {
            return (
                <FlatList
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    data={toJS(this.store.discussList)}
                    //keyExtractor={item => item.seller_name}
                    extraData={this.state}
                    renderItem={({ item, index }) =>
                        <ViewItemDiscuss
                            name={item.user_name}
                            url={item.user_headurl}
                            text={item.text}
                            url1={item.image_url_1}
                            url2={item.image_url_2}
                            url3={item.image_url_3}
                        />
                    }
                />
            )
        } else {
            return (
                <View style={styleList.view}>
                    <Text style={styleList.text}>暂无评论，赶紧下单评论吧！！！</Text>
                </View>
            )
        }
    }
}

/* 样式 */
const styleList = StyleSheet.create({
    view: {
        alignItems: "center",
        marginTop: unitWidth * 300
    },
    text: {
        fontSize: fontscale * 16,
        fontWeight: "500",
        color: "#2196f3"
    }
})


/**
 * 零件
 * 评论项
 */
@observer
class ViewItemDiscuss extends Component {

    name = this.props.name; //名字
    url = this.props.url;//用户名字
    text = this.props.text; //评论内容

    render() {
        return (
            <View style={styleDiscuss.discuss}>
                <FastImag source={{ uri: this.url }} style={styleDiscuss.image} />
                <View style={styleDiscuss.viewDiscuss}>
                    <Text style={styleDiscuss.textName}>{this.name}</Text>
                    <View style={styleDiscuss.viewText}>
                        <Text>{this.text}</Text>
                    </View>

                    <ViewDiscussImage
                        url1={this.props.url1}
                        url2={this.props.url2}
                        url3={this.props.url3}
                    />

                </View>
            </View>
        )
    }
}

/* 样式 */
const styleDiscuss = StyleSheet.create({
    //零件
    discuss: {
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 20,
    },
    //头像
    image: {
        marginLeft: 20,
        width: unitWidth * 80,
        height: unitWidth * 80,
        borderRadius: 5
    },
    //评论view
    viewDiscuss: {
        marginLeft: 20,
        width: "75%",
        height: "100%"
    },
    //名字
    textName: {
        fontSize: fontscale * 15,
        fontWeight: "500",
        color: "#2196f3"
    },
    //内容
    viewText: {
        marginTop: 10
    }
});

@inject('homeStore')
@observer
class ViewDiscussImage extends Component {

    //获取store
    store = this.props.homeStore;

    constructor(props) {
        super(props);
        this.state = { imageArray: [this.props.url1, this.props.url2, this.props.url3] }
    }

    render() {
        var pages = [];
        for (var i = 0; i < 3; i++) {
            if (this.state.imageArray[i] != null) {
                pages.push(
                    <TouchableOpacity key={i} onPress={() => this.store.imageModal(this.state.imageArray)}>
                        <FastImag source={{ uri: this.state.imageArray[i] }} style={i == 0 ? styleImage.one : styleImage.noOne} />
                    </TouchableOpacity >
                );
            }
        }
        return (
            <View style={styleImage.view}>
                {
                    pages.map((elem) => {
                        return elem;
                    })
                }
            </View>
        );
    }
}

const styleImage = StyleSheet.create({
    view: {
        flexDirection: "row",
        marginTop: 20
    },
    one: {
        width: unitWidth * 120, height: unitWidth * 120
    },
    noOne: {
        marginLeft: 20, width: unitWidth * 120, height: unitWidth * 120
    }
}); 