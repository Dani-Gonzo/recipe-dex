import React from 'react';
import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import {MaterialIcons, AntDesign} from '@expo/vector-icons';
import Browser from '../screens/browser';
import {globalStyles} from '../styles/global';

export default function Header({navigation, title}) {
    const openMenu = () => {
        navigation.openDrawer();
    }

    const openAddRecipe = () => {
        navigation.navigate("RecipeForm");
    }

    return (
        <View style={[styles.header, globalStyles.headerFooterColor]}>
            <MaterialIcons name="menu" size={28} onPress={openMenu} style={styles.icon} />
            <View style={styles.headerTitle}>
                <Text style={styles.headerText}>{title}</Text>
            </View>
            <AntDesign name="plus" size={28} onPress={openAddRecipe} style={styles.addIcon} />
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
        color: "lightgray",
        letterSpacing: 1
    },
    icon: {
        position: "absolute",
        left: 16,
        color: "lightgray"
    },
    addIcon: {
        position: "absolute",
        right: 16,
        color: "lightgray"
    },
    browserIcon: {
        position: "absolute",
        right: 50
    },
    headerTitle: {
        flexDirection: "row"
    }
});