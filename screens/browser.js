import React, {Component, useState, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import BrowserHeader from '../templates/browserHeader';
import BrowserFooter from '../templates/browserFooter';
const webScraper = require("../scraper/scraper").default;

export default function Browser({navigation}) {
    const [url, setUrl] = useState("https://google.com");
    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoForward, setCanGoForward] = useState(false);

    const webviewRef = useRef(null);

    const scraper = () => {
        const recipeScraper = webScraper;
        webviewRef.current.injectJavaScript(recipeScraper);
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

    const backButtonHandler = () => {
        if (webviewRef.current) {
            console.log("backPressed");
            webviewRef.current.goBack();
        }
    }

    const forwardButtonHandler = () => {
        if (webviewRef.current) {
            console.log("forwardPressed");
            webviewRef.current.goForward();
        }
    }

    return (
        <View style={styles.browserView}>
            <BrowserHeader title="Browser" navigation={navigation} submitUrl={submitUrl} currentUrl={url} />
            <WebView 
                source={{uri: url}}
                ref={webviewRef}
                onMessage={(event) => buildRecipe(event)}
                onNavigationStateChange={navState => {
                    setCanGoBack(navState.canGoBack);
                    setCanGoForward(navState.canGoForward);
                    setUrl(navState.url);
                }}
            />   
            <BrowserFooter onDownload={scraper} navigation={navigation} backButtonHandler={backButtonHandler} forwardButtonHandler={forwardButtonHandler} />   
        </View>
    );
}

const styles = StyleSheet.create({
    browserView: {
        flex: 1
    }
});