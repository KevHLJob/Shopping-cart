// variable state cart
var cartVisible= false;

//Load page for continue Script
if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready); //DOMLoad
}else{
    ready();
}

function ready(){
//function for count click in button delete
    var buttonDeleteItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0; i<buttonDeleteItem.length;i++){
        var button= buttonDeleteItem [i];
        button.addEventListener('click', DeleatItemCart);
    }

    //button sum
    var buttonsSum=document.getElementsByClassName('sum-count')
    for(var i=0; i<buttonsSum.length;i++){
        var button=buttonsSum[i];
        button.addEventListener('click',sumCant)
    }

    //button rest
    var buttonsRest=document.getElementsByClassName('rest-count')
    for(var i=0; i<buttonsRest.length;i++){
        var button=buttonsRest[i];
        button.addEventListener('click',restCant)
    }

    //add element for shop cart
    var buttonAddcart= document.getElementsByClassName('boton-item');
    for(var i=0; i<buttonAddcart.length;i++){
        var button= buttonAddcart[i];
        button.addEventListener('click', addCartClicked);
    }

    //Add function of button pay
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked);

}

//deleted item of shop cart
function DeleatItemCart(event){
var buttonClicked= event.target;
buttonClicked.parentElement.parentElement.remove(); //void remove for deleted item

//update total of cart
updateTotal();

//function hide shop cart
hideCart();
}

//update total
function updateTotal(){
    //select the container of cart
    var cartContainer= document.getElementsByClassName('cart') [0];
    var cartItem = cartContainer.getElementsByClassName('cart-item');
    var total=0;

    //for each element of shop cart
    for(var i=0; i < cartItem.length; i++){
        var item = cartItem[i];
        var priceElement = item.getElementsByClassName('cart-item-price') [0];
         console.log(priceElement);
        //$ y . only price
         var precio = parseFloat(priceElement.innerText.replace('$','').replace('.',''));
          console.log(precio);

        var cantidadItem =item.getElementsByClassName('cart-item-count') [0];
        var cantidad=cantidadItem.value;
        console.log(cantidad);
        total= total+(precio * cantidad);
        
    }
    total= Math.round(total*100)/100;
    //total with count
    document.getElementsByClassName('cart-price-total')[0].innerText ='$'+ total;
}

function hideCart(){
    var cartItems=document.getElementsByClassName('cart-items')[0];
    if(cartItems.childElementCount==0){
        var cart= document.getElementsByClassName('cart')[0];
        cart.style.marginRight='-100%';
        cart.style.opacity='0';
        cartVisible=false;

        //container elements maximize
        var items= document.getElementsByClassName('container-items')[0];
        items.style.width='100%';
    }
}

function sumCant(event){
var buttonClicked=event.target;
var selector=buttonClicked.parentElement;
var cantidadActual=selector.getElementsByClassName('cart-item-count')[0].value;
cantidadActual++;
selector.getElementsByClassName('cart-item-count')[0].value=cantidadActual;

//update total
updateTotal();
}

function restCant(event){
    var buttonClicked=event.target;
    var selector=buttonClicked.parentElement;
    var cantidadActual=selector.getElementsByClassName('cart-item-count')[0].value;
    cantidadActual--;

    if(cantidadActual>=1){
        selector.getElementsByClassName('cart-item-count')[0].value=cantidadActual;
    
    //update total
    updateTotal();
    }
    
}

function addCartClicked(event){
var button=event.target;
var item = button.parentElement;
var title= item.getElementsByClassName('title-item')[0].innerText;
console.log(title);
var price= item.getElementsByClassName('precio-item')[0].innerText;
var imagenSrc= item.getElementsByClassName('img-item')[0].src;
console.log(price);
console.log(imagenSrc);


agregarItemCart(title,price,imagenSrc);

visibleCart();

}

function agregarItemCart(title,price,imagenSrc){
    var item= document.createElement('div');
    item.classList.add='item';
    var itemsCart= document.getElementsByClassName('cart-items')[0];

    //vamos a contralor
    var namesItemsCart = itemsCart.getElementsByClassName('cart-title');
    for(var i =0; i <namesItemsCart.length;i++){
        if(namesItemsCart[i].innerText==title){
            alert("El item se encuentra en el carrito de compras");
            return;
        }
    }

    var itemCartContenido = `
                 <div class="cart-item">
                    <img src="${imagenSrc}" alt="" width="20%" height="20%">
                    <div class="cart-item-details">
                        <span class="cart-title">${title}</span>
                        <div class="selector">
                            <i class="fa-solid fa-minus rest-count"></i>
                            <input type="text" value="3" class="cart-item-count" disabled>
                            <i class="fa-solid fa-plus sum-count"></i>
                        </div>
                        <span class="cart-item-price">${price}</span>
                    </div>
                    <span class="btn-eliminar">
                        <i class="fa-solid fa-trash"></i>
                    </span>
                </div>
    
    `;
    item.innerHTML= itemCartContenido;
    itemsCart.append(item);

    //add function deleted new item

    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click',DeleatItemCart);

    //function sum new item
    var buttonSumCant= item.getElementsByClassName('sum-count')[0];
    buttonSumCant.addEventListener('click', sumCant);

    //function rest new item
    var buttonSumCant= item.getElementsByClassName('rest-count')[0];
    buttonSumCant.addEventListener('click', restCant);
}

function pagarClicked(event){
alert("Gracias por su compra");

//deleted all elements of shop cart

var cartItems=document.getElementsByClassName('cart-items')[0];
while(cartItems.hasChildNodes()){
    cartItems.removeChild(cartItems.firstChild);
}
updateTotal();
}

function visibleCart(){
    cartVisible=true;
    var cart= document.getElementsByClassName('cart')[0];
    cart.style.marginRight='0';
    cart.style.opacity='1';

    var items= document.getElementsByClassName('container-items')[0];
    items.style.width='60';
}