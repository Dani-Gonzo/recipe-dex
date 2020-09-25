import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {globalStyles} from '../styles/global';

export default function BrowserFooter({onDownload, backButtonHandler, forwardButtonHandler}) {

    return (
        <View style={[styles.footer, globalStyles.headerFooterColor]}>
            <Ionicons name="md-arrow-back" size={28} style={styles.backArrow} onPress={backButtonHandler} />
            <Ionicons name="md-arrow-forward" size={28} style={styles.forwardArrow} onPress={forwardButtonHandler} />
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
        justifyContent: "center",
    },
    backArrow: {
        position: "absolute",
        left: 16,
        color: "lightgray"
    },
    forwardArrow: {
        position: "absolute",
        left: 70,
        color: "lightgray"
    },
    download: {
        position: "absolute",
        right: 16,
        color: "lightgray"
    }
});