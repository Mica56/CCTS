const mongoose = require('mongoose');
const { dialog } = require('electron');

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

exports.deleteVisitor = async function (win, id) {
    for(let i = 0; i < id.length; ++i){
        try {
            await VisitorModel.findByIdAndDelete({_id : mongoose.Types.ObjectId(id[i])}).exec();
            dialog.showMessageBoxSync(win, { type: 'warning', message: `Delete sucess!`});
        }catch(err) {
            console.log(err);
            dialog.showMessageBoxSync(win, { type: 'warning', message: `Delete operation failed for id:${id[0]}. Please contact the developer.`});
        }
    }
}