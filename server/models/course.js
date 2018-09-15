import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: { type: 'String', required: true },
  days: { type: 'String', required: true },
  schedule: { type: 'String', required: true },
  amount: { type: 'number', required: true },
  firstDueDate: { type: 'Date', default: Date.now },
  secondDueDate: { type: 'Date', default: Date.now },
  dueCost: { type: 'number', required: true },
  teacher: { type: 'String' },
  comment: { type: 'String' },
  active: { type: 'Boolean', default: true},
  dateCreated: { type: 'Date', default: Date.now },
});

export default mongoose.model('Course', courseSchema);
