import React from 'react';
import {StyleSheet, View, Text, Image, Button} from 'react-native';
import Card from '../templates/card';
import {globalStyles} from '../styles/global';
import FlatButton from '../templates/button';

export default function RecipeDetails({route, navigation}) {
    const {name, prepTime, cookTime, ingredients, directions, key} = route.params;

    return (
        <View style={globalStyles.container}>
            <Card>
                <Text style={styles.recipeTitle}>{name}</Text>
                <Text>Prep Time: {prepTime}</Text>
                <Text>Cook Time: {cookTime}</Text>
                {ingredients.map((ingredient) => {
                    return (
                        <Text>{`\u2022 ` + ingredient}</Text>
                    )
                })}
                <View style={styles.stepContainer}>
                    {directions.map((step) => {
                        return (
                            <Text style={styles.step}>{step}</Text>
                        )
                    })}
                </View>
                <FlatButton text="Edit" onPress={() => navigation.navigate("RecipeForm", key)} />
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    recipeTitle: {
        fontWeight: "bold",
        textAlign: "center"
    },
    stepContainer: {
        marginTop: 15
    },
    step: {
        marginTop: 5
    }
});