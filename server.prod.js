'use strict';

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var Nuxt = require('nuxt');
var app = require('express')();
var host = process.env.HOST || '0.0.0.0';
var port = process.env.PORT || 3000;
var session = require('express-session');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Chats = require('./models/Chats.js');

//Socket io - Chat
var http = require('http').Server(app);
var io = require('socket.io')(http);
io.on('connection', function (socket) {
    socket.on('frontSend', function (message) {
        var bundle = {},
            currentDate = new Date();

        //Save message in database
        bundle.message = message;
        bundle.user = session.userID._id;
        bundle.team = session.userID.team;
        bundle.date = currentDate;
        // console.log(bundle);

        Chats.insertMany(bundle, function (err, results) {
            Chats.find({
                _id: results[0].id
            }).populate('user').exec(function (err, result) {
                // console.log(result);
                io.emit('frontReceive', result);
            });
        });
    });
});

//Models
var Users = require('./models/Users.js');

// database setup
mongoose.connect('mongodb://localhost/fanshaweIntramurals_db', function (err) {
    if (err) {
        console.log('error connecting Yo!', err);
    } else {
        console.log('DB Connected!');
    }
});

// Body parser middleware, to access req.body
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

//Sessions
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//Account access attempt
session.userID = 'true';
app.post('/login', function (req, res) {
    // console.log(req.body);
    // console.log(session);
    // console.log(req.body.data.email);
    // console.log(req.body.data.password);

    Users.find({
        email: req.body.data.email
    }, function (err, results) {
        // console.log(results);
        if (results.length === 0) {
            res.send('false');
        } else {
            // unhash password
            var hash = results[0].password;
            _bcryptNodejs2.default.compare(req.body.data.password, hash, function (err, response) {
                if (response === false) {
                    res.send('false');
                } else {
                    session.userID = results[0];
                    delete session.userID.password;
                    // session.userID = JSON.stringify(session.userID);
                    res.json(session.userID);
                }
            });
        }
    });
});

//auth guard on every component request
app.get('/auth', function (req, res) {
    // console.log(session);
    session.userID != 'false' ? res.json({
        'data': 'true'
    }) : res.json({
        'data': 'false'
    });
});
app.get('/unauth', function (req, res) {
    session.userID = 'false';
});

app.post('/testing', function (req, res) {
    console.log('Received');
    console.log(req.body);
});

app.set('port', port);
// Import API Routes
app.use('/api', require('./api/index'));

// Import and Set Nuxt.js options
var config = require('./nuxt.config.js');
config.dev = !(process.env.NODE_ENV === 'production');

// Init Nuxt.js
var nuxt = new Nuxt(config);
app.use(nuxt.render);

// Build only in dev mode
if (config.dev) {
    nuxt.build().catch(function (error) {
        console.error(error); // eslint-disable-line no-console
        process.exit(1);
    });
}

// Listen the server
http.listen(port, host);
console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console
