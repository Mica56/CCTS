const mongoose = require('mongoose');

const EstablishmentModel = require('../models/establishmentModel.js');
const VisitorModel = require('../models/visitorModel.js');
const VisitModel = require('../models/visitModel.js');

exports.registerEstablishment = async function (event, inputs) {
	const Establishment = new EstablishmentModel({
	name: entity.name,
    address: entity.address,
    owner: entity.owner,
    contactNumber: entity.contactNumber,
    email: entity.email
    });
    
    Establishment.save(function (err) {
  		if (err) console.log(err);
 		console.log("Saved Establishment");
 		 // saved!
	});
    /*  
        *   @das:add -->    Write the contents of the 'inputs' to the database
        *   Note: use the establishmentModel
    */
}