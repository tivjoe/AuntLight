import {LoginStore} from '../pages/login/store';
import {HomeStore} from '../pages/home/store';
import {MyselfStore} from '../pages/myself/store';
import {MyInformationStore} from '../pages/myInformation/store';
import {MyOrderStore} from '../pages/myOrder/store';


/**
 * 将每个页面的store包含在内
 * 让provider传入每一个页面
 */
const Store={
    loginStore:new LoginStore(), //登陆 
    homeStore:new HomeStore(), // 首页
    myselfStore:new MyselfStore(), //我的
    myInformationStore:new MyInformationStore(),//我的信息
    myOrderStore:new MyOrderStore(), //我到订单页面
}

export default Store;