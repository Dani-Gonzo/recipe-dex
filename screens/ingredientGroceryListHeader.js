import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MaterialIcons, Ionicons} from '@expo/vector-icons';
import Browser from '../screens/browser';
import { RecipeContext } from '../context/RecipeProvider';
import { useNavigation } from '@react-navigation/native';
import {globalStyles} from '../styles/global';
import {CustomText} from '../customs/customText';

export default function IngredientGroceryListHeader({title, navigation, recipeParams}) {
    // const {key} = recipeParams;
    // const recipe = useContext(RecipeContext);
    // const navigation = useNavigation();

    const saveIngredientsToGrocery = () => {
        
    }

    return (
        <View style={[styles.header, globalStyles.headerFooterColor]}>
            <Ionicons name="md-arrow-back" size={28} style={[styles.backArrow, globalStyles.iconStyles]} onPress={() => navigation.goBack()} />
            <CustomText style={styles.headerText}>{title}</CustomText>
            {/* <View style={styles.headerTitle}>
                <CustomText style={styles.headerText}>{title}</CustomText>
            </View> */}
            <CustomText style={styles.rightAlignSave}>SAVE</CustomText>
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
    headerTitle: {
        flexDirection: "row"
    },
    rightAlignSave: {
        position: "absolute",
        right: 16
    },
    backArrow: {
        left: 16,
    }
});