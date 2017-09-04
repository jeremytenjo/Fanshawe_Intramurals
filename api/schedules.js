var router = require('express').Router()
var Schedules = require('../models/Schedules.js');
var services = require('../services/CRUD.js');
var model = 'Schedules';

router.post('/schedules/getOne', function(req, res) {
    var id = req.body.data._id;
    // console.log(id);
    services.getOne(model, id, function(res) {
        console.log(res);
    });
})

router.post('/schedules/getAll', function(req, res) {
    services.getAll(model, function(res) {
        console.log(res);
    });
})

router.post('/schedules/insert', function(req, res) {
  var data = req.body.data;
  console.log(data);
  services.insert(model, data, function(res) {
      console.log(res);
  });

})

router.post('/schedules/update', function(req, res) {
  var data = req.body.data;
  console.log(data);
  var id = data._id;
  console.log(id);

  // Announ.findById(id, function(err, result) {
  //     if (err) {
  //         return err;
  //     };
  //
  //     result.title = data.title || result.title;
  //     result.message = data.message || result.message;
  //
  //     result.save(function(err, result) {
  //         if (err) return next(err);
  //         res.send('Success Update!');
  //     });
  // });


})

router.post('/schedules/delete', function(req, res) {
  var id = req.body.data._id;
  console.log(id);

  services.delete(model, id, function(res) {
      console.log(res);
  });

})


module.exports = router
