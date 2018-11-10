export default {
  locale: 'en',
  messages: {
    //Form user -----------------------------
    user: 'Usuario',
    password: 'Contraseña',
    login: 'Ingresar',
    profile: 'Perfil',
    status: 'Estado',
    active: 'Activo',
    inactive: 'Inactivo',
    admin: 'Administrador',
    operator: 'Operador',
    editUser:'Editar Usuario',
    addUser:'Agregar Usuario',
    //Form people ---------------------------
    newPerson: 'Agregar persona',
    name: 'Nombre',
    surname: 'Apellido',
    dni: 'DNI',
    birthDate: 'Fecha de nacimiento',
    address: 'Dirección',
    cellphone: 'Celular',
    telephone: 'Teléfono',
    email: 'Correo electrónico',
    profession: 'Profesión',
    professionPlace: 'Lugar de trabajo',
    birthPlace: 'Lugar de nacimiento',
    type: 'Tipo',
    submit: 'Guardar',
    searchPeople:'Buscar persona por DNI, Nombre o Apellido',
    //---------------------------------------
    cancel: 'Cancelar',
    accept: 'Aceptar',
    student: 'Alumno',
    teacher: 'Profesor',
    siteTitle: 'American English Institute',
    addPost: 'Add Post',
    addPerson: 'Agregar Persona',
    editPerson: 'Modificar Persona',
    deletePerson: 'Delete Person',
    personas: 'Personas',
    pagina: 'Páginas',
    de: 'de',
    switchLanguage: 'Switch Language',
    twitterMessage: 'We are on Twitter',
    by: 'By',
    deletePost: 'Delete Post',
    createNewPost: 'Create new post',
    authorName: 'Author\'s Name',
    postTitle: 'Post Title',
    postContent: 'Post Content',
    // Validation messages ----------------------
    nameValidation: 'Debes ingresar un valor alfabético de hasta 30 caracteres',
    addressValidation: 'Debes ingresar un valor alfanumérico de hasta 50 caracteres',
    dniValidation: 'Debes ingresar un valor numérico de hasta 12 dígitos',
    professionValidation: 'Debes ingresar un valor alfanumérico de hasta 50 caracteres',
    cellphoneValidation: 'Debes ingresar un valor numérico de hasta 15 dígitos',
    emailValidation: 'Debes ingresar un email válido',
    comment: `user {name} {value, plural,
    	  =0 {does not have any comments}
    	  =1 {has # comment}
    	  other {has # comments}
    	}`,
    HTMLComment: `user <b style='font-weight: bold'>{name} </b> {value, plural,
    	  =0 {does not have <i style='font-style: italic'>any</i> comments}
    	  =1 {has <i style='font-style: italic'>#</i> comment}
    	  other {has <i style='font-style: italic'>#</i> comments}
    	}`,
    nestedDateComment: `user {name} {value, plural,
    	  =0 {does not have any comments}
    	  =1 {has # comment}
    	  other {has # comments}
    	} as of {date}`,
  },
};
