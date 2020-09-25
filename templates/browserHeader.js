import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {globalStyles} from '../styles/global';

export default function BrowserHeader({navigation, title, onDownload, submitUrl, currentUrl}) {
    const [url, setUrl] = useState("https://google.com");
    const [cursorSelect, setCursorSelect] = useState({selection: {start: 0, end: 0}});
    
    let inputRef = null;

    useEffect(() => {
        setUrl(currentUrl);
        SelectionChange();
    }, [currentUrl]);

    const openMenu = () => {
        navigation.openDrawer();
    }

    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

    const onSubmit = () => {
        if (urlRegex.test(url)) {
            submitUrl(url);
        } else {
            let encodedUrl = encodeURIComponent(url);
            const goto = `google.com/search?q=${encodedUrl}`;
            setUrl(goto);
            console.log(goto);
            submitUrl(goto);
        }
    }

    const SelectionChange = () => inputRef.setNativeProps({
        selection: {
            start: 0,
            end: 0
        }
    })

    return (
        <View style={[styles.header, globalStyles.headerFooterColor]}>
            <MaterialIcons name="menu" size={28} onPress={openMenu} style={styles.icon} />
            <View style={styles.headerTitle}>
                <TextInput 
                    ref={ref => (inputRef = ref)}
                    style={styles.addressBar}
                    onChangeText={(text) => setUrl(text)}
                    onSubmitEditing={onSubmit}
                    value={url}
                    selection={cursorSelect}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    addressBar: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        width: "90%",
        padding: 10,
        backgroundColor: "lightgray"
    },
    header: {
        width: "100%",
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#333",
        letterSpacing: 1
    },
    icon: {
        position: "absolute",
        left: 16,
        color: "lightgray"
    },
    headerTitle: {
        flexDirection: "row",
        marginLeft: 20
    }
});