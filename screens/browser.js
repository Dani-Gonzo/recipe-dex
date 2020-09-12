import React, {Component, useState, useRef, useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import BrowserHeader from '../templates/browserHeader';
import BrowserFooter from '../templates/browserFooter';
import debounce from 'lodash.debounce';
const webScraper = require("../scraper/scraper").default;
let isReloading = false;

export default function Browser({navigation}) {
    const [url, setUrl] = useState("https://google.com");
    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoForward, setCanGoForward] = useState(false);

    const webviewRef = useRef(null);

    const scraper = () => {
        const recipeScraper = webScraper;
        console.log(recipeScraper);
        webviewRef.current.injectJavaScript(recipeScraper);
    }

    const buildRecipe = (event) => {
        webData = event.nativeEvent.data;
        webData = JSON.parse(webData);
        if(webData.reloading == true) {
            isReloading = true;
            return;
        }
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
        // console.log(newUrl);
    }

    const backButtonHandler = () => {
        if (webviewRef.current) {
            webviewRef.current.goBack();
        }
    }

    const forwardButtonHandler = () => {
        if (webviewRef.current) {
            webviewRef.current.goForward();
        }
    }

	const debouncedNavigationChange = useCallback(
		debounce(navState => {
            console.log(`loading: ${navState.loading}`);
            if(navState.loading) { return; }

            setCanGoBack(navState.canGoBack);
            setCanGoForward(navState.canGoForward);
            const newUrl = navState.url;
            // if(/google\.com\/amp\/s\//.test(navState.url)) {
            //     newUrl = 'https://' + navState.url.match(/google\.com\/amp\/s\/(.+)\.amp$/)[1];
            //     console.log(`Replaced Browser Url: ${newUrl}`);
            // }
            console.log(`New Browser Url: ${newUrl}`);
            setUrl(newUrl);

            console.log(`scrapeOnLoad is ${isReloading}`);
            if(isReloading) {
                isReloading = false;
                scraper();
            }
            }, 250),
		[], // will be created only once initially
	);

    return (
        <View style={styles.browserView}>
            <BrowserHeader title="Browser" navigation={navigation} submitUrl={submitUrl} currentUrl={url} />
            <WebView 
                source={{uri: url}}
                ref={webviewRef}
                onMessage={(event) => buildRecipe(event)}
                onNavigationStateChange={ debouncedNavigationChange }
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