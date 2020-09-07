import React from 'react';
import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import {MaterialIcons, AntDesign} from '@expo/vector-icons';
import Browser from '../screens/browser';

export default function Header({navigation, title}) {
    const openMenu = () => {
        navigation.openDrawer();
    }

    const openAddRecipe = () => {
        navigation.navigate("RecipeForm");
    }

    return (
        <View style={styles.header}>
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
        height: 70,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#333",
        letterSpacing: 1
    },
    icon: {
        position: "absolute",
        left: 16
    },
    addIcon: {
        position: "absolute",
        right: 16
    },
    browserIcon: {
        position: "absolute",
        right: 50
    },
    headerTitle: {
        flexDirection: "row"
    }
});