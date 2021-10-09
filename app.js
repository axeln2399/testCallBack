const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

const Movie = require('./Model/Movie');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

var mongoDB = 'mongodb://localhost:27017/Day7Fusion';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//GET
app.get('/movies', (req,res) => {

    let obj = req.query;

    // console.log("====================== ini cek req.query ======================");
    // console.log(Object.keys(obj).length === 0);
    // //kl => http://localhost:3000/movies/               => {} berarti balikin objek
    //kl => http://localhost:3000/movies/?Genre=Action  => { Genre: 'Action' } 
    // //kl => http://localhost:3000/movies/?ratings=10    => { ratings: '10' }

    // Movie.find(obj)
    // .then (data => {
    //     res.status(200).send(data)
    // })
    // .catch (err => {
    //     res.status(400).send(err)
    // })

    var print = Movie.find({});
    res.status(200).send(print)

});

//POST
app.post('/movies', (req,res) => {
    // console.log(req.body) //=> bentuknya objek body dari postman
    let dataBaru = 
    {
        Title: req.body.Title, //masukin 1 char salah
        Genre: req.body.Genre, //masukin enum yang salah gamau ke input datanya
        actors: req.body.actors, 
        ratings:req.body.ratings //masukin 0, 11, 10.1 tidak bisa
    };

    Movie.create(dataBaru)
    .then((saved) => {
        // console.log(saved);
        // console.log(saved.id);
        res.status(202).send(`ID ${saved._id} Berhasil Di Tambahkan`)
    })
    .catch((err) => {
        res.status(400).send(`Format Anda Salah`); // Failure
    })

});

//DELETE
app.delete('/movies/:id', (req, res) => {
    let idYangMauDiHapus = req.params.id;
    Movie.remove({ _id: idYangMauDiHapus })
    .then(() => {
        res.status(202).send(`Data ${idYangMauDiHapus} Deleted`); // Success
    }).catch(err => {
        res.status(400).send(`Data ${idYangMauDiHapus} Tidak Ada`); // Failure
    });
})

//Update
app.put('/movies/:id', (req,res) => {
    let idYangMauDiUbah = req.params.id;
    let dataYangMauDiUbah = req.body
    Movie.findOneAndUpdate({ _id : idYangMauDiUbah}, dataYangMauDiUbah)     
    .then(() => {
        // console.log('Data Berhasil Di Ubah');
        res.status(202).send(`Data ${idYangMauDiUbah} Updated`); // Success
    }).catch(err => {
        // console.log('Data Tidak Berhasil Di Ubah');
        res.status(400).send(`Data ${idYangMauDiUbah} Tidak Ada`); // Failure
    });
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});

/*
buat insert
{
    "Title": "Shrek", 
    "Genre": ["Comedy", "Action", "Romance"], 
    "actors": ["Shrek", "Donkey"], 
    "ratings": 10
}

contoh hasil 
{
    "_id": "61610610b4fbf991e952de8f",
    "Title": "Shrek 2",
    "Genre": [
        "Comedy",
        "Action",
        "Romance"
    ],
    "actors": [
        "Shrek",
        "Donkey"
    ],
    "ratings": 10,
    "__v": 0
}

contoh body update
{
     "actors": ["Shrek", "Donkey", "Fiona"]
}

*/
