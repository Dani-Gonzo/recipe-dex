import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {globalStyles} from '../styles/global';
import {CustomText} from '../customs/customText';
import Card from '../templates/card';
import Checkbox from '../customs/checkbox';
import CheckBox from 'react-native-check-box';
import { set } from 'react-native-reanimated';

export default function IngredientGroceryList({route}) {
    // const [isChecked, setIsChecked] = useState(false);
    const {ingredients} = route.params;
    // populate intial value
    let initialValues = {};
    for(var name of ingredients) { initialValues[name] = false }

    const [checkedItems, setCheckedItems] = useState(initialValues);

    // let ingredientsToAdd = [];

    // const checkboxes = [
    //     {
    //         name: 'check-box-1',
    //         key: 'checkBox1',
    //         label: 'Check Box 1',
    //     },
    //     {
    //         name: 'check-box-2',
    //         key: 'checkBox2',
    //         label: 'Check Box 2',
    //     }
    // ];

    const handleChange = (isChecked, name) => {
        // updating an object instead of a Map
        setCheckedItems({...checkedItems, [name] : isChecked });
    }

    // useEffect(() => {
    //     console.log("checkedItems: ", checkedItems);
    //   }, [checkedItems]); 

    // const addRemoveIngredient = (ingredient) => {
    //     if (isChecked == true) {
    //         ingredientsToAdd.push(ingredient);
    //         console.log(ingredientsToAdd);
    //     }
    // }

    return (
        <ScrollView style={globalStyles.container}>   
                {ingredients.map((ingredient) => {
                    // const isChecked = checkedItems.container(ingredient)
                    return (
                        <Card style={styles.groceryCard}>
                            {/* {
                                checkboxes.map(ingredient => {
                                    <Checkbox name={ingredient.name} 
                                        checked={checkedItems[ingredient.name]}
                                        onChange={handleChange}
                                    />
                                })
                            } */}
                            <CheckBox style={styles.checkBox}
                                isChecked={checkedItems[ingredient]}
                                onClick={() => {handleChange(!checkedItems[ingredient], ingredient);
                                // if(isChecked) {
                                //     setCheckedItems((oldValue) => oldValue.filter((i) => i !== ingredient))
                                // }
                                // else {
                                //     setCheckedItems((oldValue) => [...oldValue, ingredient])
                                // }
                                }}
                                checkBoxColor="lightgray"
                                checkedCheckBoxColor="lightblue"
                            />
                            <CustomText>{ingredient}</CustomText>
                        </Card>
                    )
                })}
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
        // marginVertical: 16,
        flexDirection: "row",
        // justifyContent: "flex-start",
        alignItems: "center"
    },
    checkBox: {
        paddingRight: 15
    }
});