const mongoose = require('mongoose');

const EstablishmentModel = require('../models/establishmentModel.js');
const VisitorModel = require('../models/visitorModel.js');
const VisitModel = require('../models/visitModel.js');
const AdminModel = require('../models/adminModel.js')


exports.registerAdmin = async function (event,entity) {
	const Admin = new AdminModel({
	name: entity.name,
    address: entity.address,
    contactNumber: entity.contactNumber,
    email: entity.email,
    username: entity.username,
    password: entity.password
    });
    
    Admin.save(function (err) {
  		if (err) console.log(err);
 		console.log("Saved Admin");
 		 // saved!
	});
}