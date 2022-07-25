const checkForm = document.getElementById("cart-item");

//recorre el localStorage y pinta una tabla con lo que haya adentro
const recorrerLocalStorage = () => {
  for (let index = 0; index < localStorage.length; index++) {
    const element = localStorage.key(index);
    const retrieve = JSON.parse(localStorage.getItem(element));
    let { Id, Nombre, Foto, Categoria, Stock, Precio } = retrieve;
    let nuevoDiv = document.createElement("div");
    nuevoDiv.classList.add("cart-item");
    nuevoDiv.innerHTML = `<table class="table">
    <thead>
      <tr>
        <th scope="col">Producto</th>
        <th scope="col">Precio</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${Nombre}</td>
        <td>${Precio}</td>
      </tr>
    </tbody>
  </table>
              `;
    checkForm.appendChild(nuevoDiv);
  }
};
recorrerLocalStorage();

//finaliza la compra, borra localStorage y vuelve al home
const botonDeCompra = document.getElementById("botonComprar");
botonDeCompra.addEventListener("click", compraFinalizada);

function compraFinalizada() {
  Swal.fire({
    icon: "success",
    title: "La compra ha sido realizada!",
    text: "Sera redireccionado a la pagina principal",
  });
  setTimeout(() => {
    window.location.href = "./index.html";
  }, 2000);
  localStorage.clear();
}
