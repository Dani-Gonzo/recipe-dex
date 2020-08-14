import React, { useState } from 'react';

const RecipeContext = React.createContext();

const RecipeProvider = (props) => {
    const [recipes, setRecipes] = useState([
        {
            name: "Veggie Stir Fry",
            prepTime: "30min",
            cookTime: "30min",
            ingredients: ["2 bell peppers", "1 onion"], 
            directions: ["1. Mix shoyu, sherry, brown sugar, cornstarch, sriracha, and ginger. Set aside.", "2. Heat oil in a large skillet over medium-high heat."], 
            key: "1"
        },
        {
            name: "Curry",
            prepTime: "1 hour",
            cookTime: "30min",
            ingredients: ["Chicken thigh", "1 bell pepper"], 
            directions: ["1. Thinly slice the onions and fry them in 2tbsp of oil in a pot until translucid.", "2. Add the curry powder, 1tbsp of oil and the meat. Fry a little more."], 
            key: "2"
        }
    ]);

    const addRecipe = (recipe, key) => {
        if (key) {
            setRecipes((currentRecipes) => {
                const recipeIndex = currentRecipes.findIndex((r) => r.key === key);
                currentRecipes[recipeIndex] = {...currentRecipes[recipeIndex], ...recipe};
                return [...currentRecipes];
                // Below does same as above
                // return currentRecipes.map((r) => r.key == key ? {...r, ...recipe} : r);
            });
        } else {
            recipe.key = (recipes.length + 1).toString();
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
        })
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
                getRecipe
            }}
        >
            {props.children}
        </RecipeContext.Provider>
    )
}

export { RecipeProvider, RecipeContext };