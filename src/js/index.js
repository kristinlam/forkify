import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/* Global state of the app
- Search object
- Current recipe object
- Shopping list object
- Liked recipes
*/
const state = {};

/*
Search Controller
*/

const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput();
    
    // If there is a query, create a new search object
    if (query) {
        // 2) Create new search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    } 
}

// What happens when you submit the search
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});



/*
Recipe Controller
*/

const controlRecipe = async () => {
    // Get ID from url
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
        // Prepare the UI for changes 

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data
            await state.recipe.getRecipe();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe
            console.log(state.recipe);
        } catch (err) {
            alert('Error processing recipe.');
        }

    }
}


// Everytime the hash in the URL changes, run controlRecipe
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
