let productos = JSON.parse(localStorage.getItem('carrito')) || [];

class Producto{
    constructor(id,imagen,nombre,marca,precio){
        this.id = id;
        this.imagen = imagen;
        this.nombre = nombre;
        this.marca = marca;
        this.precio = precio;
        this.cantidad = 1;
    }
}

fetch('products.json')
    .then(response => response.json())
    .then(products => {
        products.forEach(product => {
            let precio = product.precio
            $('#section').append(`
            <div class="card p-5 col-lg-3 col-md-4 col-sm-6 col-xs-12" nombre ="${product.nombre}"marca="${product.marca}" categoria="${product.categoria}" id="producto${product.id}" style="width: auto;">
                <img src="${product.imagen}"  class="card-img-top" alt="Producto Imagen">
                <div class="card-body">
                    <h5 class="card-title nombre">${product.nombre}</h5>
                    <p class="card-text marca">${product.marca}</p>
                    <p class="card-text precio">$${precio.toLocaleString()}</p>
                    <div class="btn" id="btn${product.id}">
                    <img src="images/icons/icon-cart.svg" class="icons" alt="icon cart">
                    <p>Agregar al Carrito</p>
                    </div>
                </div>
            </div>
            `)
        });
        products.forEach(product => {
            $(`#btn${product.id}`).click(()=>{
                productos = JSON.parse(localStorage.getItem('carrito')) || [];
                if(productos.find(producto => producto.nombre == product.nombre)){
                    let objIndex = productos.findIndex(producto => producto.nombre == product.nombre)
                    productos[objIndex].cantidad++;
                    localStorage.setItem('carrito', JSON.stringify(productos))
                }else{
                    let producto = new Producto (product.id, product.imagen, product.nombre,product.marca,product.precio) 
                    productos.push(producto)
                    localStorage.setItem('carrito', JSON.stringify(productos))
                } 
                addToCart();
            })
        })
        updateCart();
    })
    .catch(error => console.error(error));

