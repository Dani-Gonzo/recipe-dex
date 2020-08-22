import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import BrowserHeader from '../templates/browserHeader';
const webScraper = require("../scraper/scraper").default;

export default function Browser({navigation}) {

    webview = null;

    const scraper = () => {
        // console.log(webScraper);
        const recipeScraper = webScraper;
        webview.injectJavaScript(recipeScraper);
    }

    const buildRecipe = (event) => {
        webData = event.nativeEvent.data;
        webData = JSON.parse(webData);
        data = {
            name: webData.name,
            prepTime: "webData.prepTime",
            cookTime: "webData.cookTime",
            ingredients: webData.ingredients,
            directions: webData.directions
        }
        console.log(event.nativeEvent.data);
        navigation.navigate("RecipeForm", {download: data});
    }

    return (
        <View style={styles.browserView}>
            <BrowserHeader title="Browser" navigation={navigation} onDownload={scraper} />
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