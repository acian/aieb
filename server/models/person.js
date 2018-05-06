import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: 'String', 
          required: true },
  surname: { type: 'String', 
             required: true },
  dni: { type: 'Number', 
         required: true, 
         min: [1000000, 'DNI inválido'], 
         max: [100000000, 'DNI inválido'] },
  /*address: { type: 'String', 
             required: true },
  email: { type: 'String', 
           required: true, 
           trim: true, 
           lowercase: true, 
           unique: true,
           required: 'Email es requerido', 
           match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Ingrese email'] },
  telephone: { type: 'Number'},
  cellphone: { type: 'Number'},
  birthdate: { type: 'Date', 
               default: Date.now, 
               required: true },
  profession: { type: 'String' },
  professionplace: { type: 'String' },
  dateAdded: { type: 'Date', default: Date.now, required: true },*/
});

export default mongoose.model('Person', personSchema);
