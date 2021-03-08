import * as model from './model.js'
import recipeView from './views/recipeView.js'
//import icons from '../img/icons.svg' // parcel1
import 'core-js/stable'; //  **************** for polyfilling everything else 
import 'regenerator-runtime/runtime';  // * **for polyfilling async / await


//const recipeContainer = document.querySelector('.recipe');
const eventCollection = ['load', 'hashchange'];


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const recipeController =  async function (){
  
 try{
   const id = window.location.hash.slice(1);
   if(!id) return;
   recipeView.renderSinner();
  await model.loadRecipe(id);
  recipeView.render(model.state.recipe);
 }catch(error){
   alert(error)
   return
 }
}
eventCollection.forEach(ev => window.addEventListener(ev, recipeController))
