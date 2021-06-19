const mongoose = require('mongoose');

const EstablishmentModel = require('../models/establishmentModel.js');
const VisitorModel = require('../models/visitorModel.js');
const VisitModel = require('../models/visitModel.js');

exports.buildTree = async function (event, id) {
    
    console.log(id);
    let result = await VisitorModel.findById(mongoose.Types.ObjectId(id)).exec();
    console.log(result);

    let res = result.toObject();
    res.children = [];
    let v = {
        name: 'Jared'
    }
    res.children.push(v);
    return res;
}