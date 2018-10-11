var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: { type: String, required: true },
  exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }]
});

module.exports = mongoose.model('User', UserSchema);