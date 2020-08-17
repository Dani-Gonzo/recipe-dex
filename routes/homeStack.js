import React, {useState} from 'react';
import Text from 'react-native';
// import {Text} from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import RecipeList from '../screens/recipeList';
import RecipeList from '../screens/recipeList';
import RecipeDetails from '../screens/recipeDetails';
import RecipeForm from '../screens/recipeForm';
import Header from '../templates/header';

const Stack = createStackNavigator();

export default HomeNavigator = ({navigation}) => (
    <Stack.Navigator 
        initialRouteName="Home"
        headerMode="screen"
        screenOptions={{
            headerStyle: {
                backgroundColor: "#eee",
                height: 80
            },
            headerTintColor: "#444"
        }}
        >
        <Stack.Screen 
            name="Home"
            component={RecipeList}
            options={{
                header: () => <Header navigation={navigation} title="RecipeDex" />
            }}
        />
        <Stack.Screen 
            name="RecipeDetails"
            component={RecipeDetails}
            options={{
                title: "Recipe Details"
            }}
        />
        <Stack.Screen 
            name="RecipeForm"
            component={RecipeForm}
            options={{
                title: "Add Recipe"
            }}
        />
    </Stack.Navigator>
);