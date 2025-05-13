const input = document.querySelector('#email-input');
const form = document.querySelector('#form');
const formBtn = document.querySelector('#button');
const ul = document.querySelector('#ul-list');

const oldUsers = [
  {
    email: "gabitodev@gmail.com",
    dateCreated: "01-01-2023",
  },
  {
    email: "carolgar01@gmail.com",
    dateCreated: "01-09-2023",
  },
  {
    email: "carlos1@gmail.com",
    dateCreated: "25-07-2024",
  },
];

// funcion que deshabilita el boton de crear si el input esta vacio
const renderFormBtnValidation = () => {
  if (input.value.length > 0) {
    formBtn.disabled = false;
  } else {
    formBtn.disabled = true;
  }
}

input.addEventListener('input', e => {
   renderFormBtnValidation();
});

// limpiar listado
ul.innerHTML = '';

// Funcion que devuelve fecha en formato DD-MMM-AAAA
function getDateCreated() {
  const fecha = new Date();
  return fecha.toLocaleDateString().split("/").join("-");
}

// Validacion de usuarios
// Reviso si existen usuarios con el mismo email
input.addEventListener('input', e => {
    e.preventDefault();
  const similarEmails = oldUsers.filter(element =>
    element.email.toLowerCase().startsWith(input.value.toLowerCase())
  );

  // verifico que no se repitan los emails
  if (similarEmails.length >= 1) {
    console.log('email ya registrado');
    ul.innerHTML = `
      <div id="error-div">
        <span class="material-symbols-outlined" id="error-icon">error</span>
        <p id="error-text">¡Este correo ya está registrado!</p>
      </div>
    `;
    formBtn.disabled = true;
  } else if (input.value === '') {
    ul.innerHTML = `
      <div id="error-div">
        <span class="material-symbols-outlined" id="error-icon">error</span>
        <p id="error-text">¡Por favor ingrese un correo!</p>
      </div>
    `;
  } else {
    ul.innerHTML = '';
  }
});


// creo nuevo usuario
form.addEventListener('submit', e => {
  e.preventDefault();
  const newUser = {
    id: crypto.randomUUID(),
    email: input.value,
    dateCreated: getDateCreated()
  }
  input.value = '';
  
  addUser(newUser);
  renderUsers(ul);
});

let users = [];

const addUser = (newUser) => {
  users = users.concat(newUser);
}

const renderUsers = (ul) => {
  ul.innerHTML = '';

  users.forEach(user => {
    const li = document.createElement('li');
    li.classList.add('user-item');
    li.id = user.id;
    const inputsDiv = `
      <p class="email"><span class="material-symbols-outlined" id="email-user-icon">account_circle</span>${user.email}</p>
      <p class="dateCreated"><span class="material-symbols-outlined" id="email-date-icon">calendar_today</span>${getDateCreated()}</p>
    `;

    const liChildren = `
     ${inputsDiv}
    `;
    li.innerHTML = liChildren;    
    ul.appendChild(li);
  });
}


window.onload;