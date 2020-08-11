import React, {useContext} from 'react';
import {StyleSheet, Button, TextInput, View, Text, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {globalStyles} from '../styles/global';
import FlatButton from '../templates/button';
import { RecipeContext } from '../context/RecipeProvider';

export default function RecipeForm({navigation}) {
    const recipe = useContext(RecipeContext);
    const { control, handleSubmit, errors } = useForm();
    const onSubmit = (data, e) => {
        data.ingredients = data.ingredients.split(/, |\n|,/g);
        data.directions = data.directions.split(/, |\n|,/g);
        recipe.addRecipe(data);
        navigation.navigate("Home");
    }  

    return (
        <View style={globalStyles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.label}>Recipe Name</Text>
                    <Controller 
                        control={control}
                        render={({onChange, onBlur, value}) => (
                            <TextInput 
                                style={styles.input}
                                placeholder="Recipe name"
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="name"
                        defaultValue=""
                    />

                    <Text style={styles.label}>Ingredients</Text>
                    <Controller 
                        control={control}
                        render={({onChange, onBlur, value}) => (
                            <TextInput
                                multiline
                                style={styles.input}
                                placeholder="Ingredients"
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="ingredients"
                        defaultValue=""
                    />

                    <Text style={styles.label}>Directions</Text>
                    <Controller 
                        control={control}
                        render={({onChange, onBlur, value}) => (
                            <TextInput
                                multiline
                                style={styles.input}
                                placeholder="Directions"
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                        name="directions"
                        defaultValue=""
                    />
                    <FlatButton text="Submit" onPress={handleSubmit(onSubmit)} />
                </View>
            </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        color: 'white',
        marginLeft: 0,
        marginTop: 20,
        marginBottom: 5
    },
    input: {
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 4,
    },
    container: {
        flex: 1,
        alignItems: "center",
        width: "100%"
    },
    content: {
        width: "90%"
    }
});
  