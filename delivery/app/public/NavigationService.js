import { NavigationActions } from 'react-navigation';

/**
 * 统一实现页面跳转接口
 * 不需要通过prop来传递navigator来跳转页面
 */

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function back(routeName) {
  _navigator.dispatch(
    NavigationActions.back()
  )
}

export default {
  navigate,
  setTopLevelNavigator,
  back,
};