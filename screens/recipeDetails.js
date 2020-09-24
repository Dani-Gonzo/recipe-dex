import React, { useContext } from 'react';
import {StyleSheet, View, Text, Image, Button, ScrollView} from 'react-native';
import Card from '../templates/card';
import {globalStyles} from '../styles/global';
import FlatButton from '../templates/button';
import { RecipeContext } from '../context/RecipeProvider';

export default function RecipeDetails({route, navigation}) {
    const {name, prepTime, cookTime, totalTime, ingredients, directions, key} = route.params;
    const recipe = useContext(RecipeContext);

    return (
        <ScrollView style={globalStyles.container}>
            <Card style={globalStyles.cardContent}>
                <Text style={styles.recipeTitle}>{name}</Text>
                <View style={styles.timeContainer}>
                    {prepTime ? <Text>Prep Time: {prepTime}</Text> : null}
                    {cookTime ? <Text>Cook Time: {cookTime}</Text> : null}
                    {totalTime ? <Text>Total Time: {totalTime}</Text> : null}
                </View>
                
                <View style={styles.stepContainer}>
                    <Text style={styles.subTitle}>Ingredients</Text>
                    {ingredients.map((ingredient) => {
                        return (
                            <Text>{`\u2022 ` + ingredient}</Text>
                        )
                    })}
                </View>
                <View style={styles.stepContainer}>
                    <Text style={styles.subTitle}>Directions</Text>
                    {directions.map((step) => {
                        return (
                            <Text style={styles.step}>{step}</Text>
                        )
                    })}
                </View>
            </Card>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    recipeTitle: {
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center"
    },
    subTitle: {
        fontWeight: "bold",
        fontSize: 14
    },
    stepContainer: {
        marginTop: 15
    },
    step: {
        marginTop: 5
    },
    timeContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        flexWrap: "wrap"
    }
});