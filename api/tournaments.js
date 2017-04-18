var router = require('express').Router()
var Tournaments = require('../models/Tournaments.js');
var services = require('../services/CRUD.js');
var model = 'Tournaments';
var Teams = require('../models/Teams.js');

//Form Handluing
const formidable = require('formidable');
const path = require('path');
const sportBannerDir = path.join(__dirname, '../static/sportBanners/');

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

router.post('/tournaments/update', function(req, res) {
    var form = new formidable.IncomingForm(),
        bundle = {};

    //Setup
    form.multiples = true;
    form.keepExtensions = true;
    form.uploadDir = sportBannerDir;
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(500).json({
            error: err
        })
        // res.status(200).json({
        //     uploaded: true
        // })
    })

    //place inputs in data
    form.on('field', function(field, value) {
        bundle[field] = value;
    });

    //save files
    form.on('fileBegin', function(name, file) {
        const [fileName, fileExt] = file.name.split('.');
        var date = new Date().getTime();
        var fileNameDB = fileName + date + '.' + fileExt;
        file.path = path.join(sportBannerDir, fileNameDB);

        console.log(name);
        //ADD file
        bundle[name] = fileNameDB;
    })

    //Query
    form.on('end', function() {
        // console.log(bundle);

        //Update
        Tournaments.update({
            _id: bundle.id
        }, {
            sport: bundle.sport,
            type: bundle.type,
            rules: bundle.rules,
            capacity: bundle.capacity,
            promoBannerColor: bundle.promoBannerColor,
            startDate: bundle.startDate,
            endDate: bundle.endDate,
            startDateName: bundle.startDate,
            endDateName: bundle.endDate,
            banner: bundle.banner,
            promoBanner: bundle.promoBanner,
            icon: bundle.icon
        }).exec();

        //Send new users Data
        Tournaments.find().exec(function(err, newData) {
            res.json(newData);
        })

    });


})


router.post('/tournaments/insert', function(req, res) {
    var form = new formidable.IncomingForm(),
        bundle = {};

    //Setup
    form.multiples = true;
    form.keepExtensions = true;
    form.uploadDir = sportBannerDir;
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(500).json({
            error: err
        })
        // res.status(200).json({
        //     uploaded: true
        // })
    })

    //place inputs in data
    form.on('field', function(field, value) {
        bundle[field] = value;
    });

    //save files
    form.on('fileBegin', function(name, file) {
        const [fileName, fileExt] = file.name.split('.');
        var date = new Date().getTime();
        var fileNameDB = fileName + date + '.' + fileExt;
        file.path = path.join(sportBannerDir, fileNameDB);

        console.log(name);
        //ADD file
        bundle[name] = fileNameDB;
    })

    //Query
    form.on('end', function() {
        // console.log(bundle);

        //Update
        Tournaments.insertMany(bundle).exec();


    });


})





module.exports = router
