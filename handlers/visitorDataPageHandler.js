const mongoose = require('mongoose');

const EstablishmentModel = require('../models/establishmentModel.js');
const VisitorModel = require('../models/visitorModel.js');
const VisitModel = require('../models/visitModel.js');



exports.getVisitors = async function() {
	var visitors = await VisitorModel.find({}).exec();
	return JSON.stringify(visitors);
    /*  
        *   @das:add -->    Make a query to the database to fetch all the visitor data
        *       Note: call the 'toObject' method of the result of the query before returning it.
        *           ex: result.toObject();
    */
}