import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {globalStyles} from '../styles/global';
import {CustomText} from '../customs/customText';
import Card from '../templates/card';

export default function GroceryList() {
    return (
        <ScrollView style={globalStyles.container}>
            <Card style={styles.groceryCard}>
                <CustomText>Test Item</CustomText>
            </Card>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    groceryItem: {
        fontWeight: "bold",
        fontSize: 18,
        // textAlign: "center",
    },
    groceryCard: {
        // marginHorizontal: 16,
        marginVertical: 16
    }
});