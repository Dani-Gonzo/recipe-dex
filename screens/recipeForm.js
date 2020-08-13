import React, {useContext} from 'react';
import {StyleSheet, Button, TextInput, View, Text, TouchableWithoutFeedback, Keyboard, ScrollView} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {globalStyles} from '../styles/global';
import FlatButton from '../templates/button';
import { RecipeContext } from '../context/RecipeProvider';

export default function RecipeForm({navigation, route}) {
    const {key} = route.params || {};
    const recipe = useContext(RecipeContext);
    const thisRecipe = key ? {...(recipe.getRecipe(key))} : {};
    if (key) {
        thisRecipe.ingredients = thisRecipe.ingredients.join('\n');
        thisRecipe.directions = thisRecipe.directions.join('\n');
    }

    const { control, handleSubmit, errors } = useForm({ defaultValues: thisRecipe});
    const onSubmit = (data, e) => {
        data.ingredients = data.ingredients.split(/, |\n|,/g);
        data.directions = data.directions.split(/\n/g);
        recipe.addRecipe(data, key);
        navigation.navigate("Home");
    }

    return (
        <View style={globalStyles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
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

                            <Text style={styles.label}>Prep Time</Text>
                            <Controller 
                                control={control}
                                render={({onChange, onBlur, value}) => (
                                    <TextInput 
                                        style={styles.input}
                                        placeholder="Prep time"
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )}
                                name="prepTime"
                                defaultValue=""
                            />

                            <Text style={styles.label}>Cook Time</Text>
                            <Controller 
                                control={control}
                                render={({onChange, onBlur, value}) => (
                                    <TextInput 
                                        style={styles.input}
                                        placeholder="Cook time"
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )}
                                name="cookTime"
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
                </ScrollView>
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
  