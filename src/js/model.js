import {API_URL, PAGE_SIZE} from './config.js';
import {async} from 'regenerator-runtime/runtime';
import {getJSON} from './helper.js';
export const state = {
    recipe  : {},
    search : {
        query : '',
        result : [],
        pageSize : PAGE_SIZE,
        pageNumber : 1
    }
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
        throw error;
    }
}

export const loadSearchResult = async function (query){
    try{
        const data = await getJSON(`${API_URL}?search=${query}`);
        state.search.query = query;
        state.search.result = data.data.recipes.map(recipe =>{
            return{
                id: recipe.id,
                image:recipe.image_url,
                publisher : recipe.publisher,
                title: recipe.title,
            }
        });
        //console.log(state.search)
         
    }catch(err){
        throw err;
    }
}

export const getPagination = function (page= state.search.pageNumber){
    state.search.pageNumber = page;
    const start = (page - 1) * state.search.pageSize;
    const end = page * state.search.pageSize;
    return state.search.result.slice(start, end)
}
