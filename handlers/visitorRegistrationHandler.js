const mongoose = require('mongoose');
const {dialog} = require('electron');

const EstablishmentModel = require('../models/establishmentModel.js');
const VisitorModel = require('../models/visitorModel.js');
const VisitModel = require('../models/visitModel.js');


exports.registerVisitor = async function (event, entity, win) {
    console.log(entity);
	const Visitor = new VisitorModel({
	name: entity.name,
    address: entity.address,
    contactNumber: entity.contact,
    email: entity.email,
    covidStatus: entity.covidStatus,
    vaccine: entity.vaccineType,
    });
    
    Visitor.save(function (err) {
        if (err) {  
            dialog.showMessageBoxSync(win, {message: "Visitor registeration failed! Please contact the developer."});
        } else {
            console.log("Saved Visitor!");
 		    dialog.showMessageBoxSync(win, {message: "Visitor registered successfully!"});
        }
	});

    win.loadURL(`file://${__dirname}/../views/registration.ejs`);
    /*  
        *   @das:add -->    Write the contents of the 'inputs' to the database
        *   Note: use the visitorModel
    */
}