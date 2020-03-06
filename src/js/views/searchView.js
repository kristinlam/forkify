import { elements } from './base';

// one line arrow function = implicit return
export const getInput = () => elements.searchInput.value;

// Function: Clear search bar after submitting
export const clearInput = () => {
    elements.searchInput.value ='';
}

// Function: Prints one recipe
const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${recipe.title}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;

    elements.searchResList.insertAdjacentHTML('beforeend', markup);
}

// Loops through each recipe result
export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
};