import React, {useContext} from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import Card from '../templates/card';
import {globalStyles} from '../styles/global';
import { RecipeContext } from '../context/RecipeProvider';
import {CustomText} from '../customs/customText';

export default function RecipeList({navigation}) {
    const recipe = useContext(RecipeContext);

    return (
        <View style={globalStyles.container}>
            <FlatList 
                data={recipe.recipes}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => navigation.navigate("RecipeDetails", item)}>
                        <Card>
                            <CustomText style={styles.cardTitle}>{item.name}</CustomText>
                        </Card>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    cardTitle: {
        fontSize: 18,
        fontWeight: "600",
        // color: "#f2f2f2"
    }
});