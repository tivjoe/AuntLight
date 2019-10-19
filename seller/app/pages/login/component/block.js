import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Button, Image, Alert } from 'react-native';
import { unitWidth, fontscale } from '../../../public/SreenUil';
import { verificationPhoneNumber, verifcationPassword, verifcationSmsCode } from '../../../public/InputValidation';
import { sendWs } from '../../../public/Websocket';
import { observer, inject } from 'mobx-react';
import Modal from 'react-native-modalbox';

/**
 * 板块
 * 控制显示板块
 */
@inject('loginStore')
@observer
export default class Block extends Component {
    //获取store
    store = this.props.loginStore;
    render() {
        if (this.store.loginStatus == true) {
            return (<ViewLogin navigation={this.props.navigation}></ViewLogin>);
        } else {
            return (<ViewRegister navigation={this.props.navigation}></ViewRegister>)
        }
    }
}

/**
 * 登陆板块
 */
@inject('loginStore')
@observer
class ViewLogin extends Component {
    //获取store
    store = this.props.loginStore;
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',//注册手机号码
            passWord: ''//密码
        }
    }
    render() {
        return (
            <View style={styleLogin.login}>
                <View style={styleLogin.viewPhoneAndPw}>
                    <Text style={styleLogin.textPhoneAndPw}>手机号</Text>
                    <TextInput style={styleLogin.inputPhone} placeholder="输入手机号码" keyboardType="number-pad" maxLength={11} onChangeText={(text) => this.state.phoneNumber = text} />
                </View>
                <View style={styleLogin.viewPhoneAndPw}>
                    <Text style={styleLogin.textPhoneAndPw} >密码</Text>
                    <TextInput style={styleLogin.inputPw} secureTextEntry={true} placeholder="输入密码" maxLength={16} onChangeText={(text) => this.state.passWord = text} />
                </View>
                <View style={styleLogin.viewFogetPw}>
                    <TouchableOpacity onPress={() => this.store.showForgetPw()} >
                        <Text style={styleLogin.textFogetPw}>忘记密码?</Text>
                    </TouchableOpacity>
                </View>
                <View style={styleLogin.buttonLogin}>
                    <Button color="white" title="登陆" onPress={() => this.login()} />
                </View>
                {this.returnModal()}
            </View>
        );
    }

    //是否渲染忘记密码板块
    returnModal = () => {
        //判断状态是否为真，为真渲染
        if (this.store.fogetPwStatus == true) {
            return (<ModalFogetPw></ModalFogetPw>)
        } else {
            return null
        }
    }

    //验证输入是否合法
    inputValidation = () => {
        //验证输入是否合法
        if (verificationPhoneNumber(this.state.phoneNumber) == false) {
            Alert.alert("提示", "请输入正确的手机号码");
            return;
        }
        if (verifcationPassword(this.state.passWord) == false) {
            Alert.alert("提示", "密码格式错误。6-16位的密码")
            return;
        }
        return 1;
    }

    //登陆
    login = () => {
        //判断输入是否合法
        if (this.inputValidation()) {
            //设置登陆信息
            this.store.setLoginInfo(this.state.phoneNumber,this.state.passWord);
            //发送请求
            let data = { phoneNumber: this.state.phoneNumber, password: this.state.passWord };
            sendWs("login_account", data);
        }
    }
}

/* 登陆板块样式 */
const styleLogin = StyleSheet.create({
    //登陆板块
    login: {
        marginTop: unitWidth * 80,
        alignItems: "center",
        width: "88%",
        marginLeft: unitWidth * 40
    },
    //文本手机号，密码
    textPhoneAndPw: {
        fontSize: fontscale * 18,
        fontWeight: "400"
    },
    //输入框手机号,密码
    inputPhone: {
        width: "60%",
        marginLeft: unitWidth * 50,
        fontSize: fontscale * 18,
        fontWeight: "400"
    },
    inputPw: {
        width: "60%",
        marginLeft: unitWidth * 90,
        fontSize: fontscale * 18,
        fontWeight: "400"
    },
    //手机密码view
    viewPhoneAndPw: {
        width: "100%",
        flexDirection: "row",
        height: unitWidth * 100,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#eaeaea"
    },
    //忘记密码view
    viewFogetPw: {
        marginTop: unitWidth * 40,
        width: "100%",
        alignItems: "flex-start"
    },
    //文本忘记密码
    textFogetPw: {
        fontSize: fontscale * 15,
        color: "#2196f3"
    },
    //登陆按钮view
    buttonLogin: {
        marginTop: unitWidth * 80,
        width: "100%",
        height: unitWidth * 80,
        backgroundColor: "#e5baf7",
        borderRadius: 5,
        alignItems: "center"
    }
});


