import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default function BrowserFooter({onDownload, navigation}) {
    
    const backHandler = () => {

    }

    return (
        <View style={styles.footer}>
            <Ionicons name="md-arrow-back" size={28} style={styles.backArrow} />
            <Ionicons name="md-arrow-forward" size={28} style={styles.forwardArrow} />
            <Text onPress={onDownload} style={styles.download}>Download</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        width: "100%",
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    backArrow: {
        position: "absolute",
        left: 16
    },
    forwardArrow: {
        position: "absolute",
        left: 70
    },
    download: {
        position: "absolute",
        right: 16
    }
});