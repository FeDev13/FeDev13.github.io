const productosLista = document.getElementById("contenedorProductos");
const productoscarrito = document.querySelector(".carrito-main");
const sumarCarrito = document.getElementById("carritonav");
const renderDom = document.getElementById("div-vacio");
const avisoDeCompra = document.getElementById("botonFinalizar");
const sumaDeCompra = document.getElementById("sumaTotal");

const traerCatalogo = async () => {
  let respuesta = await fetch("./catalogo.json");
  return respuesta.json();
};

let carrito = [];

//render de cards
const renderCards = async () => {
  const productos = await traerCatalogo();
  let productosPanelVista = "";
  productos.forEach((producto) => {
    let { Id, Nombre, Foto, Categoria, Stock, Precio } = producto;
    productosPanelVista += `<div class="col-12 mb-2 col-md-4 col-sm-4 panel">
            <div class="card panel1" style="background-color:rgba(214, 169, 164, 0.1);">
            <div class="card-body">
            <img id="fotoProducto" src="${Foto}" class="card-img-top">
            <h5 id="tituloProducto">${Nombre}</h5>
            <p id="descripcionProducto">${Categoria}</p>
            <p id="precioProducto">$${Precio}</p>
            <button data-id="${Id}" id="mybtn" name="btnComprar" class="btn btn-dark">Agregar al carrito</button>
            </div>
            </div>
            </div>
            `;
  });
  productosLista.innerHTML = productosPanelVista;
};
renderCards();

//evento click para agregar producto
productosLista.addEventListener("click", (e) => {
  if (e.target.id === "mybtn") {
    guardarDatos(e.target.dataset.id);
  }
});

const guardarDatos = async (id) => {
  let productos = await traerCatalogo();
  let productoNuevo = productos.find(
    (producto) => producto.Id === parseInt(id)
  );
  let productoEnStorage = JSON.parse(localStorage.getItem(id));
  if (productoEnStorage === null) {
    localStorage.setItem(id, JSON.stringify({ ...productoNuevo, Cantidad: 1 }));
    recorrerLocalStorage();
  } else {
    let productoExiste = JSON.parse(localStorage.getItem(id));
    productoExiste.Cantidad = productoExiste.Cantidad + 1;
    productoExiste.Precio = productoExiste.Precio + productoNuevo.Precio;
    localStorage.setItem(id, JSON.stringify(productoExiste));
    recorrerLocalStorage();
  }
};
//suma productos al carrito
const recorrerLocalStorage = () => {
  carrito.length = 0;
  for (let index = 0; index < localStorage.length; index++) {
    const element = localStorage.key(index);
    carrito.push(JSON.parse(localStorage.getItem(element)));
  }
  sumaDeCompra.innerText = carrito.reduce((acc, prod) => acc + prod.Precio, 0);
  renderCarrito();
  console.log(carrito);
};

//pinta el carrito
const renderCarrito = () => {
  renderDom.innerText = "";
  if (carrito.length > 0) {
    carrito.forEach((producto) => {
      let { Id, Nombre, Foto, Categoria, Stock, Precio } = producto;
      let nuevoDiv = document.createElement("div");
      nuevoDiv.classList.add("cart-item");
      nuevoDiv.innerHTML = `<div class="cart-item">
      <img src="${Foto}" class = "img-fluid card-img-top" id="imgCarrito"> 
      <div class="details">
          <h5>${Nombre}</h5>
          <p>$${Precio}<p>
          <button data-id = "${Id}" class="btn btn-danger" id = "botonQuitar">Quitar producto</button>
      </div>
   </div>
      `;
      renderDom.appendChild(nuevoDiv);
    });
  }
};

//se va al checkout si el carrito tiene productos

const checkOut = () => {
  carrito.length > 0
    ? (window.location.href = "checkout.html")
    : Swal.fire({
        icon: "error",
        title: "Error",
        text: "su carrito esta vacio",
      });
};
avisoDeCompra.addEventListener("click", checkOut);

//borra producto del carrito y localStorage
renderDom.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-danger")) {
    borrarProductoCarrito(Number(e.target.dataset.id));
  }
  e.stopPropagation();
});

const borrarProductoCarrito = (id) => {
  const prodIndex = carrito.findIndex((prod) => prod.Id === Number(id));
  carrito.splice(prodIndex, 1);
  renderCarrito();
  localStorage.clear();
};

//hacer variable localStorage formulario y encontrar la otra (posiblemente .key)!!//
