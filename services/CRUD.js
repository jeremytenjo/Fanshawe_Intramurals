var services = module.exports = {};
//Server CRUD methods

//Read one
services.getOne = function(model, id, callback) {
    var newModel = require('../models/' + model + '.js');

    newModel.find({
        _id: id
    }, function(err, results) {
        return callback(results);
    });

};

//Read all
services.getAll = function(model, callback) {
    var newModel = require('../models/' + model + '.js');

    newModel.find(function(err, results) {
      // console.log(results);
        return callback(results);
    });

};

//Insert
services.insert = function(model, data, callback) {
    var newModel = require('../models/' + model + '.js');
    var results;

    var newModel = new newModel(data);

    newModel.save(function(err) {
        if (err) {
            return callback(err);
        }
        results = 'Success';
        return callback(results);
    });
};

//Delete
services.delete = function(model, id, callback) {
    var newModel = require('../models/' + model + '.js');

    newModel.findByIdAndRemove(id, function(err, result) {
        return callback(result);
    });
};
