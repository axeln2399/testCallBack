const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let movieSchema = new Schema({
    Title : {
        type: String,
        minlength: 2
    },
    Genre : {
        type: [String],
        enum: ['Thriller', 'Comedy', 'Action', 'Romance']
    },
    actors : {
        type: [String]
    },
    ratings : {
        type : Number,
        min : 1,
        max : 10
    }
}, {collection: 'KumpulanFilm'})

let Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie