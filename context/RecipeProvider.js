import React, { useState } from 'react';

const RecipeContext = React.createContext();

const RecipeProvider = (props) => {
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

    const addRecipe = (recipe) => {
        recipe.key = Math.random().toString();
        setRecipes((currentRecipes) => {
            return [recipe, ...currentRecipes]
        });
    }

    return (
        <RecipeContext.Provider
            value={{
                recipes,
                addRecipe
            }}
        >
            {props.children}
        </RecipeContext.Provider>
    )
}

export { RecipeProvider, RecipeContext };