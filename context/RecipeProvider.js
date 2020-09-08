import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import uuidv4 from 'uuid/v4';

const RecipeContext = React.createContext();

const RecipeProvider = (props) => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getMultiData();
    }, []);

    const storeData = async (item) => {
        try {
            const jsonValue = JSON.stringify(item);
            await AsyncStorage.setItem(`recipe_${item.key}`, jsonValue);
            console.log(item.key);
        } catch (e) {
            console.log(e);
        }
    }

    const getMultiData = async () => {
        let values;
        let storageKeys;
        try {
            storageKeys = await AsyncStorage.getAllKeys();
            values = await AsyncStorage.multiGet(storageKeys);
            let storedValues = values.map(value => JSON.parse(value[1]));
            setRecipes(storedValues);
        } catch (e) {
            console.log(e);
        }
    }

    const removeData = async (objectKey) => {
        try {
            await AsyncStorage.removeItem(`recipe_${objectKey}`);
            // await AsyncStorage.clear();
        } catch (e) {
            console.log(e);
        }
    }

    const addRecipe = (recipe, key) => {
        if (key) {
            setRecipes((currentRecipes) => {
                const recipeIndex = currentRecipes.findIndex((r) => r.key === key);
                currentRecipes[recipeIndex] = {...currentRecipes[recipeIndex], ...recipe};
                storeData(recipe);
                return [...currentRecipes];
                // Below does same as above
                // return currentRecipes.map((r) => r.key == key ? {...r, ...recipe} : r);
            });
        } else {
            recipe.key = uuidv4();
            storeData(recipe);
            setRecipes((currentRecipes) => {
                return [...currentRecipes, recipe]
            });
        }
    }

    const removeRecipe = (key) => {
        setRecipes((currentRecipes) => {
            const recipeIndex = currentRecipes.findIndex((r) => r.key === key);
            currentRecipes.splice(recipeIndex, 1);
            return [...currentRecipes];
        });
        removeData(key);
    }

    const getRecipe = (key) => {
        const recipeIndex = recipes.findIndex((r) => r.key === key);
        return recipes[recipeIndex];
    }

    return (
        <RecipeContext.Provider
            value={{
                recipes,
                addRecipe,
                removeRecipe,
                getRecipe,
                removeData
            }}
        >
            {props.children}
        </RecipeContext.Provider>
    )
}

export { RecipeProvider, RecipeContext };