const mongoose = require('mongoose');

const EstablishmentModel = require('../models/establishmentModel.js');
const VisitorModel = require('../models/visitorModel.js');
const VisitModel = require('../models/visitModel.js');



exports.getVisitors = async function() {
    let visitors;
    try {
	    visitors = await VisitorModel.find({}, 'name address contactNumber email covidStatus vaccine dateRegistered').exec();
        console.log('Visitors Data successfully loaded!');
    } catch (err) {
        dialog.showMessageBoxSync(win, { type: 'warning', message: `An error has occured while getting the visitors data!\nPlease contact the developer`});
        console.log(err);
    }
	return JSON.stringify(visitors);
    /*  
        *   @das:add -->    Make a query to the database to fetch all the visitor data
        *       Note: call the 'toObject' method of the result of the query before returning it.
        *           ex: result.toObject();
    */
}