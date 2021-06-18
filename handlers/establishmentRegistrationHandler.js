const mongoose = require('mongoose');

const {dialog} = require('electron');

const EstablishmentModel = require('../models/establishmentModel.js');
const VisitorModel = require('../models/visitorModel.js');
const VisitModel = require('../models/visitModel.js');

exports.registerEstablishment = async function (event, entity, win) {
    console.log(entity);
    console.log(win);
	const Establishment = new EstablishmentModel({
        name: entity.name,
        address: entity.address,
        owner: entity.owner,
        contactNumber: entity.contactNumber,
        email: entity.email,
        username: entity.username,
        password: entity.password
    });
    
    Establishment.save(function (err) {
        if (err) {  
            dialog.showMessageBoxSync(win, {message: "Establishment registeration failed! Please contact the developer."});
        }else {
            console.log("Saved Establishment!");
 		    dialog.showMessageBoxSync(win, {message: "Establishment registered successfully!"});
        }
	});

    win.loadURL(`file://${__dirname}/../views/registration.ejs`);
    /*  
        *   @das:add -->    Write the contents of the 'inputs' to the database
        *   Note: use the establishmentModel
    */
}