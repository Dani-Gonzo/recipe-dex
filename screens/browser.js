import React, {Component, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import BrowserHeader from '../templates/browserHeader';
const webScraper = require("../scraper/scraper").default;

export default function Browser({navigation}) {
    const [url, setUrl] = useState("https://google.com");

    webview = null;

    const scraper = () => {
        const recipeScraper = webScraper;
        webview.injectJavaScript(recipeScraper);
    }

    const buildRecipe = (event) => {
        webData = event.nativeEvent.data;
        webData = JSON.parse(webData);
        data = {
            name: webData.name,
            prepTime: webData.times.prepTime,
            cookTime: webData.times.cookTime,
            totalTime: webData.times.totalTime,
            ingredients: webData.ingredients,
            directions: webData.directions
        }
        console.log(event.nativeEvent.data);
        navigation.navigate("RecipeForm", {download: data});
    }

    const submitUrl = (newUrl) => {
        newUrl = "https://" + newUrl
        setUrl(newUrl);
        console.log(newUrl);
    }

    return (
        <View style={styles.browserView}>
            <BrowserHeader title="Browser" navigation={navigation} onDownload={scraper} submitUrl={submitUrl} currentUrl={url} />
            <WebView 
                source={{uri: url}}
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