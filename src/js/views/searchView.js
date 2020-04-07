import { elements } from './base'; // from base.js 

export const getInput = () => elements.searchInput.value; // will  automaticaly return this result. No need in {result }

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearList = () => {
    elements.searchResList.innerHTML=' ';
    elements.searchButtonPages.innerHTML = ' ';
};

export const highlightSelected = id => {
    const arrResult = Array.from(document.querySelectorAll('.results__link'));
    arrResult.forEach( el => {
        el.classList.remove(`results__link--active`);
    });
    document.querySelector(`.results__link[href*="${id}"]`).classList.add(`results__link--active`);
};

export const limitTitleText = ( title, limit = 17) => {
    const newTitle = [];
    if (title.lenght > limit) {
        title.split(' ').reduce((accumulator, cur) =>{
            if (accumulator + cur.lenght < limit) {
                newTitle.push(cur);
            }
            return accumulator + cur.lenght;
        }, 0);

        return `${newTitle.join(' ')} ...`;
    }
    return title;
 
};

const renderRecipe = recipe => {  // for  one recipe
    const markUp = `
            <li>
                <a class="results__link results__link" href="#${recipe.recipe_id}">
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

const createButton = (page, type) => 
    `<button class="btn-inline results__btn--${type}" data-goto=${type=== 'prev' ? page-1 : page+1}>
        <span>Page ${type=== 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'} "></use>
        </svg>
    </button>
    `;
    

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    let button;
    if (page === 1 && pages > 1) {
        // Only button to go to next page
        button = createButton(page, 'next');
    } else if (page < pages) {
        // Both buttons
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        // Only button to go to prev page
        button = createButton(page, 'prev');
    }

    elements.searchButtonPages.insertAdjacentHTML('afterbegin', button);
}; 


export const renderResult = (recipies, page = 1, maxResPerPage = 10) =>{   // for each one recipe
    // render the results
    const start= (page - 1)* maxResPerPage ;
    const end = page * maxResPerPage ;
    recipies.slice(start, end).forEach(el => renderRecipe(el));

    //render the pagination button
    renderButtons(page, recipies.length, maxResPerPage );
};


