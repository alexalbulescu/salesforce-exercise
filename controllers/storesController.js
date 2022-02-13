const db = require('../models');
const Store = db.stores;
const Op = db.Sequelize.Op;

//create and save a new Store
exports.create = (req, res) => {

    if (!req.body.name || !req.body.latitude || !req.body.longitude) {
        let messageText = '';

        if(!req.body.name) {
            messageText += "Name can not be empty!";
        }

        if(!req.body.latitude) {
            messageText += "Latitude can not be empty!";
        }

        if(!req.body.longitude) {
            messageText += "Longitude can not be empty!";
        }

        res.status(400).send({
            message: messageText
        });
        return;
    }

    const store = {
        name: req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        options: req.body.options,
    }

    Store.create(store)
        .then(data => {
           res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating Store."
            });
        });
}

// get all stores
exports.findAll =  (req, res) => {
    Store.findAll({where: null})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
           res.status(500).send({
               message: err.message || "Some error occurred while retrieving stores."
           });
        });
}

exports.getOptions = (req, res) => {
    Store.findAll({where: null})
        .then(data => {
            let options = [];
            if (data.length) {
                for(let i = 0; i < data.length; i++) {
                    let optionsData = data[i]['options'].split(',');
                    if (optionsData.length) {
                        for(let j = 0; j < optionsData.length; j++) {
                            if(! options.includes(optionsData[j])) {
                                options.push(optionsData[j]);
                            }
                        }
                    }
                }
            }
            res.send(options);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving stores options."
            });
        });
}
