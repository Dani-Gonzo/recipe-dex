import React from 'react';
import {StyleSheet, Button, TextInput, View, Text} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {globalStyles} from '../styles/global';

export default function RecipeForm() {
    const { control, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <View style={globalStyles.container}>
            <Text>Recipe Name</Text>
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
                name="recipeName"
                defaultValue=""
            />


            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        color: 'white',
        margin: 20,
        marginLeft: 0,
    },
    button: {
        marginTop: 40,
        color: 'white',
        height: 40,
        backgroundColor: '#ec5990',
        borderRadius: 4,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 8,
        backgroundColor: '#0e101c',
    },
    input: {
        backgroundColor: 'white',
        height: 40,
        padding: 10,
        borderRadius: 4,
    },
});
  