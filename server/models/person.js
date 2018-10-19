import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: 'String',
          required: true },
  surname: { type: 'String',
             required: true },
  dni: { type: 'String',
         required: true },
  address: { type: 'String',
             required: true },
  email: { type: 'String',
           trim: true,
           lowercase: true,
           match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Ingrese email'] },
  telephone: { type: 'String' },
  cellphone: { type: 'String' },
  birthDate: { type: 'Date', required: true },
  birthPlace: { type: 'String' },
  profession: { type: 'String' },
  professionPlace: { type: 'String' },
  dateCreated: { type: 'Date', default: Date.now },
  type: { type: 'String' },
  active: { type: 'Boolean', default: true},
});

export default mongoose.model('Person', personSchema);
