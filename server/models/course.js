import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: { type: 'String', required: true },
  type: { type: 'String', required: true },
  year: { type: 'number', required: true },
  teacher: { type: 'String' },
  schedule: { type: 'Date', default: Date.now },
  amount: { type: 'number', required: true },
  dueCost: { type: 'number', required: true },
  printCost: { type: 'number', required: true },
  monday: { type: 'Boolean', default: false },
  thursday: { type: 'Boolean', default: false },
  wednesday: { type: 'Boolean', default: false },
  tuesday: { type: 'Boolean', default: false },
  friday: { type: 'Boolean', default: false },
  saturday: { type: 'Boolean', default: false },
  active: { type: 'Boolean', default: true },
  dateCreated: { type: 'Date', default: Date.now },
});

courseSchema.set('timestamps', true);

export default mongoose.model('Course', courseSchema);