/**
 * 注册板块
 */
@inject('loginStore')
class ViewRegister extends Component {
    //获取store
    store = this.props.loginStore;
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',//手机号
            name: '', //联系人
        }
    }
    render() {
        return (
            <View style={styleRegitser.register}>

                <View style={styleRegitser.viewPhoneAndPw}>
                    <Text style={styleRegitser.textPhoneAndPw} >手机号</Text>
                    <TextInput style={styleRegitser.inputPhoneAndPw} placeholder="输入手机号码" keyboardType="number-pad" maxLength={11} onChangeText={(text) => this.state.phoneNumber = text} />
                </View>

                <View style={styleRegitser.viewPhoneAndPw}>
                    <Text style={styleRegitser.textPhoneAndPw}>姓名</Text>
                    <TextInput style={styleRegitser.inputPw} placeholder="输入联系人姓名" autoCapitalize="none" maxLength={10} onChangeText={(text) => this.state.name = text} />
                </View>
                <View style={styleRegitser.buttonRegister} >
                    <Button color="white" title="申请入驻" onPress={() => this.register()} />
                </View>

            </View>
        );
    }

    /* 验证输入是否合法 */
    inputValidation = () => {
        if (verificationPhoneNumber(this.state.phoneNumber) == false) {
            Alert.alert("提示", "请输入正确的手机号码");
            return;
        }
        if (this.state.name == false) {
            Alert.alert("提示", "请填写联系人");
            return
        }
        return 1;
    }

    /* 注册 */
    register = () => {
        //判断输入是否合法
        if (this.inputValidation()) {
            //发送请求
            let data = { phone: this.state.phoneNumber,name:this.state.name };
            sendWs("apply_join", data);
        }
    }
}

/* 注册板块样式 */
const styleRegitser = StyleSheet.create({
    //登陆板块
    register: {
        marginTop: unitWidth * 80,
        alignItems: "center",
        width: "88%",
        marginLeft: unitWidth * 40
    },
    //文本手机号，密码
    textPhoneAndPw: {
        fontSize: fontscale * 18,
        fontWeight: "400"
    },
    //输入框手机号,密码
    inputPhoneAndPw: {
        width: "60%",
        marginLeft: unitWidth * 50,
        fontSize: fontscale * 18,
        fontWeight: "400"
    },
    inputPw: {
        width: "60%",
        marginLeft: unitWidth * 90,
        fontSize: fontscale * 18,
        fontWeight: "400"
    },
    inputSms: {
        width: "40%",
        marginLeft: unitWidth * 50,
        fontSize: fontscale * 18,
        fontWeight: "400"
    },
    //手机密码view
    viewPhoneAndPw: {
        width: "100%",
        flexDirection: "row",
        height: unitWidth * 100,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#eaeaea"
    },

    //注册按钮view
    buttonRegister: {
        marginTop: unitWidth * 80,
        width: "100%",
        height: unitWidth * 80,
        backgroundColor: "#e5baf7",
        borderRadius: 5,
        alignItems: "center"
    },
    //验证码
    buttonSms: {
        marginLeft: unitWidth * 50
    }
});

