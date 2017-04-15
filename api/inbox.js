var router = require('express').Router()
var Inbox = require('../models/Inbox.js');
var services = require('../services/CRUD.js');
var model = 'Inbox';

router.post('/inbox/getOne', function(req, res) {
    var id = req.body.id;
    console.log(id);
    // Inbox = new Inbox();

    Inbox.find({
        _id: id
    }).populate('from').populate('to').exec(function(err, messages) {
        //  console.log(messages);
        res.json(messages);
    });
})

router.post('/inbox/send', function(req, res) {
    // console.log("HERE!");
    var data = req.body.data,
        date = new Date(),
        monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


    //Add current time
    data.date = date;
    data.dateName = monthNames[date.getMonth()] + ' ' + date.getDate();
    console.log(data.date);
    console.log(data.dateName);
    // console.log(data);
    Inbox.insertMany(data, function(error, docs) {
        res.json('Success');
    });

})


router.post('/inbox/getAllBy', function(req, res) {
    var id = req.body.id;
    // console.log(id);
    Inbox.find({
        to: id
    }).populate('from').populate('to').sort({
        date: -1
    }).exec(function(err, resultMessages) {
        //  console.log(resultMessages);
        res.json(resultMessages);
    });
})

router.post('/inbox/getAll', function(req, res) {
    services.getAll(model, function(res) {
        console.log(res);
    });
})

router.post('/inbox/insert', function(req, res) {
    var data = req.body.data;
    console.log(data);
    services.insert(model, data, function(res) {
        console.log(res);
    });
})

router.post('/inbox/delete', function(req, res) {
    var id = req.body.id;
    console.log(id);

    services.delete(model, id, function(res) {
        console.log(res);
    });
})



module.exports = router
