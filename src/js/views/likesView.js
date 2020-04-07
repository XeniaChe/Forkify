
import {elements} from './base';
import {limitTitleText} from './searchView';


export const toogleButton = isLiked => {
    const newSVG = isLiked ? `icon-heart` : `icon-heart-outlined`;
    //img/icons.svg#icon-heart-outlined
    document.querySelector( `.recipe__love use`).setAttribute(`href`, `img/icons.svg#${newSVG}`);
};

export const renderLikesPanel= numOfLikes => {
    elements.likesMenu.style.visibility = numOfLikes > 0 ? `visible` : `hidden`; 
};

export const renderLikesList = (like) => {
    const markUp = `
        <li>
            <a class="likes__link" href="#${like.id}">
                <figure class="likes__fig">
                    <img src="${like.img}" alt="${like.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitTitleText(like.title)}...</h4>
                    <p class="likes__author">${like.author}</p>
                </div>
            </a>
        </li>
    `;

    elements.likesList.insertAdjacentHTML('beforeend', markUp);
};

export const deleteLike = (id) => {
    const el = document.querySelector(`.likes__link[href="#${id}"]`);
    if (el) {
        el.parentElement.removeChild(el);
    }
};

