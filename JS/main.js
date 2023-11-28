let productos = [];
let paginaActual = 1;
let categoriaSeleccionada = null;

fetch("../JS/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos, paginaActual, categoriaSeleccionada);
    })

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
const numerito = document.querySelector("#numerito");
const paginaAnteriorBtn = document.querySelector("#pagina-anterior");
const paginaSiguienteBtn = document.querySelector("#pagina-siguiente");

// Escuchadores de eventos para botones de categoría
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id !== "todos") {
            categoriaSeleccionada = e.currentTarget.id;
            const productosBoton = productos.filter(producto => producto.categoria.id === categoriaSeleccionada);
            cargarProductos(productosBoton, paginaActual, categoriaSeleccionada);
        } else {
            categoriaSeleccionada = null;
            cargarProductos(productos, paginaActual, categoriaSeleccionada);
        }
    });
});

// Escuchadores de eventos para paginación
paginaAnteriorBtn.addEventListener("click", () => {
    if (paginaActual > 1) {
        paginaActual--;
        cargarProductos(productos, paginaActual, categoriaSeleccionada);
    }
});

paginaSiguienteBtn.addEventListener("click", () => {
    const maxPaginas = Math.ceil(productos.length / 5); // Cambiado a 5 productos por página
    if (paginaActual < maxPaginas) {
        paginaActual++;
        cargarProductos(productos, paginaActual, categoriaSeleccionada);
    }
});

// Escuchador de eventos para botones "Ver más"
contenedorProductos.addEventListener("click", (e) => {
    const idProducto = e.target.id;
    if (idProducto) {
        expandirProducto(idProducto);
    }
});

// Función para cargar productos en la página
function cargarProductos(productosElegidos, paginaActual, categoriaSeleccionada) {
    const productosPorPagina = 5;
    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;

    const productosFiltrados = categoriaSeleccionada
        ? productosElegidos.filter(producto => producto.categoria.id === categoriaSeleccionada)
        : productosElegidos;

    const productosPagina = productosFiltrados.slice(inicio, fin);

    contenedorProductos.innerHTML = "";

    productosPagina.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">${producto.precio}</p>
                <button class="ver-mas" id="${producto.id}">Ver más</button>
            </div>
        `;

        contenedorProductos.append(div);
    });
}

// Función para expandir un producto específico
function expandirProducto(idProducto) {
    const productoSeleccionado = productos.find(producto => producto.id === idProducto);

    // Ocultar todos los productos
    const productosEnPagina = document.querySelectorAll(".producto");
    productosEnPagina.forEach(producto => {
        producto.classList.add("ocultar");
    });

    // Crear y mostrar el detalle del producto seleccionado
    const detalleProducto = document.createElement("div");
    detalleProducto.classList.add("detalle-producto", "mostrar");
    detalleProducto.innerHTML = `
        <h2>${productoSeleccionado.titulo}</h2>
        <img src="${productoSeleccionado.imagen}" alt="${productoSeleccionado.titulo}">
        <p>${productoSeleccionado.descripcion}</p>
        <p class="producto-precio">${productoSeleccionado.precio}</p>
        <button class="ver-mas" id="${productoSeleccionado.id}">Volver</button>
    `;

    contenedorProductos.appendChild(detalleProducto);

    // Escuchador de eventos para el botón "Volver"
    detalleProducto.querySelector(".ver-mas").addEventListener("click", () => {
        // Mostrar todos los productos nuevamente
        productosEnPagina.forEach(producto => {
            producto.classList.remove("ocultar");
        });

        // Eliminar el detalle del producto
        contenedorProductos.removeChild(detalleProducto);
    });
}
