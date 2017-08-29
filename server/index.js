import express from 'express'
import {Nuxt, Builder} from 'nuxt'
import api from './api'
import session from 'express-session';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import Chats from './models/Chats.js';
import Users from './models/Users.js';

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//Sessions
app.use(session({secret: 'secret', saveUninitialized: true, resave: true}));

//Socket io - Chat
var http = require('http').Server(app);
var io = require('socket.io')(http);
io.on('connection', function(socket) {
    socket.on('frontSend', function(message) {
        var bundle = {},
            currentDate = new Date();

        //Save message in database
        bundle.message = message;
        bundle.user = session.userID._id;
        bundle.team = session.userID.team;
        bundle.date = currentDate;
        // console.log(bundle);

        Chats.insertMany(bundle, function(err, results) {
            Chats.find({
                _id: results[0].id
            }).populate('user').exec(function(err, result) {
                // console.log(result);
                io.emit('frontReceive', result);
            })
        });

    });
});

// database setup Local
mongoose.connect('mongodb://localhost/fanshaweIntramurals_db', function(err) {
  if (err) {
    console.log('error connecting Yo!', err);
  } else {
    console.log('DB Connected!');
  }
});

// other apis
session.userID = 'true';
app.post('/login', function(req, res) {
  // console.log(req.body);
  // console.log(session);
  // console.log(req.body.data.email);
  // console.log(req.body.data.password);

  Users.find({
    email: req.body.data.email
  }, function(err, results) {
    // console.log(results);
    if (results.length === 0) {
      res.send('false');
    } else {
      // unhash password
      var hash = results[0].password;
      bcrypt.compare(req.body.data.password, hash, function(err, response) {
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
})

//auth guard on every component request
app.get('/auth', function(req, res) {
  // console.log(session);
  session.userID != 'false'
    ? res.json({'data': 'true'})
    : res.json({'data': 'false'});
});
app.get('/unauth', function(req, res) {
  session.userID = 'false';
});

//final setup
app.set('port', port)

// Import API Routes
app.use('/api', api)
// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)
console.log('Server listeningg on ' + host + ':' + port) // eslint-disable-line no-console
