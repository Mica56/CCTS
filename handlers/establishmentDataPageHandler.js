const mongoose = require('mongoose');

const EstablishmentModel = require('../models/establishmentModel.js');
const VisitorModel = require('../models/visitorModel.js');
const VisitModel = require('../models/visitModel.js');



exports.getEstablishments = async function() {
	var establishments = await EstablishmentModel.find({}, '_id name address contactNumber email dateRegistered').exec();
    let results = [];
    // establishments.forEach( function (establishment) {
    //     let est = establishment.toObject();
    //     // est._id = est._id.valueOf();
    //     // console.log(est._id)
    //     // est.nothing = "this is nothing";
    //     results.push(est);
    // })
    // console.log(results);
	return JSON.stringify(establishments);
    /*  
        *   @das:add -->    Make a query to the database to fetch all the establishment data
        *       Note: call the 'toObject' method of the result of the query before returning it.
        *           ex: result.toObject();
    */
}