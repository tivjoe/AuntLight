import React, { Component } from 'react';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { LoginStack,AppStack } from './public/Navigator';
import NavigationService from './public/NavigationService';
import { Provider } from 'mobx-react';
import Store from './public/Store';


const AppContainer = createAppContainer(createSwitchNavigator(
    {
        Login:LoginStack,
        App:AppStack
    },
    {
        initialRouteName:"Login"
    }
));

export default class App extends Component {
    render() {
        return (
            <Provider {...Store}>
                <AppContainer
                    ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
                />
            </Provider>
        )
    }
}