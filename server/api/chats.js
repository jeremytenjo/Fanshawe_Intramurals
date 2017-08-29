var router = require('express').Router()
var Chats = require('../models/Chats.js');
var services = require('../services/CRUD.js');
var model = 'Chats';

router.post('/chat/getAll', function(req, res) {
    // console.log(req.body.id);
    Chats.find((team) => {
        req.body.id
    }).populate('user').exec(function(err, result) {
      // console.log(result);
      res.json(result);
    })
})

module.exports = router
