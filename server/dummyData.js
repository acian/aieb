import Person from './models/person';
import Course from './models/course';
import User from './models/user';

export default function () {
  Person.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const person1 = new Person({ name: 'Lorena', surname: 'Ramirez', dni: 33123456, address: 'Illia 123', email: 'pepe@gmail.com', telephone:'3434567890', cellphone:'34345667890', birthDate:Date.now(), profession:'conductor', professionPlace:'Paraná', dateCreated:Date.now(), type:'Alumno', active:true});
    const person2 = new Person({ name: 'Ignacio', surname: 'García', dni: 22123453, address: 'Las Heras 333', email: 'igarcia@gmail.com', telephone:'3434566565', cellphone:'34345667890', birthDate:Date.now(), profession:'administrativo', professionPlace:'Paraná', dateCreated:Date.now(), type:'Docente', active:true});
    const person3 = new Person({ name: 'Gustavo', surname: 'Rodriguez', dni: 11123454, address: 'La Rioja 321', email: 'grodriguez@gmail.com', telephone:'34341122233', cellphone:'34345667890', birthDate:Date.now(), profession:'maestra', professionPlace:'Paraná', dateCreated:Date.now(), type:'Alumno', active:true});
    const person4 = new Person({ name: 'Fabiana', surname: 'Sanchez', dni: 30123452, address: 'Carbó 444', email: 'fsanchez@gmail.com', telephone:'3434223344', cellphone:'34345667890', birthDate:Date.now(), profession:'vendedora', professionPlace:'Paraná', dateCreated:Date.now(), type:'Docente', active:true});
    const person5 = new Person({ name: 'Marta', surname: 'Perez', dni: 29123451, address: 'Feliciano 326', email: 'mperez@gmail.com', telephone:'3434112233', cellphone:'34345667890', birthDate:Date.now(), profession:'directora', professionPlace:'Paraná', dateCreated:Date.now(), type:'Alumno', active:true});
    const person6 = new Person({ name: 'Maria', surname: 'Ramirez', dni: 3312122, address: 'Illia 123', email: 'pepe@gmail.com', telephone:'3434567890', cellphone:'34345667890', birthDate:Date.now(), profession:'conductor', professionPlace:'Paraná', dateCreated:Date.now(), type:'Alumno', active:true});
    const person7 = new Person({ name: 'Francisco', surname: 'Gotte', dni: 221234522, address: 'Las Heras 333', email: 'igotte2019@gmail.com', telephone:'3434566565', cellphone:'34345667890', birthDate:Date.now(), profession:'administrativo', professionPlace:'Paraná', dateCreated:Date.now(), type:'Docente', active:true});
    const person8 = new Person({ name: 'Fabian', surname: 'Fernandez', dni: 11123443, address: 'La Pampa 321', email: 'fabian@gmail.com', telephone:'34341122233', cellphone:'34345667890', birthDate:Date.now(), profession:'maestra', professionPlace:'Paraná', dateCreated:Date.now(), type:'Alumno', active:true});
    const person9 = new Person({ name: 'Julio', surname: 'Sanchez', dni: 30123412, address: 'Ramirez 1144', email: 'sanchez@gmail.com', telephone:'3434223344', cellphone:'34345667890', birthDate:Date.now(), profession:'vendedora', professionPlace:'Paraná', dateCreated:Date.now(), type:'Docente', active:true});
    const person10 = new Person({ name: 'Pedro', surname: 'Perez', dni: 291234516, address: 'Feliciano 326', email: 'pperez@gmail.com', telephone:'3434112233', cellphone:'34345667890', birthDate:Date.now(), profession:'directora', professionPlace:'Paraná', dateCreated:Date.now(), type:'Alumno', active:true});
    const person11 = new Person({ name: 'Lorena', surname: 'Paulo', dni: 12332212, address: 'Italia 123', email: 'pau@gmail.com', telephone:'3434567890', cellphone:'34345667890', birthDate:Date.now(), profession:'conductor', professionPlace:'Paraná', dateCreated:Date.now(), type:'Alumno', active:true});
    const person12 = new Person({ name: 'Ignacio', surname: 'Khun', dni: 22123453, address: 'Las Heras 333', email: 'ik@gmail.com', telephone:'3434566565', cellphone:'34345667890', birthDate:Date.now(), profession:'administrativo', professionPlace:'Paraná', dateCreated:Date.now(), type:'Docente', active:true});
    const person13 = new Person({ name: 'Jose', surname: 'Rodriguez', dni: 144322454, address: 'La Rioja 321', email: 'jrodriguez@gmail.com', telephone:'34341122233', cellphone:'34345667890', birthDate:Date.now(), profession:'maestra', professionPlace:'Paraná', dateCreated:Date.now(), type:'Alumno', active:true});
    const person14 = new Person({ name: 'Ruben', surname: 'Sanchez', dni: 130123411, address: 'Bs As SN', email: 'sanchez@gmail.com', telephone:'3434223344', cellphone:'34345667890', birthDate:Date.now(), profession:'vendedora', professionPlace:'Paraná', dateCreated:Date.now(), type:'Docente', active:true});
    const person15 = new Person({ name: 'Juan', surname: 'Heit', dni: 129123451, address: 'Feliciano 123', email: 'juan@gmail.com', telephone:'3434112233', cellphone:'34345667890', birthDate:Date.now(), profession:'directora', professionPlace:'Paraná', dateCreated:Date.now(), type:'Alumno', active:true});

    const course1 = new Course({ name: 'Segmento 1', type: 'A', year: 2019, teacher: 'Marta', amount: 1000, dueCost:10, printCost:10, active:true });
    const course2 = new Course({ name: 'Segmento 1', type: 'B', year: 2018, teacher: 'Maria', amount: 1000, dueCost:10, printCost:10, active:true });
    const course3 = new Course({ name: 'Junior', type: 'A', year: 2019, teacher: 'Julia', amount: 1000, dueCost:20, printCost:10, active:false });
    const course4 = new Course({ name: 'Segmento 1', type: 'C', year: 2019, teacher: 'Federico', amount: 1000, dueCost:15, printCost:10, active:true });
    const course5 = new Course({ name: 'Segmento 2', type: 'B', year: 2020, teacher: 'Julio', amount: 1000, dueCost:30, printCost:10, active:true });
    const course6 = new Course({ name: 'Segmento 1', type: 'D', year: 2019, teacher: 'Mario', amount: 1000, dueCost:10, printCost:10, active:true });
    const course7 = new Course({ name: 'Segmento Lunes', type: 'A', year: 2018, teacher: 'Pedro', amount: 1000, dueCost:10, printCost:10, active:true });
    const course8 = new Course({ name: 'Junior', type: 'A', year: 2017, teacher: 'Monica', amount: 1000, dueCost:20, printCost:10, active:false });
    const course9 = new Course({ name: 'Junior 1', type: 'B', year: 2018, teacher: 'Fede', amount: 1000, dueCost:15, printCost:10, active:true });
    const course10 = new Course({ name: 'Junior 2', type: 'B', year: 2020, teacher: 'Beto', amount: 1000, dueCost:30, printCost:10, active:true });
    const course11 = new Course({ name: 'Segmento 1', type: 'A', year: 2021, teacher: 'Claudia', amount: 1000, dueCost:10, printCost:10, active:true });
    const course12 = new Course({ name: 'Segmento Martes', type: 'B', year: 2018, teacher: 'Mario', amount: 1000, dueCost:10, printCost:10, active:true });
    const course13 = new Course({ name: 'Junior', type: 'A', year: 2019, teacher: 'Maria', amount: 1000, dueCost:20, printCost:10, active:false });
    const course14 = new Course({ name: 'Segmento 1', type: 'B', year: 2019, teacher: 'Marta', amount: 1000, dueCost:15, printCost:10, active:true });
    const course15 = new Course({ name: 'Segmento Martes', type: 'A', year: 2020, teacher: 'Fran', amount: 1000, dueCost:30, printCost:10, active:true });

    Person.create([person1, person2, person3, person4, person5, person6, person7, person8, person9, person10, person11, person12, person13, person14, person15], (error) => {
      console.log(`Creando Persona ${error}`);
      if (error) {
        console.log(`ERROR PERSON ${error}`);
      }
    });

    Course.create([course1, course2, course3, course4, course5, course6, course7, course8, course9, course10, course11, course12, course13, course14, course15], (error) => {
      if (error) {
        console.log(`ERROR ${error}`);
      }
    });

  });

  User.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const user1 = new User({ name: 'Jorge', surname: 'Lopez', user: 'jlopez', password: '123', type:'Operator', active:true, dateCreated: Date.now()});
    const user2 = new User({ name: 'Pedro', surname: 'Martos', user: 'pmartos', password: '123', type:'Administrador', active:false, dateCreated: Date.now()});

    user1.password = user1.generateHash(user1.password);

    User.create([user1, user2], (error) => {
      if (error) {
        console.log(`ERROR ${error}`);
      }
    });

  });
}
