import Person from './models/person';
import Course from './models/course';
import User from './models/user';

export default function () {
  Person.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const person1 = new Person({ name: 'Lorena', surname: 'Ramirez', dni: 33123456, address: 'Illia 123', email: 'pepe@gmail.com', telephone:'3434567890', cellphone:'34345667890', birthDate:Date.now(), profession:'conductor', professionPlace:'Paraná', dateCreated:Date.now(), type:'10', active:true});
    const person2 = new Person({ name: 'Ignacio', surname: 'García', dni: 22123456, address: 'Las Heras 333', email: 'igarcia@gmail.com', telephone:'3434566565', cellphone:'34345667890', birthDate:Date.now(), profession:'administrativo', professionPlace:'Paraná', dateCreated:Date.now(), type:'10', active:true});
    const person3 = new Person({ name: 'Gustavo', surname: 'Rodriguez', dni: 11123456, address: 'La Rioja 321', email: 'grodriguez@gmail.com', telephone:'34341122233', cellphone:'34345667890', birthDate:Date.now(), profession:'maestra', professionPlace:'Paraná', dateCreated:Date.now(), type:'10', active:true});
    const person4 = new Person({ name: 'Fabiana', surname: 'Sanchez', dni: 30123456, address: 'Carbó 444', email: 'fsanchez@gmail.com', telephone:'3434223344', cellphone:'34345667890', birthDate:Date.now(), profession:'vendedora', professionPlace:'Paraná', dateCreated:Date.now(), type:'10', active:true});
    const person5 = new Person({ name: 'Marta', surname: 'Perez', dni: 29123456, address: 'Feliciano 326', email: 'mperez@gmail.com', telephone:'3434112233', cellphone:'34345667890', birthDate:Date.now(), profession:'directora', professionPlace:'Paraná', dateCreated:Date.now(), type:'10', active:true});

    const course1 = new Course({ name: 'Segmento 1', type: 'A', year: 2019, teacher: 'Mercedes', amount: 1000, dueCost:10, printCost:10, active:true });
    const course2 = new Course({ name: 'Segmento 1', type: 'B', year: 2018, teacher: 'Mercedes2', amount: 1000, dueCost:10, printCost:10, active:true });
    const course3 = new Course({ name: 'Junior', type: 'A', year: 2019, teacher: 'Mercedes3', amount: 1000, dueCost:10, printCost:10, active:true });
    const course4 = new Course({ name: 'Segmento 1', type: 'B', year: 2019, teacher: 'Otra teacher', amount: 1000, dueCost:10, printCost:10, active:true });
    const course5 = new Course({ name: 'Segmento 2', type: 'B', year: 2020, teacher: 'Otra teacher', amount: 1000, dueCost:10, printCost:10, active:true });

    Person.create([person1, person2, person3, person4, person5], (error) => {
      console.log(`Creando Persona ${error}`);
      if (error) {
        console.log(`ERROR PERSON ${error}`);
      }
    });

    Course.create([course1,course2,course3,course4,course5], (error) => {
      if (error) {
        console.log(`ERROR ${error}`);
      }
    });

  });

  User.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const user1 = new User({ name: 'Jorge', surname: 'Lopez', user: 'jlopez', password: '123', type:'operator', active:true, dateCreated: Date.now()});

    user1.password = user1.generateHash(user1.password);

    User.create([user1], (error) => {
      if (error) {
        console.log(`ERROR ${error}`);
      }
    });

  });
}
