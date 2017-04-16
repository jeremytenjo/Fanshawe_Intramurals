var router = require('express').Router()
var Announ = require('../models/Announcements.js');
var services = require('../services/CRUD.js');
var model = 'Announcements';

router.post('/annoucements/getOne', function(req, res) {
    var id = req.body._id;

    // console.log(id);
    services.getOne(model, id, function(res) {
        console.log(res);
    });

})

router.post('/annoucements/getAll', function(req, res) {
    Announ.find().sort({
        date: -1
    }).exec(function(err, result) {
        res.json(result);
    })

})

router.post('/annoucements/insert', function(req, res) {
    var data = req.body.data;
    console.log(data);
    services.insert(model, data, function(res) {
        console.log(res);
    });

})

router.post('/annoucements/update', function(req, res, next) {
    var data = req.body.data;
    // console.log(data);
    var id = data._id;
    // console.log(id);

    Announ.findById(id, function(err, result) {
        if (err) {
            return err;
        };

        result.title = data.title || result.title;
        result.message = data.message || result.message;

        result.save(function(err, result) {
            if (err) return next(err);
            res.send('Success Update!');
        });
    });

})

router.post('/annoucements/delete', function(req, res) {
    var id = req.body.data._id;
    console.log(id);

    services.delete(model, id, function(res) {
        console.log(res);
    });
})



module.exports = router
