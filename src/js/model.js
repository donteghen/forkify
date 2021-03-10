import { async } from 'regenerator-runtime';
import {API_URL, PAGE_SIZE} from './config.js';
import {getJSON, sendJSON} from './helper.js';
export const state = {
    recipe  : {},
    search : {
        query : '',
        result : [],
        pageSize : PAGE_SIZE,
        pageNumber : 1
    }, 
    bookmarks : [],
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
   if(state.bookmarks.some(bookmark => bookmark.id === id)){
    state.recipe.bookmarked = true;
   }
   else{
    state.recipe.bookmarked = false;
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

export const getPagination = function (page = state.search.pageNumber){
    state.search.pageNumber = page;
    const start = (page - 1) * state.search.pageSize;
    const end = page * state.search.pageSize;
    return state.search.result.slice(start, end)
}

export const updateServings = function (newServings){
    console.log(state.recipe.ingredients)
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = ing.quantity * newServings/state.recipe.servings
    });

    state.recipe.servings = newServings;
}

export const addBookmark = function (recipe){
    // add to bookmark array
    state.bookmarks.push(recipe);
    persistBookmarks() // persist in local storage
    // mark curent recipe as bookmarked
    if(recipe.id === state.recipe.id){
        state.recipe.bookmarked = true
    }
}
export const deleteBookmark = function (id){
    const index = state.bookmarks.find(bookmark => bookmark.id === id);
    state.bookmarks.splice(index, 1);
    persistBookmarks() // persist in local storage
    // mark curent recipe as not bookmarked
    if(id === state.recipe.id){
        state.recipe.bookmarked = false
    }
}

const persistBookmarks = function (){
    localStorage.setItem('Bookmarks', JSON.stringify(state.bookmarks))
}

const initLocalstorage = function(){
    const storage = localStorage.getItem('Bookmarks');
    if(storage) {
        state.bookmarks = JSON.parse(storage)
    }
}
initLocalstorage();

export const uploadRecipe = async function (newRecipe) {
    try {
        const ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith('ingredient') &&
        entry[1] !== '').map(ing => {
           const ingArr = ing[1].replaceAll(' ', '').split(',');
            console.log(ingArr)
            if(ingArr.length !== 3) throw new Error('Wrong input format. Please follow correct format :)')
            const [quantity, unit, description] = ingArr;
            return {quantity:quantity? Number.parseInt(quantity): null, unit, description}
     });
    const recipe ={
        title: newRecipe.title,
        source_url: newRecipe.sourceUrl,
        publisher:newRecipe.publisher,
        image_url: newRecipe.image,
        cooking_time : Number.parseInt(newRecipe.cookingTime),
        servings: Number.parseInt(newRecipe.servings),
        ingredients
    }
    const data = await sendJSON(API_URL, recipe)
    console.log(data)
    } 
    catch (error) {
        throw error
    }
}