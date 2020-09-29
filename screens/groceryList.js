import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {globalStyles} from '../styles/global';
import {CustomText} from '../customs/customText';
import Card from '../templates/card';
import CheckBox from 'react-native-check-box'

export default function GroceryList() {
    const [isChecked, setIsChecked] = useState(true);

    return (
        <ScrollView style={globalStyles.container}>
            <Card style={styles.groceryCard}>
                <CheckBox
                    style={styles.checkBox}
                    onClick={()=>{
                        setIsChecked(!isChecked);
                        // this.setState({
                        //     isChecked:!this.state.isChecked
                        // })
                    }}
                    isChecked={isChecked}
                    // leftText={"CheckBox"}
                    checkBoxColor="lightgray"
                    checkedCheckBoxColor="lightblue"
                />
                <CustomText>Test Item</CustomText>
            </Card>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    groceryItem: {
        fontWeight: "bold",
        fontSize: 18,
        // textAlign: "center",
    },
    groceryCard: {
        // marginHorizontal: 16,
        marginVertical: 16,
        flexDirection: "row",
        // justifyContent: "flex-start",
        alignItems: "center"
    },
    checkBox: {
        paddingRight: 15
    }
});