import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MaterialIcons, Ionicons} from '@expo/vector-icons';
import Browser from '../screens/browser';
import { RecipeContext } from '../context/RecipeProvider';
import { useNavigation } from '@react-navigation/native';
import {globalStyles} from '../styles/global';
import {CustomText} from '../customs/customText';
import { FontAwesome } from '@expo/vector-icons'; 

export default function DetailsHeader({title, recipeParams}) {
    const {key, ingredients} = recipeParams;
    const recipe = useContext(RecipeContext);
    const navigation = useNavigation();

    return (
        <View style={[styles.header, globalStyles.headerFooterColor]}>
            <Ionicons name="md-arrow-back" size={28} style={[styles.backArrow, globalStyles.iconStyles]} onPress={() => navigation.goBack()} />
            {/* <View style={styles.headerTitle}>
                <CustomText style={styles.headerText}>{title}</CustomText>
            </View> */}
            <FontAwesome name="shopping-basket" size={22} style={[styles.groceryIcon, globalStyles.iconStyles]} onPress={() => navigation.navigate("IngredientGroceryList", {ingredients})} />
            <MaterialIcons name="edit" size={28} style={[styles.editIcon, globalStyles.iconStyles]} onPress={() => navigation.navigate("RecipeForm", {key})} />
            <Ionicons name="md-trash" size={28} style={[styles.deleteIcon, globalStyles.iconStyles]} onPress={ async () => {
                navigation.navigate("Home");
                await recipe.removeRecipe(key);
            }} />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 20,
        letterSpacing: 1,
    },
    deleteIcon: {
        right: 20,
    },
    editIcon: {
        right: 60,
    },
    groceryIcon: {
        right: 110
    },
    headerTitle: {
        flexDirection: "row"
    },
    backArrow: {
        left: 16,
    }
});