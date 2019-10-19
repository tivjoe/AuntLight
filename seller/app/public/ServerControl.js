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
        case "apply_join": //申请入驻
            Store.loginStore.WsApplyJoin(message['status']);
            break;
        case "foget_password": //忘记密码
            Store.loginStore.WsFogetPw(message['status'], message['id'], message['token']);
            break;
        case "get_information": //获取商家信息
            Store.myselfStore.WsGetInformation(message['status'], message['data']);
            Store.homeStore.WsGetInfo(message['status'], message['data']);
            break;
        case "update_information": //更新我的信息
            Store.myInformationStore.WsUpdateInfo(message['status']);
            break;
        case "get_qiniu_upload_token": //上传凭证
            global.qiniuToken = message['token'];
            break;
        case "get_class": //获取全部分类
            Store.goodControlStore.WsGetClass(message['class']);
            break;
        case "get_goods": //获取指定分类下的所有商品
            Store.goodControlStore.WsGetGoods(message['class'], message['goods']);
            break;
        case "add_class": //添加一个分类
            Store.goodControlStore.WsAddClass(message['status'], message['data']);
            break;
        case "update_class": //修改分类名
            Store.goodControlStore.WsChangeClass(message['status'], message['data']);
            break;
        case "delete_class": //删除分类
            Store.goodControlStore.WsdDeleteClass(message['status'], message['data']);
            break;
        case "add_good": //添加商品
            Store.addGoodStore.WsAddGood(message['status']);
            break;
        case "delete_good": //删除一个商品
            Store.changeGoodStore.WsDeleteGood(message['status']);
            break;
        case "update_good": //修改一个商品
            Store.changeGoodStore.WsUpdateGood(message['status']);
            break;
        case "get_all_goods_class": //获取全部分类和商品
            Store.previewShopStore.WsUpdateInfo(message['status'], message['goods'], message['class']);
            break;
        case "get_all_readying_order": //获取全部等待备餐订单列表
            Store.homeStore.WsGetReadyingOrder(message['status'], message['data']);
            break;
        case "get_all_running_order"://获取全部配送中订单列表
            Store.homeStore.WsGetRunningOrder(message['status'], message['data']);
            break;
        case "now_get_new_order": //现在有一个新的订单号推送进来
            Store.homeStore.WsNowGetNewOrder(message['status'], message['orderid']);
            break;
        case "get_an_order_detail": //获取这个新的订单的具体信息
            if (message['flag'] == "home") {
                Store.homeStore.WsGetAnOrderDetail(message['status'], message['data']);
            } else {
                Store.myOrderDetailStore.WsGetGood(message['status'], message['data']);
            }
            break;
        case "update_isget": //修改营业状态
            Store.homeStore.WsUpdateIsget(message['status'], message['data']);
            break;
        case "get_history_order": //获取历史订单
            Store.myOrderStore.WsOrder(message['status'], message['flag'], message['data'], message['totalCount']);
            break;
    }
}