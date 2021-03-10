import * as model from './model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js'
import addRecipeView from './views/addRecipeView'

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
   bookmarkView.render(model.state.bookmarks)
   // re-render resulr view to activate css class (active) selection
  resultView.renderUpdate(model.getPagination())
  bookmarkView.renderUpdate(model.state.bookmarks)

  await model.loadRecipe(id);
  recipeView.render(model.state.recipe);
 }catch(error){ 
   //alert(error);
   recipeView.renderError() 
 }
}

const searchController = async function (){
  try {
    model.state.search.pageNumber = 1;
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
const paginationController = function (pageNum){
  // render new result
  resultView.render(model.getPagination(pageNum));
    // render new pagination immidiately after
    paginationView.render(model.state.search)

}

const servingsController = function (update){
  //update the servings
  model.updateServings(update);
  // re-render recipe view
  //recipeView.render(model.state.recipe);
  recipeView.renderUpdate(model.state.recipe)
}
export const bookmarkController = function (){
  if(!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe)
  }
  else if(model.state.recipe.bookmarked){
    model.deleteBookmark(model.state.recipe.id)
  }
  
  recipeView.renderUpdate(model.state.recipe);
  bookmarkView.render(model.state.bookmarks)
}

const addNewRecipeController = async function (newRecipe){
 try {
  await model.uploadRecipe(newRecipe)
 } catch (error) {
   console.log(error)
   addRecipeView.renderError(error)
 }
}

const init = function(){
  recipeView.addHandlerRender(recipeController);
  searchView.addHandlerSearch(searchController);
  paginationView.addHandlerClick(paginationController);
  recipeView.addHandlerUpdateServings(servingsController);
  recipeView.addHandlerBookmark(bookmarkController);
  addRecipeView.addHandlerUpload(addNewRecipeController);
}
init();