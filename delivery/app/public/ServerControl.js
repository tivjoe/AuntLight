import NavigationService from './NavigationService';
import Store from './Store';
/**
 * 将websocket接收的消息，通过各页面创建的mobx-store来传递
 * 在各自的mobx-store处理各自的业务
 * 返回的数据格式
 * @param array message{
 *            @param string action  请求的当前业务参数
 *            @param string status  请求结果状态
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
        case "get_information": //获取商家信息
            Store.homeStore.WsGetInfo(message['status'],message['data']);
            Store.myselfStore.WsGetInformation(message['status'], message['data']);
            break;
        case "get_all_readying_order": //获取全部备餐列表
            Store.homeStore.WsGetReadyingOrder(message['status'],message['data']);
            break;
        case "get_all_running_order": //获取全部配送中列表
            Store.homeStore.WsGetRunningOrder(message['status'],message['data']);
            break;
        case "now_get_new_order": //现在推送一个新到订单
            Store.homeStore.WsNowGetNewOrder(message['status'],message['orderid']);
            break;
        case "get_an_order_detail": //获取一个订单详情
            Store.homeStore.WsGetAnOrderDetail(message['status'],message['data']);
            break;
        case "update_isget": //修改接单状态
            Store.homeStore.WsUpdateIsget(message['status'],message['data']);
            break;
        case "delivery_get_goods": //配送员取到商品
            Store.homeStore.WsDeliveryGetGoods(message['status'],message['order_id']);
            break;
        case "delivery_order_done": //配送员送达
            Store.homeStore.WsDeliveryForOrderDone(message['status'],message['order_id']);
            break;
        case "get_history_order": //获取历史订单
            Store.myOrderStore.WsOrder(message['status'],message['flag'],message['data'],message['totalCount'])
    }
}