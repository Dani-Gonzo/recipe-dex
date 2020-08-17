import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import HomeNavigator from './homeStack';
import AboutNavigator from './aboutStack';
import Browser from '../screens/browser';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
    <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeNavigator} />
        <Drawer.Screen name="About" component={AboutNavigator} />
        <Drawer.Screen name="Browser" component={Browser} />
    </Drawer.Navigator>
);

export default () => (
    <NavigationContainer>
        <DrawerNavigator />
    </NavigationContainer>
)