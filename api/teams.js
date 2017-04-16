var router = require('express').Router()
var Teams = require('../models/Teams.js');
var services = require('../services/CRUD.js');
var model = 'Teams';
const formidable = require('formidable');
const path = require('path');
const uploadDir = path.join(__dirname, '../static/teamLogos/');
var remove = require('remove');


router.post('/teams/update', function(req, res) {
    console.log("Update Here");

})


router.post('/teams/getOne', function(req, res) {
    var id = req.body.id;
    // console.log(id);
    services.getOne(model, id, function(respo) {
        // console.log(respo);
        res.json(respo);
    });
})

router.post('/teams/getAll', function(req, res) {
    Teams.find().populate('sport').exec(function(err, result) {
        // console.log(result);
        res.json(result);
    })
})

router.post('/teams/currentlyQualifying', function(req, res) {
    var sportId = req.body.id,
        bundle = {};
    // console.log(sportId);

    //Get first Group
    Teams.find({
            $and: [{
                sport: sportId
            }, {
                group: 1
            }]
        })
        .sort({
            points: -1
        })
        .limit(2)
        .exec(function(err, results) {
            // console.log(results);
            bundle.groupOne = results
            getGroupTwo(bundle);
        });

    //Get Group 2
    function getGroupTwo(bundle) {
        // console.log(bundle.groupOne);
        Teams.find({
                $and: [{
                    sport: sportId
                }, {
                    group: 2
                }]
            })
            .sort({
                points: -1
            })
            .limit(2)
            .exec(function(err, results) {
                // console.log(results);
                bundle.groupTwo = results
                getGroupThree(bundle);
            });
    }

    //Get Group 3
    function getGroupThree(bundle) {
        // console.log(bundle.groupOne);
        Teams.find({
                $and: [{
                    sport: sportId
                }, {
                    group: 3
                }]
            })
            .sort({
                points: -1
            })
            .limit(2)
            .exec(function(err, results) {
                // console.log(results);
                bundle.groupThree = results
                getGroupFour(bundle);
            });
    }

    //Get Group 4 and send
    function getGroupFour(bundle) {
        // console.log(bundle.groupOne);
        Teams.find({
                $and: [{
                    sport: sportId
                }, {
                    group: 4
                }]
            })
            .sort({
                points: -1
            })
            .limit(2)
            .exec(function(err, results) {
                // console.log(results);
                bundle.groupFour = results
                res.json(bundle);
            });
    }
})
router.post('/teams/groups', function(req, res) {
    var sportId = req.body.id,
        bundle = {};
    // console.log(sportId);

    //Get first Group
    Teams.find({
            $and: [{
                sport: sportId
            }, {
                group: 1
            }]
        })
        .sort({
            points: -1
        })
        .exec(function(err, results) {
            // console.log(results);
            bundle.groupOne = results
            getGroupTwo(bundle);
        });

    //Get Group 2
    function getGroupTwo(bundle) {
        // console.log(bundle.groupOne);
        Teams.find({
                $and: [{
                    sport: sportId
                }, {
                    group: 2
                }]
            })
            .sort({
                points: -1
            })
            .exec(function(err, results) {
                // console.log(results);
                bundle.groupTwo = results
                getGroupThree(bundle);
            });
    }

    //Get Group 3
    function getGroupThree(bundle) {
        // console.log(bundle.groupOne);
        Teams.find({
                $and: [{
                    sport: sportId
                }, {
                    group: 3
                }]
            })
            .sort({
                points: -1
            })
            .exec(function(err, results) {
                // console.log(results);
                bundle.groupThree = results
                getGroupFour(bundle);
            });
    }

    //Get Group 4 and send
    function getGroupFour(bundle) {
        // console.log(bundle.groupOne);
        Teams.find({
                $and: [{
                    sport: sportId
                }, {
                    group: 4
                }]
            })
            .sort({
                points: -1
            })
            .exec(function(err, results) {
                // console.log(results);
                bundle.groupFour = results
                res.json(bundle);
            });
    }
})


router.post('/teams/fileUpload', function(req, res) {
    var form = new formidable.IncomingForm(),
        data = {};
    // removing = {};


    form.multiples = true
    form.keepExtensions = true
    form.uploadDir = uploadDir
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(500).json({
            error: err
        })
        res.status(200).json({
            uploaded: true
        })
    })
    form.on('field', function(field, value) {
        data.id = value;
    });


    form.on('fileBegin', function(name, file) {
        const [fileName, fileExt] = file.name.split('.');
        var date = new Date().getTime();
        var fileNameDB = fileName + date + '.' + fileExt;
        file.path = path.join(uploadDir, fileNameDB);
        data.file = fileNameDB;
    })
    form.on('end', function() {
        // console.log(data);
        //To Database
        Teams.findById(data.id, function(err, result) {
            if (err) {
                return err;
            };
            removeFile(result.file);
            result.file = data.file || result.file;

            //Save new to database
            result.save(function(err, result) {
                if (err) return next(err);
            });
        });
    });

    // Delete old version (Only if not default png)
    function removeFile(oldFile) {
        // console.log(oldFile);

        if (oldFile != 'default_team_logo.png') {
            remove.removeSync('./static/teamLogos/' + oldFile);
        }
    }

});

router.post('/teams/delete', function(req, res) {
    // console.log(req.body);
    var id = req.body.id;
    // console.log(id);

    services.delete(model, id, function(result) {
        // console.log(result);
        // Delete old version (Only if not default png)
        if (result.file != 'default_team_logo.png') {
            remove.removeSync('./static/teamLogos/' + result.file);
        }
    });


})

router.post('/teams/insert', function(req, res) {
    // console.log(req.body);
    var form = new formidable.IncomingForm(),
        data = {},
        files = [],
        fields = [];
    form.multiples = true;
    form.keepExtensions = true;
    form.uploadDir = uploadDir;
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(500).json({
            error: err
        });
    })

    //Inputs
    form.on('field', function(field, value) {
        // console.log(field, value);
        fields.push([field, value]);
    })

    //Files
    form.on('fileBegin', function(name, file) {

        const [fileName, fileExt] = file.name.split('.');
        var date = new Date().getTime();
        var fileNameDB = fileName + date + '.' + fileExt;
        file.path = path.join(uploadDir, fileNameDB);

        // console.log(fileNameDB);
        //ADD file
        data.file = fileNameDB;
    })

    //Selections



    //Insert Database
    form.on('end', function() {

        //ADD inputs
        for (var i = 0; i < fields.length; i++) {
            data[fields[i][0]] = fields[i][1];
            // console.log(fields[i][0]);
        }

        //Add players
        console.log(fields);
        console.log(data.players);
        if (data.file === 'undefined') {
            console.log('nofile');
            data.file = 'default_team_logo.png';
            services.insert(model, data, function(respo) {
                res.json(respo);
            });
        } else {
            services.insert(model, data, function(respo) {
                res.json(respo);
            });
        }
    });


});


module.exports = router
