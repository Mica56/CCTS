const mongoose = require('mongoose');

const EstablishmentModel = require('../models/establishmentModel.js');
const VisitorModel = require('../models/visitorModel.js');
const VisitModel = require('../models/visitModel.js');

exports.entrance = async (event, id) => {
    console.log('entry:detected');

    let visitor, establishment;
    
    try{
        visitor = await VisitorModel.findById({_id: mongoose.Types.ObjectId(id) }).exec();
        console.log('visitor matched!');
    
        establishment = await EstablishmentModel.findById({_id: mongoose.Types.ObjectId("60b64d198873311ec41b43f3")}).exec();
        console.log('establishment matched!');
    
        // get the visitor instance
        let visit = new VisitModel({
            establishment: establishment,
            visitor: visitor,
        });

        visit.save( function (err, visit) {
            if (err) console.error('Error saving visit: ', err);
            // console.log(visit);
            console.log('entry sucessful!');
        });

    } catch (err) {
        console.log(err);
    }
    
}


exports.exit = async (event, id) => {
    console.log('exit:detected');
    let visitor, establishment;

    visitor = await VisitorModel.findById({_id: mongoose.Types.ObjectId(id) }).exec();
    console.log('visitor matched!');

    establishment = await EstablishmentModel.findById({_id: mongoose.Types.ObjectId(id) }).exec();
    console.log('establishment matched!');

    visit = await VisitModel.findOneAndUpdate({visitor: visitor, establishment: establishment}).sort({entered: -1}).exec()
    visit.exited = Date.now();
    visit.save((err, result) => {
        if(err) console.error('Error saving record', err);// saving error
        // saving success
        // console.log(result);                
        console.log('exit success!');
    });
    console.log('visit matched!');

    // get the visitor instance
}