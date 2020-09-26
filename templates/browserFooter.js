import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {globalStyles} from '../styles/global';
import {CustomText} from '../customs/customText';

export default function BrowserFooter({onDownload, backButtonHandler, forwardButtonHandler}) {

    return (
        <View style={[styles.footer, globalStyles.headerFooterColor]}>
            <Ionicons name="md-arrow-back" size={28} style={[styles.backArrow, globalStyles.iconStyles]} onPress={backButtonHandler} />
            <Ionicons name="md-arrow-forward" size={28} style={[styles.forwardArrow, globalStyles.iconStyles]} onPress={forwardButtonHandler} />
            <CustomText onPress={onDownload} style={styles.download}>Download</CustomText>
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
        left: 16,
    },
    forwardArrow: {
        left: 70,
    },
    download: {
        position: "absolute",
        right: 16,
    }
});