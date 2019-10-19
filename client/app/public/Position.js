import { init,Geolocation,stop,setLocatingWithReGeocode } from "react-native-amap-geolocation";
import Store from "../public/Store";

//初始化sdk
export async function geolocationInit() {
    //设置高德key
    await init({
        ios: "你的key",
    });
    //返回逆编码信息
    setLocatingWithReGeocode(true)
}

//获取地理位置，返回给homeStore
export function getPosition(){
    if(!this.watchId){
        this.watchId=Geolocation.watchPosition(position=>upDateLocation(position));
    }
}

//返回给homeStore
function upDateLocation(position){
    //经纬度，地址名不为空
    if(position['location'].poiName!=null&&position['location'].longitude&&position['location'].latitude){
        //停止持续定位
        stop()
        //结果返回给homeStore
        Store.homeStore.upDateLocatin(position['location'].poiName,position['location'].longitude,position['location'].latitude);
    }
}

/**
 * 
 * 搜索指定地点poi
 * @param {*} Text 
 */
export const selectCurrentPoi = (Text) => {
    return new Promise(function (resolve) {
        fetch("https://restapi.amap.com/v3/place/text?keywords=" + Text + "&city=0571&offset=20&page=1&extensions=all&key=你的key")
            .then((response) => {
                return response.json();
            })
            .then((responseText) => {
                resolve(responseText['pois']);
            })
            .catch((error) => {
                alert(error)
            })
    })
}

/**
 * 
 * 搜索当前地点poi
 * @param {*} text 
 */
export const selectNearPoi=(text)=>{
    return new Promise(function (resolve) {
        fetch("https://restapi.amap.com/v3/place/around?key=你的key="+text+"&radius=10000&types=120000")
            .then((response) => {
                return response.json();
            })
            .then((responseText) => {
                resolve(responseText['pois']);
                
            })
            .catch((error) => {
                alert(error)
            })
    })
}