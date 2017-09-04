var router = require('express').Router()
var Users = require('../models/Users.js');
var Teams = require('../models/Teams.js');
var Tournaments = require('../models/Tournaments.js');
var results = {};
var value;

router.post('/search/find', function(req, res) {
    console.log(req.body.value);
    value = req.body.value;
    value = value.replace(" ", "");

    Users.find({
        'lname': new RegExp(value, 'i')
    }, function(err, data1) {
        // console.log(data);
        results.users = data1;
        // console.log(results);
    });

    Teams.find({
        'name': new RegExp(value, 'i')
    }, function(err, data2) {
        // console.log(data);
        results.teams = data2;
        // console.log(results);
    });
    Tournaments.find({
        'sport': new RegExp(value, 'i')
    }, function(err, data3) {
        // console.log(data);
        results.tournaments = data3;
        // console.log(results);
    });
    // console.log(results);
    res.json(results);

})



module.exports = router
