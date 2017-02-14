var express     = require('express');
var router      = express.Router();
var app = require ('../app');
var bodyParser  = require("body-parser"); // body-parser extract data from the <form> and add it to the body property in the request object.
var mongo       = require('mongodb').MongoClient;
var objectID    = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/perso';



module.exports = router;

/**
 * When the hompage is called, refresh the local and external weather
 */
router.get('/', function(req, res, next){
    res.render('index', {title: "My Thermometer"}); //update display
});

router.post('/train', function(req, res){
    mongo.connect(url, function(err, db){
        var test = new Date();
        test.setMinutes(test.getMinutes() + 10);
        db.collection("users").update({username: req.user.username}, {$set: {strength: req.user.strength +10, nextDateTrain: test}} );
        console.log("new strength: " + req.user.strength + " for player : " + req.user.username + req.user.nextDateTrain);

        res.redirect('/train');
    });
});



router.get('/train', function(req, res){
    res.render('train');
});