@inject('loginStore')
@observer
export class ModalFogetPw extends Component {
    //获取store
    store = this.props.loginStore;
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',//注册手机号码
            smsCode: '', //验证码
            newPassword: '', //密码
            liked: false, //验证码获取状态
            count: 60, //计时
            c: "" //倒计时文字
        }
    }
    render() {
        return (
            <Modal
                isOpen={this.store.fogetPwStatus}
                onClosed={() => this.store.hiddenForgetPw()}
                swipeToClose={true}
                coverScreen={true}
            >
                <View style={{ flex: 1 }} >
                    <View style={styleFogetPw.fogetPw}>
                        <TouchableOpacity onPress={() => this.store.hiddenForgetPw()}>
                            <Image style={styleFogetPw.image} source={require('../../../res/guanbi.png')} />
                        </TouchableOpacity>
                        <Text style={styleFogetPw.textTitle} >忘记密码</Text>
                        <View style={styleFogetPw.viewInput}>
                            <View style={styleFogetPw.viewItemInput}>
                                <Text style={styleFogetPw.textPhoneAndPw}>手机号</Text>
                                <TextInput style={styleFogetPw.inputPhoneAndPw} placeholder="输入手机号码" keyboardType="number-pad" maxLength={11} onChangeText={(text) => this.state.phoneNumber = text} />
                            </View>
                            <View style={styleFogetPw.viewItemInput}>
                                <Text style={styleFogetPw.textPhoneAndPw}>验证码</Text>
                                <TextInput style={styleFogetPw.inputPhoneAndPw} placeholder="输入验证码" keyboardType="number-pad" maxLength={6} onChangeText={(text) => this.state.smsCode = text} />
                                <View >
                                    <Button title={this.state.liked == false ? "获取" : this.state.c} disabled={this.state.liked} onPress={() => this.getSmsCode()} />
                                </View>
                            </View>
                            <View style={styleFogetPw.viewItemInput}>
                                <Text style={styleFogetPw.textPhoneAndPw}>新密码</Text>
                                <TextInput style={styleFogetPw.inputPhoneAndPw} secureTextEntry={true} placeholder="输入新密码" maxLength={16} onChangeText={(text) => this.state.newPassword = text} />
                            </View>
                            <View style={styleFogetPw.buttonRegister}>
                                <Button onPress={() => this.confirm()} color="white" title="确认" />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    /* 倒计时 */
    timeSms = () => {
        let count = this.state.count
        let left = "";
        let right = "s";
        const timer = setInterval(() => {
            this.setState({
                count: (count--),
                liked: true,
                c: left + count + right
            }, () => {
                if (count === 0) {
                    clearInterval(timer);
                    this.setState({
                        liked: false,
                        count: 60
                    })
                }
            });
        }, 1000);
    }

    /* 获取验证码 */
    getSmsCode() {
        //验证输入
        if (verificationPhoneNumber(this.state.phoneNumber) == false) {
            Alert.alert("提示", "请输入正确的手机号码");
            return
        }
        //发送请求
        let data = { phoneNumber: this.state.phoneNumber };
        sendWs("smsCode_change_pw", data);
        //调用倒计时
        this.timeSms();
    }

    /* 验证输入是否合法 */
    inputValidation = () => {
        if (verificationPhoneNumber(this.state.phoneNumber) == false) {
            Alert.alert("提示", "请输入正确的手机号码");
            return;
        }
        if (verifcationSmsCode(this.state.smsCode) == false) {
            Alert.alert("提示", "验证码6位数字");
            return
        }
        if (verifcationPassword(this.state.newPassword) == false) {
            Alert.alert("提示", "密码格式错误。6-16位的密码")
            return;
        }
        return 1;
    }

    /* 忘记密码 */
    confirm = () => {
        //判断输入是否合法
        if (this.inputValidation()) {
            //设置登陆信息
            this.store.setLoginInfo(this.state.phoneNumber,this.state.newPassword);
            //发送请求
            let data = { phoneNumber: this.state.phoneNumber,newPassword:this.state.newPassword,smsCode:this.state.smsCode };
            sendWs("foget_password", data);
        }
    }
}

const styleFogetPw = StyleSheet.create({
    //图片
    fogetPw: {
        width: "88%",
        marginTop: 44,
        marginLeft: unitWidth * 40
    },
    image: {
        width: unitWidth * 40,
        height: unitWidth * 40
    },
    //标题
    textTitle: {
        marginTop: unitWidth * 150,
        fontSize: fontscale * 25,
        fontWeight: "500"
    },
    //3个输入框
    viewInput: {
        marginTop: unitWidth * 80,
        alignItems: "center"
    },
    //单个输入框
    viewItemInput: {
        width: "100%",
        flexDirection: "row",
        height: unitWidth * 100,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#eaeaea"
    },
    //文本手机号，密码
    textPhoneAndPw: {
        fontSize: fontscale * 18,
        fontWeight: "400"
    },
    //输入框手机号,密码
    inputPhoneAndPw: {
        width: "60%",
        marginLeft: unitWidth * 50,
        fontSize: fontscale * 18,
        fontWeight: "400"
    },
    inputPw: {
        width: "60%",
        marginLeft: unitWidth * 90,
        fontSize: fontscale * 18,
        fontWeight: "400"
    },
    inputSms: {
        width: "40%",
        marginLeft: unitWidth * 50,
        fontSize: fontscale * 18,
        fontWeight: "400"
    },
    //确认按钮view
    buttonRegister: {
        marginTop: unitWidth * 80,
        width: "100%",
        height: unitWidth * 80,
        backgroundColor: "#e5baf7",
        borderRadius: 5,
        alignItems: "center"
    },
})