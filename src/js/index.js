// https://forkify-api.herokuapp.com/api/search
/*
import axios from 'axios';

async function getResult(query) {
    const res = await axios (`https://forkify-api.herokuapp.com/api/search?q=${query}`);
    console.log(res);
    
};

getResult('beetroot');
*/

async function getResult(query) {
    try {
        const res = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${query}`);
    const data = await res.json();
    const recipies = data.recipes;
    console.log(recipies);
    console.log(recipies[0].recipe_id)
    } catch (error) {
        alert(error)
    }
    
}

getResult('beetroot')