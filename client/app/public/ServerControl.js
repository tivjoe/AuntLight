/* 导入每个页面的store */
import Store from './Store';
import NavigationService from './NavigationService';

/**
 * 将websocket接收的消息，通过各页面创建的mobx-store来传递
 * 在各自的mobx-store处理各自的业务
 * 返回的数据格式
 * @param array message{
 *            @param int action  请求的当前业务参数
 *            @param int status  请求结果状态
 *            @param array data  返回的数据（不是所有请求都返回data）
 * }
*/
export function ServerControl(message) {
    switch (message['action']) {
        case "login_token": //token登陆
            if (message['status'] = 1) {
                if (message['flag'] == "login") {
                    //首次打开app，自动登陆跳转到首页
                    NavigationService.navigate('App');
                }
            }
            break;
        case "login_account": //登陆
            Store.loginStore.WsLogin(message['status'], message['id'], message['token']);
            break;
        case "register_account": //注册
            Store.loginStore.WsRegister(message['status'], message['id'], message['token']);
            break;
        case "foget_password": //忘记密码
            Store.loginStore.WsFogetPw(message['status'], message['id'], message['token']);
            break;
        case "get_address": //获取用户地址列表
            Store.positionStore.WsAddress(message['status'], message['data']);
            Store.confimOrderStore.WsAddress(message['status'], message['data']);
            Store.myAddressStore.WsAddress(message['status'], message['data']);
            break;
        case "add_address": //添加地址
            Store.addSiteStore.WsAddSite(message['status']);
            break;
        case "get_seller_list": //获取商家列表
            Store.homeStore.WsUpdateShopList(message['status'], message['headurl'], message['data']);
            break;
        case "get_seller_good": //获取商品，分类列表
            Store.goodStore.WsUpdateInfo(message['status'], message['goods'], message['class']);
            break;
        case "get_user_information": //获取用户信息
            Store.myselfStore.WsInfo(message['status'], message['data']);
            break;
        case "get_seller_discuss": //获取商家评论
            Store.homeStore.WsUpdateDiscuss(message['status'], message['data']);
            break;
        case "get_like_seller_list": //获取收藏的商家
            Store.myLikeStore.WsLike(message['status'], message['data']);
            break;
        case "get_qiniu_upload_token": //上传凭证
            global.qiniuToken = message['token'];
            break;
        case "place_an_order": //下单
            Store.confimOrderStore.WsPlaceAnOrder(message['status']);
            break;
        case "get_history_order": //获取历史订单
            Store.myOrderStore.WsOrder(message['status'],message['flag'],message['data'],message['totalCount']);
            break;
        case "get_an_order_detail": //获取订单详情
            Store.myOrderDetailStore.WsGetGood(message['status'],message['data']);
            break;
    }
}