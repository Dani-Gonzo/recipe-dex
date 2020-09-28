import React from 'react';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import GroceryList from '../screens/groceryList';
import Header from '../templates/header';

const Stack = createStackNavigator();

export default GroceryNavigator = ({navigation}) => (
    <Stack.Navigator 
        initialRouteName="GroceryList"
        screenOptions={{
            headerStyle: {
                backgroundColor: "#555",
                height: 60,
            },
            headerTintColor: "lightgray",
            // headerTitleStyle: {
            //     fontWeight: "bold"
            // }
        }}>
        <Stack.Screen 
            name="GroceryList"
            component={GroceryList}
            options={{
                header: () => <Header navigation={navigation} title="Grocery List" />
            }}
        />
    </Stack.Navigator>
);