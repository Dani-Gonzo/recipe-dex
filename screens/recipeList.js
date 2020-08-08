import React, {useState} from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import Card from '../templates/card';
import {globalStyles} from '../styles/global';

export default function RecipeList({navigation}) {
    const [recipes, setRecipes] = useState([
        {
            name: "Veggie Stir Fry", 
            ingredients: ["2 bell peppers", "1 onion"], 
            directions: ["1. Mix shoyu, sherry, brown sugar, cornstarch, sriracha, and ginger. Set aside.", "2. Heat oil in a large skillet over medium-high heat."], 
            key: "1"
        },
        {
            name: "Curry", 
            ingredients: ["Chicken thigh", "1 bell pepper"], 
            directions: ["1. Thinly slice the onions and fry them in 2tbsp of oil in a pot until translucid.", "2. Add the curry powder, 1tbsp of oil and the meat. Fry a little more."], 
            key: "2"
        }
    ]);

    return (
        <View style={globalStyles.container}>
            <FlatList 
                data={recipes}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => navigation.navigate("RecipeDetails", item)}>
                        <Card>
                            <Text>{item.name}</Text>
                        </Card>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    test: {
        flex: 1,
        backgroundColor: "#555"
    }
});