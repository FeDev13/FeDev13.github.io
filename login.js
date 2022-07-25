const registrarse = (e) => {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let dataFormulario = JSON.parse(localStorage.getItem("dataFormulario")) || [];
  let existe =
    dataFormulario.length &&
    JSON.parse(localStorage.getItem("dataFormulario")).some(
      (data) => data.password.toLowerCase() == password.toLowerCase()
    );
  if (!existe) {
    dataFormulario.push({ email, password });
    localStorage.setItem("dataFormulario", JSON.stringify(dataFormulario));
    document.querySelector("form").reset();
    document.getElementById("password").focus();
    Swal.fire({
      icon: "success",
      title: "Usuario creado con exito!",
      text: "Sera redireccionado a la pagina principal",
    });
    setTimeout(() => {
      window.location.href = "./index.html";
    }, 2000);
    localStorage.clear();
  } else {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "El usuario ingresado ya existe!",
      footer: '<a href="">Solucionar el problema</a>',
    });
  }
  e.preventDefault();
};

function entrar() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let dataFormulario = JSON.parse(localStorage.getItem("dataFormulario")) || [];
  let existe =
    dataFormulario.length &&
    JSON.parse(localStorage.getItem("dataFormulario")).some(
      (data) =>
        data.email.toLowerCase() == email &&
        data.password.toLowerCase() == password
    );
  if (!existe) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Los datos ingresados son incorrectos!",
      footer: '<a href="">Solucionar el problema</a>',
    });
  } else {
    Swal.fire({
      icon: "success",
      title: "Hola!",
      text: "Bienvenido de vuelta Usuario!",
    })(
      setTimeout(() => {
        window.location.href = "./index.html";
      }, 2000)
    );
  }
}
