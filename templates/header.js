import React from 'react';
import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import {MaterialIcons, AntDesign} from '@expo/vector-icons';
import Browser from '../screens/browser';
import {globalStyles} from '../styles/global';
import {CustomText} from '../customs/customText';

export default function Header({navigation, title}) {
    const openMenu = () => {
        navigation.openDrawer();
    }

    const openAddRecipe = () => {
        navigation.navigate("RecipeForm");
    }

    return (
        <View style={[styles.header, globalStyles.headerFooterColor]}>
            <MaterialIcons name="menu" size={28} onPress={openMenu} style={[styles.icon, globalStyles.iconStyles]} />
            <View style={styles.headerTitle}>
                <CustomText style={styles.headerText}>{title}</CustomText>
            </View>
            <AntDesign name="plus" size={28} onPress={openAddRecipe} style={[styles.addIcon, globalStyles.iconStyles]} />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 20,
        letterSpacing: 1
    },
    icon: {
        left: 16,
    },
    addIcon: {
        right: 16,
    },
    headerTitle: {
        flexDirection: "row"
    }
});