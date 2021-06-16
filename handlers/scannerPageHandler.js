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


exports.exit = (event, id) => {
    console.log('exit:detected');
    let visitor, establishment;

    // get the visitor instance
    VisitorModel.findById({_id: mongoose.Types.ObjectId(id) }, (err, result) => {
        if (err) console.error('Error finding visitor: ', err);// error finding visitor
        // visitor found
        // console.log(result);
        visitor = result;

        EstablishmentModel.findById({_id: mongoose.Types.ObjectId("60b64d198873311ec41b43f3")}, (err, result) => {
            if (err) console.error('Error finding establishment: ', err);// error finding establishment
            // establishment found
            // console.log(result);
            establishment = result;

            VisitModel.findOneAndUpdate({visitor: visitor, establishment: establishment}).sort({entered: -1}).exec(
                function (err, result){ // log the console if error
                    if (err) console.error('Error updating visitor: ', err);

                    // update success
                    // console.log(result);
                    result.exited = Date.now();
                    result.save( (err, result) => {
                        if(err) console.error('Error saving record', err);// saving error
                        // saving success
                        // console.log(result);
                        
                        console.log('exit success!');

                    });
                }); 
        });
    });
}