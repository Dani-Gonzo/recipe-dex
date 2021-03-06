import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function Card(props) {
    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                {props.children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        // borderRadius: 6,
        // elevation: 3,
        borderBottomWidth: 1,
        borderColor: "lightgray",
        // backgroundColor: "#545454",
        // shadowOffset: {width: 1, height: 1},
        // shadowColor: "#333",
        // shadowOpacity: 0.3,
        // shadowRadius: 2,
        // marginHorizontal: 10,
        // marginVertical: 6
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 22,
    }
});