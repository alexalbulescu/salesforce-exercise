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
    const title = req.query.title;
    let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    Store.findAll({where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
           res.status(500).send({
               message: err.message || "Some error occurred while retrieving stores."
           });
        });
}
