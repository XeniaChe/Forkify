import Search from "./models/Search";
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';

import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import {elements, renderLoader, clearLoader, elementsSecond } from './views/base'; // from base.js





/* // STATE OF THE APP
 - SEARCH OBJECT;
 - CURRENT RECIPE OBJEST;
 - SHOPPING LIST OBJECT;
 - LIKED RECIPES;

*/

const state = {};
window.state= state;


/***
 * SEARCH CONTROLLER
 */
    const controlSearch = async () => {

    //1. get query from view
    const query = searchView.getInput(); 

    //2. new search object and  add state
    state.search = new Search(query);

    try {
        //3. prepare UI for result
        searchView.clearInput();
        searchView.clearList();
        renderLoader(elements.searchResult);
        
        //4. search for recipes 
        await state.search.getResult();

        //5. render result in UI
        clearLoader();
        searchView.renderResult(state.search.recipies);
        
    } catch (error) {
        alert(`Something when wrong`);
        searchView.clearList();
    }
};

elements.searchForm.addEventListener('submit', el => {
    el.preventDefault();
    controlSearch();
});



/** Small buttons */
elements.searchButtonPages.addEventListener('click', event =>{
    const btn = event.target.closest(`.btn-inline`);

    if (btn) {
        const goToPage = parseInt(btn.dataset.goto);
        searchView.clearList();
        searchView.renderResult(state.search.recipies, goToPage);
        
    }
})



/***
 * RECIPES CONTROLLER
 */

// const z =  async () => {
//     const r = new Recipe (47746);
//     await r.getRecipe();
//     r.calcTime();
//     console.log(r);
// }
// z();


const controlRecipe = async () => {

    //getting the ID from URL
    const id = window.location.hash.replace('#', '');

    if (id) {

        //1. Prepare UI for canges
        recipeView.clerRecipe();
        renderLoader(elements.recipe);

        //2. Create new recipe object
        state.recipe = new Recipe(id);

        //3. Hightlight the element
        if (state.search) searchView.highlightSelected(id);

        try {
            //3. Get the recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseTheIngredients();

            //4. Get the servings and time 
            state.recipe.calcTime();
            state.recipe.calcServings();

            //5.Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe, 
                state.likes.isLiked(id));
            

        } catch (error) {
            console.log(error)
            alert(` Error processing the recipe`)
        }
    }
};


['hashchange', 'load'].forEach( event => window.addEventListener(event, controlRecipe));


/**LIST 
 * CONTROLLER */

const controlList = () => {
    //1. create a list if there is no list 
    if (!state.list) state.list= new List();

    //2. add new ingredients to the list and UI
    state.recipe.ingredients.forEach(el => {
       const item =  state.list.addItem(el.count, el.unit, el.ingredient);
       listView.createList(item);
    });
};

// handle delete and update button 

elements.shopingList.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid; 

    //handle the delete event
    if (e.target.matches(`.shopping__delete, .shopping__delete *`)) {
        //delete item from data
        state.list.deleteItem(id);

        //delete item from UI
        listView.deleteList(id);

        //update count
    } else if (e.target.matches(`.shopping__count--value`)) {
        const val = parseFloat(e.target.value, 10);
        if ( val > 0) {
            state.list.updateCount(id, val);
        } else {
            alert (`stop!`)
        }};
});




/**
 *  LIKES CONTROLLER    
 */

const controlLikes = () =>{
        if (!state.likes) state.likes = new Likes();
        const curID = state.recipe.id;

        if ( !state.likes.isLiked(curID)) {
        // recipe has NOT been liked yet 
                //add recipe to the liked state
                const newLike =  state.likes.addLikes(
                    curID,
                    state.recipe.title,
                    state.recipe.author,
                    state.recipe.img
                );
                //toogle the button
                likesView.toogleButton(true);
    
                //add like to the UI list
                likesView.renderLikesList(newLike);
                // console.log (state.likes);
        } else {
        // recipe HAS been liked

                //remove recipe from the liked state
                state.likes.deleteLikes(curID);
                //toogle the button
                likesView.toogleButton(false);
                //add like to the UI list
                likesView.deleteLike(curID);
                // console.log (state.likes);
        };

        likesView.renderLikesPanel(state.likes.getNumLikes());
};

window.addEventListener( 'load', () => {

    // new likes object 
    state.likes = new Likes();
    
    //read the data from local storage
    state.likes.readStorage();
    
    //render likes panel as it was before reloading // toogle the button
    likesView.renderLikesPanel(state.likes.getNumLikes());
    
    //render the existing likes
    state.likes.likes.forEach( el => likesView.renderLikesList(el));
});
 



elements.recipe.addEventListener( 'click', ev => {

    if (ev.target.matches(`.btn-decrease,  .btn-decrease *`)) {
        // decrease the ingredients
        
        if (state.recipe.serving > 1) {
            state.recipe.updateServing('dec');
            recipeView.updateIngredient(state.recipe);
           }
    } else if (ev.target.matches(`.btn-increase,  .btn-increase *`)) {
        // inccrease the ingredients
        state.recipe.updateServing('inc');
        recipeView.updateIngredient(state.recipe);

    }else if (ev.target.matches(`.recipe__btn--add, .recipe__btn--add *`)) {
        controlList();
    } else if ( ev.target.matches(`.recipe__love, .recipe__love *`)) {
        controlLikes();
    };
    
});












