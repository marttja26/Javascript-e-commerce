// VARIABLES NUMERICAS
let productCounterValue = 1;
let productsInCart = 0;

// EVENTOS PARA LAS FUNCIONES DEL CARRITO
$('#btn-cart').click(openCart);
$('#close-cart').click(closeCart);
$('.btn').each( btn =>  btn.click(addToCart));


// FUNCION PARA ABRIR EL CARRITO

function openCart(){
    $('#cart').fadeIn('slow')
    $('#cart').toggleClass('z-index-cart')
    $('.PageOverlay').toggleClass('PageOverlayIsVisible');
    $('#header').toggleClass('z-index');
}

// FUNCION CERRAR EL CARRITO

function closeCart() {
    $('#cart').fadeOut();
    $('#cart').toggleClass('z-index-cart')
    $('.PageOverlay').toggleClass('PageOverlayIsVisible');
    $('#header').toggleClass('z-index');
}



// FUNCIÓN PARA AGREGAR PRODUCTO AL CARRITO
function addToCart(){
    updateCart();
}

function updateCart(){
    let productHtml = ''
    let productsFinalPrice = 0;
    const productosStorage = JSON.parse(localStorage.getItem('carrito')) || [];
    productsCantidad = productosStorage.map(producto => producto.cantidad);
    productsInCart = productsCantidad.reduce((a, b) => a + b, 0);
    if(productsInCart === 0) { 
        $('#products-in-cart').html(productHtml);
        $('.final-price').html(``);
    };
    productsPrice = productosStorage.map(producto => producto.precio * producto.cantidad);
    productsFinalPrice = productsPrice.reduce((a, b) => a + b, 0);
    if(productsInCart !== 0) {
        $('#checkout').html(`CHECKOUT: $${productsFinalPrice}`)
    }
    productosStorage.forEach((productoCarrito) => {
        let precio = productoCarrito.precio
        let precioTotal = precio * productoCarrito.cantidad
        productHtml += `
        <div class="d-flex align-items-center" id="producto${productoCarrito.id}">
            <img class="cart-product-img col-3" src="${productoCarrito.imagen}" alt="product 1">
            <div class="details col-8">
                <div class="cart-product-name">${productoCarrito.nombre}</div>
                <div class="cart-price-group d-flex gap-1">
                    <div class="cart-price">$${precio.toLocaleString()}</div> 
                </div>
                <div class="quantity-selector">
                    <img src="./images/icons/plus.svg"= id="btnAdd${productoCarrito.id}" class="btnAdd">
                    <div class="cart-count">${productoCarrito.cantidad}</div>
                    <img src="./images/icons/minus.svg" id="btnSubtract${productoCarrito.id}" class="btnSubtract">
                </div>
            </div>
            <img id="btnDelete${productoCarrito.id}" class="btnDelete col-1" src="./images/icons/trashcan.svg" alt="icon delete">
        </div>
    `;
    $('#products-in-cart').html(productHtml);
    });
    updateCartIcon();
    updateMsgEmpty();
    updateCheckoutButton();
    document.querySelectorAll('.btnAdd').forEach(btn => btn.addEventListener('click', onBtnAddClick));
    document.querySelectorAll('.btnSubtract').forEach(btn => btn.addEventListener('click', onBtnSubtractClick));
    document.querySelectorAll('.btnDelete').forEach(btn => btn.addEventListener('click', onBtnRemoveClick));
}

function updateCartIcon() { 
    $('#cart-count').text(productsInCart);
    if(productsInCart == 0){
        $('#cart-count').hide();
    }else{
        $('#cart-count').show();
    }
}

// FUNCIÓN PARA MOSTRAR MENSAJE SI EL CARRITO ESTÁ VACÍO
function updateMsgEmpty(){
    if(productsInCart == 0){
        $('#msg-empty').show();
    }else{
        $('#msg-empty').hide();
    }
}

// FUNCION PARA ACTUALIZAR PRODUCTO
function updateCheckoutButton(){
    if(productsInCart == 0){
        $('#checkout').hide();
    }else{
        $('#checkout').show();
    }
}

// FUNCION PARA SUMAR EN EL CARRITO

function onBtnAddClick(e){
    const productId = e.target.id.slice(6);
    const productosStorage = JSON.parse(localStorage.getItem('carrito'));
    objIndex = productosStorage.findIndex((producto => producto.id == productId))
        productosStorage[objIndex].cantidad++
    localStorage.setItem('carrito', JSON.stringify(productosStorage));
    updateCart();
}

// FUNCIÓN PARA RESTAR EN EL CARRITO
function onBtnSubtractClick(e){
    const productId = e.target.id.slice(11);
    const productosStorage = JSON.parse(localStorage.getItem('carrito'));
    objIndex = productosStorage.findIndex((producto => producto.id == productId))
    if (productosStorage[objIndex].cantidad > 1) {
        productosStorage[objIndex].cantidad--
    } else if (productosStorage[objIndex].cantidad == 1) {
        productosStorage.splice(objIndex, 1)
    }
    localStorage.setItem('carrito', JSON.stringify(productosStorage));
    updateCart();
}

// FUNCION PARA REMOVER EL PRODUCTO DEL CARRITO
function onBtnRemoveClick(e){
    const productId = e.target.id.slice(9);
    // console.log(productId)
    const productosStorage = JSON.parse(localStorage.getItem('carrito'));
    const productos = productosStorage.filter(producto => producto.id != productId);
    localStorage.setItem('carrito', JSON.stringify(productos));
    updateCart();
}

$('#checkout').click(Pago);

function Pago(){
    fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: localStorage.getItem('carrito'),
    headers: {
    'Content-type': 'application/json; charset=UTF-8',
    },
})
    .then((response) => {
        localStorage.setItem('carrito', JSON.stringify([]));
        Swal.fire(
            'Tu compra fue realizada!',
            'Tus productos estan en camino!',
            'success'
        )
        updateCart();
    })
    .catch((error) => {
        console.error(error)
        Swal.fire(
            'Nos se pudo realizar tu compra',
            'Intentelo de nuevo mas tarde',
            'error'
        )
    })
};