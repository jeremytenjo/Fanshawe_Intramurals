var router = require('express').Router()
var Tournaments = require('../models/Tournaments.js');
var services = require('../services/CRUD.js');
var model = 'Tournaments';
var Teams = require('../models/Teams.js');

router.post('/tournaments/getOne', function(req, res) {
    var id = req.body.data;

    // console.log(id);
    services.getOne(model, id, function(results) {
        res.json(results);
    });
})

router.post('/tournaments/teams', function(req, res) {
    var id = req.body.data;
    Teams.find({
        sport: id
    }).exec(function(err, results) {
      res.json(results);
    })

})

router.post('/tournaments/getAll', function(req, res) {

    services.getAll(model, function(results) {
        res.json(results);
    });
})





module.exports = router
