import React, {useContext} from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import Card from '../templates/card';
import {globalStyles} from '../styles/global';
import { RecipeContext } from '../context/RecipeProvider';

export default function RecipeList({navigation}) {
    const recipe = useContext(RecipeContext);

    return (
        <View style={globalStyles.container}>
            <FlatList 
                data={recipe.recipes}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => navigation.navigate("RecipeDetails", item)}>
                        <Card>
                            <Text>{item.name}</Text>
                        </Card>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}