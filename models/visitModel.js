const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VisitSchema = new Schema({
    establishment: { type: Schema.Types.ObjectId, ref: 'Establishment'},
    visitor: { type: Schema.Types.ObjectId, ref: 'Visitor'},
    entered: { type: Date, default: Date.now },
    exited: { type: Date }
});




module.exports = mongoose.model('Visit', VisitSchema);
