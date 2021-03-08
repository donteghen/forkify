import {API_URL} from './config.js';
import {async} from 'regenerator-runtime/runtime';
import {getJSON} from './helper.js';
export const state = {
    recipe  : {}
}

export const loadRecipe = async  function (id){
        try{
            const url = API_URL + `${id}`;
            const data = await getJSON(url)
    
    let {recipe} = data.data;
    state.recipe = {
        cookingTime: recipe.cooking_time,
        id: recipe.id,
        image:recipe.image_url,
        ingredients : recipe.ingredients,
        publisher : recipe.publisher,
        title: recipe.title,
        servings : recipe.servings,
        sourceUrl: recipe.source_url
  }
    }catch(error){
        console.error(error)
    }
}