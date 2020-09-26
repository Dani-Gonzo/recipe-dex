import React, { useContext } from 'react';
import {StyleSheet, View, Text, Image, Button, ScrollView} from 'react-native';
import Card from '../templates/card';
import {globalStyles} from '../styles/global';
import FlatButton from '../templates/button';
import { RecipeContext } from '../context/RecipeProvider';
import {CustomText} from '../customs/customText';

export default function RecipeDetails({route, navigation}) {
    const {name, prepTime, cookTime, totalTime, ingredients, directions, key} = route.params;
    const recipe = useContext(RecipeContext);

    return (
        <ScrollView style={globalStyles.container}>
            <Card>
                <CustomText style={styles.recipeTitle}>{name}</CustomText>
                <View style={styles.timeContainer}>
                    {prepTime ? <CustomText>Prep Time: {prepTime}</CustomText> : null}
                    {cookTime ? <CustomText>Cook Time: {cookTime}</CustomText> : null}
                    {totalTime ? <CustomText>Total Time: {totalTime}</CustomText> : null}
                </View>
                
                <View style={styles.stepContainer}>
                    <CustomText style={styles.subTitle}>Ingredients</CustomText>
                    {ingredients.map((ingredient) => {
                        return (
                            <CustomText>{`\u2022 ` + ingredient}</CustomText>
                        )
                    })}
                </View>
                <View style={styles.stepContainer}>
                    <CustomText style={styles.subTitle}>Directions</CustomText>
                    {directions.map((step) => {
                        return (
                            <CustomText style={styles.step}>{step}</CustomText>
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
        textAlign: "center",
        // color: "lightgray"
    },
    subTitle: {
        fontWeight: "bold",
        // fontSize: 16,
        // color: "lightgray"
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