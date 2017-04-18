var router = require('express').Router()
var Games = require('../models/Games.js');
var services = require('../services/CRUD.js');
var model = 'Games';
var ObjectId = require('mongodb').ObjectID;

router.post('/games/getOne', function(req, res) {
    var id = req.body._id;

    // console.log(id);
    services.getOne(model, id, function(res) {
        console.log(res);
    });

})
router.post('/games/allBy', function(req, res) {
    console.log(req.body.id);
    Games.find({
        tournament: req.body.id
    }).populate('teamOne').populate('teamTwo').sort({
        date: -1
    }).exec(function(err, games) {
        if (err) return handleError(err);
        // console.log(games);
        res.json(games);
    });
})

router.post('/games/fixtures', function(req, res) {
    // console.log(req.body.userData);
    var data,
        userData = req.body.userData;

    //Find upcoming Games
    var currentDate = new Date();
    // console.log(currentDate);
    Games.find({
        $and: [{
                $or: [{
                    teamOne: ObjectId(userData.team[0])
                }, {
                    teamTwo: ObjectId(userData.team[0])
                }]
            },
            {
                date: {
                    $gte: currentDate
                }
            }
        ]
    }).populate('teamOne').populate('teamTwo').exec(function(err, upcomingResults) {
        if (err) return handleError(err);
        // console.log(upcomingResults);
        res.json(upcomingResults);
    });

})



router.post('/games/results', function(req, res) {
    // console.log(req.body.userData);
    var data,
        userData = req.body.userData;

    //Find upcoming Games
    var currentDate = new Date();
    // console.log(currentDate);

    Games.find({
        $and: [{
                $or: [{
                    teamOne: ObjectId(userData.team[0])
                }, {
                    teamTwo: ObjectId(userData.team[0])
                }]
            },
            {
                date: {
                    $lt: currentDate
                }
            }
        ]
    }).populate('teamOne').populate('teamTwo').exec(function(err, upcomingResults) {
        if (err) return handleError(err);
        //  console.log(err);
        res.json(upcomingResults);
    });

})

router.post('/games/insert', function(req, res) {
    // console.log('insert');
    var data = req.body.data;
    // console.log(data);
    services.insert(model, data, function(res) {
        // console.log(res);
    });

})

router.post('/games/addScore', function(req, res) {
    Games.update({
        _id: req.body.data.id
    }, {
        teamOne: req.body.data.TeamOne,
        teamTwo: req.body.data.TeamTwo,
        scoreTeamOne: req.body.data.scoreTeamOne,
        scoreTeamTwo: req.body.data.scoreTeamTwo
    }).exec(function(res, result) {
        // console.log(result);
        Games.find(function(err, resultr) {
            sendTo(resultr);
        })
    })

    function sendTo(resultr) {
        res.json(resultr);
    }

})



module.exports = router
