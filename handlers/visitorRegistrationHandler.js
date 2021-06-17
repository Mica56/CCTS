const mongoose = require('mongoose');

const EstablishmentModel = require('../models/establishmentModel.js');
const VisitorModel = require('../models/visitorModel.js');
const VisitModel = require('../models/visitModel.js');


exports.registerVisitor = async function (event, inputs) {
	const Visitor = new VisitorModel({
	name: entity.name,
    address: entity.address,
    contactNumber: entity.contactNumber,
    email: entity.email,
    covidStatus: entity.covidStatus,
    vaccine: entity.vaccine,
    Visitor.save(function (err) {
  		if (err) console.log(err);
 		console.log("Saved Visitor");
 		 // saved!
	});
    /*  
        *   @das:add -->    Write the contents of the 'inputs' to the database
        *   Note: use the visitorModel
    */
}