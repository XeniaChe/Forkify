import Search from "./models/Search";
import * as searchView from './views/searchView';
import {elements} from './views/base'; // from base.js


/* // STATE OF THE APP
 - SEARCH OBJECT;
 - CURRENT RECIPE OBJEST;
 - SHOPPING LIST OBJECT;
 - LIKED RECIPES;

*/

const state = {};

const controlSearch = async () => {
    //1. get query from view
    const query = (searchView.getInput());   // TO-DO 

    //2. new search object and  add state
    state.search = new Search(query);

    //3. prepare UI for result
    searchView.clearInput();
    searchView.clearList();
    
    //4. search for recipes 
    await state.search.getResult();

    //5. render result in UI
    searchView.renderResult(state.search.recipies);
};

elements.searchForm.addEventListener('submit', el => {
    el.preventDefault();
    controlSearch();
})


