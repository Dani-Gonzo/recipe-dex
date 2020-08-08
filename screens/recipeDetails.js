import React from 'react';
import {StyleSheet, View, Text, Image, Button} from 'react-native';
import Card from '../templates/card';
import {globalStyles} from '../styles/global';

export default function RecipeDetails({route, navigation}) {
    const {name, ingredients, directions} = route.params;

    return (
        <View style={globalStyles.container}>
            <Card>
                <Text style={styles.recipeTitle}>{name}</Text>
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