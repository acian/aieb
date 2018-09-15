import mongoose from 'mongoose';
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: 'String', required: true },
  surname: { type: 'String', required: true },
  user: { type: 'String', required: true },
  password: { type: 'String', required: true },
  type: { type: 'String' },
  active: { type: 'Boolean', default: true },
  dateCreated: { type: 'Date', default: Date.now },
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('User', userSchema);
