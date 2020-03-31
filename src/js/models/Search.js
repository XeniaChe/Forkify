// https://forkify-api.herokuapp.com/api/search
/*
import axios from 'axios';

async function getResult(query) {
    const res = await axios (`https://forkify-api.herokuapp.com/api/search?q=${query}`);
    console.log(res);
    
};

getResult('beetroot');
*/

export default  class Serach {
    constructor(query) {
        this.query = query;

    }
    async  getResult() {
        try {
         const res = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
        const data = await res.json();
        this.recipies = data.recipes;
        console.log(this.recipies);
        } catch (error) {
            alert(error)
        }
        
    }
    
    // getResult(); 
}



