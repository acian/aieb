import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const inscriptionSchema = new Schema({
  studentId: { type: 'String', required: true },
  courseId: { type: 'String', required: true },
  discountAmount: { type: 'number', required: false },
  status: { type: 'String', default: 'Inscripto' },
  active: { type: 'Boolean', default: true },
  dateCreated: { type: 'Date', default: Date.now },
});

inscriptionSchema.set('timestamps', true);

export default mongoose.model('Inscription', inscriptionSchema);
