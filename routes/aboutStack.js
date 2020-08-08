import React from 'react';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import About from '../screens/about';
import Header from '../templates/header';

const Stack = createStackNavigator();

export default AboutNavigator = ({navigation}) => (
    <Stack.Navigator 
        initialRouteName="About"
        screenOptions={{
            headerStyle: {
                backgroundColor: "#eee"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: "bold"
            }
        }}>
        <Stack.Screen 
            name="About"
            component={About}
            options={{
                header: () => <Header navigation={navigation} title="About" />
            }}
        />
    </Stack.Navigator>
);