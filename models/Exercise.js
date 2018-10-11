var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let ExerciseSchema = new Schema({
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, default: Date.now() },
  creator: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Exercise', ExerciseSchema);