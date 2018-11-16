import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  studentId: { type: 'number', required: true },
  courseId: { type: 'number', required: true },
  status: { type: 'String', default: 'Inscripto' },
  active: { type: 'Boolean', default: true },
  dateCreated: { type: 'Date', default: Date.now },
});

courseSchema.set('timestamps', true);

export default mongoose.model('Inscription', courseSchema);
