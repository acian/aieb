import Post from './models/post';
import Person from './models/person';

export default function () {
  Post.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const content1 = `Sed ut perspiciatis unde omnis iste natus error
      sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
      eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
      vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
      aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
      qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
      ipsum quia dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum`;

    const content2 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum. Sed ut perspiciatis unde omnis iste natus error
      sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
      eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
      vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
      aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
      qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
      ipsum quia dolor sit amet.`;

    const post1 = new Post({ name: 'Admin', title: 'Hello MERN', slug: 'hello-mern', cuid: 'cikqgkv4q01ck7453ualdn3hd', content: content1 });
    const post2 = new Post({ name: 'Admin', title: 'Lorem Ipsum', slug: 'lorem-ipsum', cuid: 'cikqgkv4q01ck7453ualdn3hf', content: content2 });

    const person1 = new Person({ name: 'Lorena', surname: 'Ramirez', dni: 33123456, address: 'Illia 123', email: 'pepe@gmail.com', telephone:'3434567890', cellphone:'34345667890', birthDate:Date.now(), profession:'conductor', professionPlace:'Paraná', dateCreated:Date.now(), type:'10', active:true});
    const person2 = new Person({ name: 'Ignacio', surname: 'García', dni: 22123456, address: 'Las Heras 333', email: 'igarcia@gmail.com', telephone:'3434566565', cellphone:'34345667890', birthDate:Date.now(), profession:'administrativo', professionPlace:'Paraná', dateCreated:Date.now(), type:'10', active:true});
    const person3 = new Person({ name: 'Gustavo', surname: 'Rodriguez', dni: 11123456, address: 'La Rioja 321', email: 'grodriguez@gmail.com', telephone:'34341122233', cellphone:'34345667890', birthDate:Date.now(), profession:'maestra', professionPlace:'Paraná', dateCreated:Date.now(), type:'10', active:true});
    const person4 = new Person({ name: 'Fabiana', surname: 'Sanchez', dni: 30123456, address: 'Carbó 444', email: 'fsanchez@gmail.com', telephone:'3434223344', cellphone:'34345667890', birthDate:Date.now(), profession:'vendedora', professionPlace:'Paraná', dateCreated:Date.now(), type:'10', active:true});
    const person5 = new Person({ name: 'Marta', surname: 'Perez', dni: 29123456, address: 'Feliciano 326', email: 'mperez@gmail.com', telephone:'3434112233', cellphone:'34345667890', birthDate:Date.now(), profession:'directora', professionPlace:'Paraná', dateCreated:Date.now(), type:'10', active:true});

    Post.create([post1, post2], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });

    Person.create([person1, person2, person3, person4, person5], (error) => {
      if (error) {
        console.log(`ERROR ${error}`);
      }
    });

  });
}
