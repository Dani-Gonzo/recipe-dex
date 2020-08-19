import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import BrowserHeader from '../templates/browserHeader';

export default function Browser({navigation}) {

    webview = null;

    const scrapper = () => {
        const alert = 'window.ReactNativeWebView.postMessage("thing");';
        webview.injectJavaScript(alert);
    }

    const buildRecipe = (event) => {
        // webData = event.nativeEvent.data;
        data = {
            name: "webData.name",
            prepTime: "webData.prepTime",
            cookTime: "webData.cookTime",
            ingredients: "webData.ingredients",
            directions: "webData.directions"
        }
        console.log(event.nativeEvent.data);
        navigation.navigate("RecipeForm", {download: data});
    }

    return (
        <View style={styles.browserView}>
            <BrowserHeader title="Browser" navigation={navigation} onDownload={scrapper} />
            <WebView 
                source={{uri: "https://google.com"}}
                ref={ref => (webview = ref)}
                onMessage={(event) => buildRecipe(event)}
            />      
        </View>
    );
}

const styles = StyleSheet.create({
    browserView: {
        flex: 1
    }
});