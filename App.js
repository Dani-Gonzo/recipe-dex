import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RecipeList from './screens/recipeList';
import HomeNavigator from './routes/homeStack';
import DrawerNavigator from './routes/drawer';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {globalStyles} from './styles/global';
import { RecipeProvider } from './context/RecipeProvider';

export default function App() {
  return (
    <View style={globalStyles.container}>
      <RecipeProvider>
        <DrawerNavigator />
      </RecipeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  test: {
    flex: 1,
    backgroundColor: "red"
  }
});