import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import BrowserHeader from '../templates/browserHeader';
import { openBrowserAsync } from 'expo-web-browser';

export default function Browser({navigation}) {
    return (
        <View style={styles.browserView}>
            <BrowserHeader title="Browser" navigation={navigation}/>
            <WebView 
                source={{uri: "https://google.com"}}
            />      
        </View>
    );
}

const styles = StyleSheet.create({
    browserView: {
        flex: 1
    }
});