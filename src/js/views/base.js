export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResList: document.querySelector('.results__list'),
    searchResult: document.querySelector('.results'),
    searchButtonPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shopingList: document.querySelector('.shopping__list'),
    likesMenu: document.querySelector(`.likes`),
    likesList: document.querySelector(`.likes__list`),
};

export  const elementsSecond = {
    loader: 'loader',
    btn: '.btn-inline'
};

export const renderLoader = parent => {
    const loader = `
        <div class="${elementsSecond.loader}">
            <svg> 
            <use href="img/icons.svg#icon-cw"></use>
            </svg> 
         </div>
    `;

    parent.insertAdjacentHTML('afterbegin', loader); 
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementsSecond.loader}`);

    loader.parentElement.removeChild(loader);
}
