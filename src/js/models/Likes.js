export default class Likes  {
    constructor () {
        this.likes = [];
    }

    addLikes (id, title, author, img) {
        const like = {
            id,
            title,
            author,
            img
        }
        this.likes.push(like);

        //persist data
        this.persistData();

        return like;
    }

    deleteLikes (id) {
        const index = this.likes.findIndex( el => el.id === id);
        this.likes.splice(index, 1);

        //persist data
        this.persistData();
    }

    isLiked (id) {
        return this.likes.findIndex( el => el.id === id) !==-1; // will return   TRUE if not equal to -1
    }

    getNumLikes() {
        return this.likes.length;
    }

    persistData () {
        localStorage.setItem('likesLocal', JSON.stringify(this.likes));  // set to the local storage as STRING
    }

    readStorage () {
        const storage = JSON.parse(localStorage.getItem('likesLocal'));  //restore back tho  ARRAY

        //restore the data 
        if (storage) this.likes = storage;
    }

};