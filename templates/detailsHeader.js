import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MaterialIcons, Ionicons} from '@expo/vector-icons';
import Browser from '../screens/browser';
import { RecipeContext } from '../context/RecipeProvider';
import { useNavigation } from '@react-navigation/native';
import {globalStyles} from '../styles/global';

export default function DetailsHeader({title, recipeParams}) {
    const {key} = recipeParams;
    const recipe = useContext(RecipeContext);
    const navigation = useNavigation();

    return (
        <View style={[styles.header, globalStyles.headerFooterColor]}>
            <Ionicons name="md-arrow-back" size={28} style={styles.backArrow} onPress={() => navigation.goBack()} />
            <View style={styles.headerTitle}>
                <Text style={styles.headerText}>{title}</Text>
            </View>
            <MaterialIcons name="edit" size={28} style={styles.editIcon} onPress={() => navigation.navigate ("RecipeForm", {key})} />
            <Ionicons name="md-trash" size={28} style={styles.deleteIcon} onPress={ async () => {
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
        color: "#333",
        letterSpacing: 1,
        color: "lightgray"
    },
    deleteIcon: {
        position: "absolute",
        right: 16,
        color: "lightgray"
    },
    editIcon: {
        position: "absolute",
        right: 50,
        color: "lightgray"
    },
    headerTitle: {
        flexDirection: "row"
    },
    backArrow: {
        position: "absolute",
        left: 16,
        color: "lightgray"
    }
});