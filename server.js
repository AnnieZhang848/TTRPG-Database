const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');
const config = require('./config.js');
let Game = require("./models/gameModel");

const PORT = process.env.PORT || 8000;

app.locals.games = require('./data/games.json');

const router = require("./router.js");

let db;
app.locals.db = db;

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req,_,next)=> {
    console.log(`${req.method}: ${req.url}`);
    next();
});

app.use("/", router);
app.use(express.static("public"));

//Start the connection to the database
mongoose.connect(config.db.host, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default Mongoose connection (can then be shared across multiple files)
db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  //We're connected
  console.log("Connected to the database...");

  // Intialize the types collection in the database by using the data in the file: comm-fridge-types.json
  Game.find({}, function (err, result){
    if (err){console.log(err);}
    else{
      if(result.length === 0){
        console.log("Intializing the games collection...");
        Game.insertMany(app.locals.games, function(err, result){
          if(err){
            console.log(err);
            return;
          }
        });
      }
    }
  });
});

// terminates a connection to the database when the node application finishes
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

app.listen(8000);
console.log("Server running at http://localhost:8000");

// run the server: node server.js
// if you make a change to your server code, you must restart the server
