const mongoose = require('mongoose');
const {dialog} = require('electron');

const EstablishmentModel = require('../models/establishmentModel.js');
const VisitorModel = require('../models/visitorModel.js');
const VisitModel = require('../models/visitModel.js');


exports.registerVisitor = async function (event, entity, win) {
    // console.log(entity);
    try{
        const Visitor = new VisitorModel({
            name: entity.name,
            address: entity.address,
            contactNumber: entity.contact,
            email: entity.email,
            covidStatus: entity.covidStatus,
            vaccine: entity.vaccine,
        });
        await Visitor.save();
        console.log("Saved Visitor!");
        dialog.showMessageBoxSync(win, {message: "Visitor registered successfully!"});
      
    } catch (err){
        console.log(err);
        dialog.showMessageBoxSync(win, {message: "Visitor registeration failed! Please contact the developer."});
    }
    win.loadURL(`file://${__dirname}/../views/registration.ejs`);
    /*  
        *   @das:add -->    Write the contents of the 'inputs' to the database
        *   Note: use the visitorModel
    */
}