import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function BrowserHeader({navigation, title, onDownload}) {
    const openAddRecipe = () => {
        navigation.navigate("RecipeForm");
    }

    return (
        <View style={styles.header}>
            <View style={styles.headerTitle}>
                <Text style={styles.headerText}>{title}</Text>
            </View>
            <Text onPress={onDownload} style={styles.download}>Download</Text>
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
    download: {
        position: "absolute",
        right: 16
    },
    headerTitle: {
        flexDirection: "row"
    }
});