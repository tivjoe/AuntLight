/* 网络操作封装 */
import { ServerControl } from './ServerControl';
import { Alert } from 'react-native';
import {WXTip} from 'react-native-wxtip';



let ws = null;
let setIntervalPing = null;
/* 建立连接 */
export function createSocket() {
    if (ws == null) {
        console.log(1)
        ws = new WebSocket("ws://服务器地址:端口"); //如：127.0.0.1：8282
        ws.onopen = onopenWs;
        ws.onmessage = onmessageWs;
        ws.onclose = oncloseWs;
    } else {
        console.log("已经存在一个连接")
    }
}

/* 心跳包 */
function sendPing() {
    //每30秒发送一次心跳
    setIntervalPing = setInterval(() => {
        ws.send("ping");
    }, 30000)
}

/* 登陆 */
function login() {
    console.log()
    if (global.userId != "" && global.loginToken != "") {
        //短线重连
        const data = { flag: "reconnect", id: global.sellerId, token: global.loginToken };
        sendWs("login_token", data);
    } else {
        //刚打开app
        storage.load({ key: 'sellerInfo', })
            .then(ret => {
                //如果有，只能再then内处理
                //首次打开app，自动登陆
                const data = { flag: "login", id: ret.id, token: ret.token };
                sendWs("login_token", data);
                global.sellerId=ret.id;
                global.loginToken=ret.token;
            })
            .catch(err => {
                //如果没有找到数据且没有sync方法，
                //或者有其他异常，则在catch中返回
                //用户第一次登陆
            });
    }
}

/* 打开ws之后发送心跳包 */
function onopenWs() {
    login();
    sendPing();//发送心跳包
}

/* 重新连接 */
function reconnect() {
    //每2秒重新连接一次
    setTimeout(() => {
        createSocket();
    }, 2000)
}

/* 连接断开 */
function oncloseWs() {
    //断开当前连接
    ws.close();
    //清楚心跳定时器
    clearInterval(setIntervalPing);
    //重置当前连接
    ws = null;
    //重新连接
    reconnect();
}

/* 发送消息 */
export function sendWs(action, data) {
    //将需要请求数据格式化
    let message = {
        client: "seller",
        action: action,
        data: data
    }
    if (ws == null) { //网络故障
        Alert.alert("请检查网络连接");
    } else if (ws.readyState === 1) { //连接成功可以通信
        ws.send(JSON.stringify(message))
        WXTip.showLoading();
        setTimeout(() => {
            WXTip.dismissLoading();
        }, 5000)
    } else if (ws.readyState === 0) { //正在连接中
        //3秒后再发送请求
        setTimeout(() => {
            ws.send(JSON.stringify(message))
        }, 3000)
    } else { //网络故障
        Alert.alert("请检查网络连接");
    }
}

/* 接受消息 */
function onmessageWs(e) {
    //通过分发业务控制路由来处理接收的消息
    WXTip.dismissLoading();
    ServerControl(JSON.parse(e.data));
}