var router = require('express').Router()
var Users = require('../models/Users.js');
var services = require('../services/CRUD.js');
var model = 'Users';
import bcrypt from "bcrypt-nodejs";

//form Handling
const formidable = require('formidable');
const path = require('path');
const uploadDir = path.join(__dirname, '../static/userPhotos/');




router.post('/users/register', function(req, res) {
    console.log("HERE!");
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
        data[field] = value;
    })

    //Files
    form.on('fileBegin', function(name, file) {

        const [fileName, fileExt] = file.name.split('.');
        var date = new Date().getTime();
        var fileNameDB = fileName + date + '.' + fileExt;
        file.path = path.join(uploadDir, fileNameDB);

        // console.log(fileNameDB);
        //ADD file
        data.photo = fileNameDB;
    })

    //Insert Database
    form.on('end', function() {
        data.type = 'student';
        data.notification = true;
        // encrypt password
        bcrypt.hash(data.password, null, null, function(err, hash) {
            data.password = hash
             console.log(data);
            Users.insertMany(data, function(err, results) {
                // console.log(results);
                // delete results.password;
                res.json(results);
            });


            //get user Infomration
        });
    })

})

router.post('/users/getOne', function(req, res) {

    var id = req.body.id;
    // console.log(id);
    services.getOne(model, id, function(result) {
        res.json(result)
    });
})

router.post('/users/getAll', function(req, res) {
  // console.log("HERE!");
    services.getAll(model, function(result) {
      res.json(result);
    });
})

router.post('/users/schedule', function(req, res) {
    // console.log(req.body);
    var id = req.body.shift();
    // console.log(id);
    Users.update({
        _id: id
    }, {
        $set: {
            schedule: req.body
        }
    }).exec(function(err, results) {
        Users.find({
            _id: id
        }).exec(function(err, data) {
            res.json(data);
        })
    })
})

router.post('/users/teamMates', function(req, res) {
  // console.log("HERE!");
    console.log(req.body.id[0]);

    Users.find({
        team: req.body.id[0]
    }, function(err, results) {
        // console.log(results);
        res.json(results);
    });
})
router.post('/users/teamMatesCMS', function(req, res) {
  // console.log("HERE!");
    console.log(req.body.id);

    Users.find({
        team: req.body.id
    }, function(err, results) {
        // console.log(results);
        res.json(results);
    });
})

router.post('/users/getAllStudents', function(req, res) {
    Users.find({
        type: 'student'
    }, function(err, results) {
        res.json(results);
    })

})


router.post('/users/update', function(req, res) {
    // console.log("HERE!");
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
        data.photo = fileNameDB;
    })
    //Insert Database
    form.on('end', function() {

        //ADD inputs
        for (var i = 0; i < fields.length; i++) {
            data[fields[i][0]] = fields[i][1];
            // console.log(fields[i][0]);
        }
        console.log(data.password);
        if (data.password === '') {
            Users.update({
                _id: data.id
            }, {
                fname: data.fname,
                lname: data.lname,
                email: data.email,
                number: data.number,
                photo: data.photo
            }).exec(function(res, result) {
                // console.log(result);
                Users.find({
                    _id: data.id
                }, function(err, resultr) {
                    sendTo(resultr);
                })
            })
        } else {
            bcrypt.hash(data.password, null, null, function(err, hash) {
                data.password = hash;
                Users.update({
                    _id: data.id
                }, {
                    fname: data.fname,
                    lname: data.lname,
                    email: data.email,
                    number: data.number,
                    photo: data.photo,
                    password: data.password
                }).exec(function(res, result) {
                    // console.log(result);
                    Users.find({
                        _id: data.id
                    }, function(err, resultr) {
                        sendTo(resultr);
                    })
                })
            })
        }

        function sendTo(resultr) {
            res.json(resultr);
        }

    });
})

router.post('/users/updateTeam', function(req, res) {
    // console.log(req.body.data);
    Users.update({
        _id: req.body.data.userId
    }, {
        $set: {
            team: req.body.data.teamId,
            tournaments: req.body.data.sportId
        }
    }).exec(function(err, resulttt) {
        Users.find((_id) => {
            req.body.data.userId
        }).exec(function(err, result) {
            res.json(result[0]);
        })
    })

})
router.post('/users/freeAgent', function(req, res) {
    // console.log(req.body.data);
    Users.update({
        _id: req.body.data.userId
    }, {
        $set: {
            torunament: req.body.data.torunament,
            team: null
        }
    }).exec(function(err, resulttt) {
        Users.find((_id) => {
            req.body.data.userId
        }).exec(function(err, result) {
          // console.log(result);
            res.json(result[0]);
        })
    })

})

module.exports = router
