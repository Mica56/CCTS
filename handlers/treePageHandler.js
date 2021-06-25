const mongoose = require('mongoose');
const { dialog } = require('electron');
const EstablishmentModel = require('../models/establishmentModel.js');
const VisitorModel = require('../models/visitorModel.js');
const VisitModel = require('../models/visitModel.js');

exports.buildTree = async function (root, level) {

    if(!level){
        level = 1;
    }
    let currDeg = 1;// counter

    // console.log(id);
    
    // let result = await VisitModel.findOne({ // get the root of the tree
    //     visitor: mongoose.Types.ObjectId(id),
    //     establishment: mongoose.Types.ObjectId('60cdc8ecef165f3a283e8534') 
    //     }, 
    // '_id establishment visitor entered exited')
    // .sort({ entered: -1})
    // .populate('visitor')
    // .populate('establishment')
    // .exec();
    
    // console.log(result.visitor.name, " entered: ", result.entered, "exited: ", result.exited);
    
    let puis = await VisitModel.find({// get all the possibly infected individuals
        establishment: root.establishment._id,
        $or : [
            {
                entered: {
                    $gt: root.entered,
                    $lt: root.exited
                }
            },
            {
                exited: {
                    $gt: root.entered,
                    $lt: root.exited
                }
            },
        ]
    })
    .populate('visitor name covidStatus')
    .populate('establishment name')
    .exec();

    
    // let root = transform(visitor);// tranform the object to be mutable
    setObject(root);// set the name and title of the root node
    // console.log(root);
    // console.log('root: ', root);
    // console.log(positives[i]);
    let exists = [root];// add the root to the repetition tracker array
    
    puis = transform(puis);// transform the objects to be mutable
    setObjects(puis);// set the name and title elements of the object
    exists = exists.concat(puis);// add the two objects to the repetition tracker array
    // console.log(puis);
    // get all the positives among the puis

    root.children = puis;// add the two puis as children of the root


    let positives = puis;// set the array for looping
    while(currDeg++ != level){// create the tree while there are positives
        let tempPositives = [];
        for(let i = 0; i < positives.length; ++i){// create the tree
            // console.log('this is executed');
            positives[i].children = [];// add the children property
            // get the latest visit data for the possibly infected individual
            // console.log('id: ', positives[i].visitor._id);

            let latestVisit = await VisitModel.findOne({ // get the latest visit data of the current visitor
                visitor: mongoose.Types.ObjectId(positives[i].visitor._id)
            })
            .sort({ entered: -1})
            .populate('visitor')
            .populate('establishment')
            .exec();
            // console.log(latestVisit);
            // @todo: Use the establishment to filter visitors visitors
            
            // get the possibly infected individuals of the current visitor
            let piis = await VisitModel.find({
                entered: {
                    $gt: latestVisit.entered,
                    $lt: latestVisit.exited
                }
            })
            .populate('visitor')
            .populate('establishment')
            .exec();

            // console.log('piis', piis);
            // setup the objects for
            piis = transform(piis);
            setObjects(piis);
            
            
            for(let j = 0; j < piis.length; ++j){
                if(!exists.find(element => element.visitor._id == piis[j].visitor._id)){
                    positives[i].children.push(piis[j]);
                    exists.push(piis[j]);

                    tempPositives.push(piis[j]);
                    }
            }
            // console.log('temp positives: ', tempPositives);
        }
        positives = tempPositives;

        
    }
    return JSON.stringify(root);
}


function transform(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function setObject(obj) {
    // console.log('obj: ', obj);
    //set the name property of the object
    // console.log('est: ', obj.establishment.name);
    obj.title = obj.establishment.name;
    obj.name = obj.visitor.name;
    // console.log('success');
    return;
}

function setObjects(objs){
    for(let i = 0; i < objs.length; ++i){
        objs[i].title = objs[i].establishment.name;
        objs[i].name = objs[i].visitor.name;
    }
}

exports.showLevelError = function (win, level){
    dialog.showMessageBoxSync(win, { type: 'warning', message: `Invalid input: ${level}.\nOnly values from 1 - 5 are valid.`});
}

