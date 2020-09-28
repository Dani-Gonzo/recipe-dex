import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import HomeNavigator from './homeStack';
import GroceryNavigator from './groceryStack';
import Browser from '../screens/browser';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
    <Drawer.Navigator 
        initialRouteName="Home" 
        drawerStyle={{
            backgroundColor: "#555"
        }}
        drawerContentOptions={{
            labelStyle: {
                color: "lightgray",
                fontSize: 16
            }
        }}
    >
        <Drawer.Screen name="Recipes" component={HomeNavigator} />
        <Drawer.Screen name="Browser" component={Browser} />
        <Drawer.Screen name="Grocery List" component={GroceryNavigator} />
    </Drawer.Navigator>
);

export default () => (
    <NavigationContainer>
        <DrawerNavigator />
    </NavigationContainer>
)