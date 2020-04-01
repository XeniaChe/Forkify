import { elements } from './base'; // from base.js 

export const getInput = () => elements.searchInput.value; // will  automaticaly return this result. No need in {result }

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearList = () => {
    elements.searchResList.innerHTML=' ';
};

const limitTitleText = ( title, limit = 17) => {
    const newTitle = [];
    if (title.lenght > limit) {
        title.split(' ').reduce((accumulator, cur) =>{
            if (accumulator + cur.lenght < limit) {
                newTitle.push(cur);
            }
            return accumulator + cur.lenght;
        }, 0);

        return `${newTitle.join(' ')} ...`;
    };
    return title;
 
};

const renderRecipe = recipe => {  // for  one recipe
    const markUp = `
            <li>
                <a class="results__link results__link--active" href="#${recipe.recipe_id}">
                    <figure class="results__fig">
                        <img src="${recipe.image_url}" alt="Test">
                    </figure>
                    <div class="results__data">
                        <h4 class="results__name"> ${limitTitleText(recipe.title)}</h4>
                        <p class="results__author">${recipe.publisher}</p>
                    </div>
                </a>
            </li>`;

    elements.searchResList.insertAdjacentHTML('beforeend', markUp);

};

export const renderResult = recipies =>   // for each one recipe
    recipies.forEach(el => renderRecipe(el));