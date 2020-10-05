import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import uuidv4 from 'uuid/v4';

const IngredientGroceryContext = React.createContext();

const IngredientGroceryProvider = (props) => {
    const [groceryItems, setGroceryItems] = useState([]);

    const addItems = () => {
        
    }

    return (
        <IngredientGroceryContext.Provider
            value={{
                groceryItems
            }}
        >
            {props.children}
        </IngredientGroceryContext.Provider>
    )
}

export { IngredientGroceryProvider, IngredientGroceryContext };