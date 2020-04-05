

export default class Recipe {
    constructor(id) {
        this.id = id
    }

    async getRecipe () {
        try {
            const res =await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`)
            const data = await res.json();
            this.title = data.recipe.title;
            this.author = data.recipe.publisher;
            this.img = data.recipe.image_url;
            this.url = data.recipe.source_url;
            this.ingredients = data.recipe.ingredients;
        } catch (error) {
            alert(` Something went wrong`)
        }
    }

    calcTime() {
        // const ing = this.ingredients.length;
        const numTimes = this.ingredients.length / 3;
        this.time = numTimes * 15;
    }

    calcServings () {
        this.serving = 4;
    }

    parseTheIngredients () {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];

        const newIngredients = this.ingredients.map(el => {
            // 1) Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            // 2) Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3) Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

            let objIng;
            if (unitIndex > -1) {
                // There is a unit
                // Ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
                // Ex. 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex);
                
                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                };

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };

            } else if (parseInt(arrIng[0], 10)) {
                // There is NO unit, but 1st element is number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                };
            } else if (unitIndex === -1) {
                // There is NO unit and NO number in 1st position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                };
            };

            return objIng;
        });
        this.ingredients = newIngredients;
    };
    
    updateServing (type) {
        // serving
        const newServing  = type === 'inc' ? this.serving + 1 : this.serving - 1;
        this.ingredients.forEach( ing => {
            ing.count *= (newServing / this.serving); //  ing.count =  ing.count * newServing/ this.ingredients
            // ing.count =Math.round(ing.count*(newServing / this.serving)); //  ing.count =  ing.count * newServing/ this.ingredients
        });

        // ingredient
        this.serving = newServing;
    };
    
};