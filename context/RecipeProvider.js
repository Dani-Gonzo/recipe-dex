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
        if(!item) { throw "item is null or undefined"; }
        if(!item.key) { throw "Item is missing key"; }
        try {
            const jsonValue = JSON.stringify(item);
            await AsyncStorage.setItem(`recipe_${item.key}`, jsonValue);
            // debug
            const value = await AsyncStorage.getItem(`recipe_${item.key}`);
            console.log(`stored: ${value}`);
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
            console.log(values);
            let storedValues = values.map(value => {
                try{ return JSON.parse(value[1]); }
                catch(e) { 
                    value[1] = value[1].substring(0, value[1].lastIndexOf('}') + 1); 
                    const result = JSON.parse(value[1]);
                    AsyncStorage.setItem(value[0], value[1]).then(() => console.log(`fixed: ${value[0]}`));
                    return result;
                }
            });
            setRecipes(storedValues);
        } catch (e) {
            console.log(e);
        }
    }

    const removeData = async (objectKey) => {
        try {
            console.info(`Calling AsyncStorage.removeItem for [recipe_${objectKey}]`);
            await AsyncStorage.removeItem(`recipe_${objectKey}`);
            // await AsyncStorage.clear();
        } catch (e) {
            console.error('While removing', e);
        }
    }

    const addRecipe = (recipe, key) => {
        console.info(`Add/Edit recipe [${recipe.name}] with key [${key}]`);
        if (key) {
            // const recipeToStore = {...recipe, key};
            setRecipes((currentRecipes) => {
                const recipeIndex = currentRecipes.findIndex((r) => r.key === key);
                currentRecipes[recipeIndex] = {...currentRecipes[recipeIndex], ...recipe};
                storeData(currentRecipes[recipeIndex]);
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

    const removeRecipe = async (key) => {
        console.info(`Removing recipe with key [${key}]`);
        setRecipes((currentRecipes) => {
            const recipeIndex = currentRecipes.findIndex((r) => r.key === key);
            console.info(`Removing recipe from state at index [${recipeIndex}]`);
            if(recipeIndex > -1) {
                currentRecipes.splice(recipeIndex, 1);
            }
            return [...currentRecipes];
        });
        console.info(`Removing recipe from storage [${key}]`);
        await removeData(key);
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