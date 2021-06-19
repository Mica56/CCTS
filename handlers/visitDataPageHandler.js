const mongoose = require('mongoose');

const EstablishmentModel = require('../models/establishmentModel.js');
const VisitorModel = require('../models/visitorModel.js');
const VisitModel = require('../models/visitModel.js');



exports.getVisits = async function() {
	var visits = await VisitModel.find({}).exec();
	return JSON.stringify(visits);

    /*  
        *   @das:add -->    Make a query to the database to fetch all the establishment data
        *       Note: call the 'toObject' method of the result of the query before returning it.
        *           ex: result.toObject();
    */
}