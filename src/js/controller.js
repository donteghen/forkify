import * as model from './model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView';

//import icons from '../img/icons.svg' // parcel1
import 'core-js/stable'; //  **************** for polyfilling everything else 
import 'regenerator-runtime/runtime';  // * **for polyfilling async / await

// if(module.hot){
//   module.hot.accept();
// }



//const recipeContainer = document.querySelector('.recipe');
//const eventCollection = ['load', 'hashchange'];


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const recipeController =  async function (){
  
 try{
   const id = window.location.hash.slice(1);
   if(!id) return;
   recipeView.renderSpinner();
  await model.loadRecipe(id);
  recipeView.render(model.state.recipe);
 }catch(error){ 
   //alert(error);
   recipeView.renderError()
 }
}

const searchController = async function (){
  try {
    
    const query = searchView.getQuery()
    if(!query) return
    resultView.renderSpinner()
     await model.loadSearchResult(query)
    resultView.render(model.getPagination());
    // render pagination immidiately after
    paginationView.render(model.state.search)
    
  } catch (error) {
    recipeView.renderError()
  }
}


const init = function(){
  recipeView.addHandlerRender(recipeController);
  searchView.addHandlerSearch(searchController)
}
init();