let carrito = [];
var product_id = document.getElementById('product_id').value
var name = document.getElementById('product_name').innerHTML
var price = document.getElementById('product_price').innerHTML
var image = document.getElementById('product_image').src

var identity = "item-" + product_id;
let info_products = [];


// function count_quantity(carritoSinDuplicados,cartParse) {
//     let listQuantity = []
//     carritoSinDuplicados.forEach(function (item) {
//         let numeroUnidadesItem = cartParse.reduce(function (total, itemId) {
//             return itemId === item ? total += 1 : total;
//         }, 0);
//         let itemName = 'quantity_'+item
//         listQuantity.push(JSON.parse('{\n\t\"'+itemName+'\":\"'+numeroUnidadesItem+'\"}'))
//     });
//     return(listQuantity)
// }
function add_to_cart(id) {
    let query = "user_"+id;
    var getCart = localStorage.getItem(query);
    if (getCart) {
        var parseCart = JSON.parse(getCart)
        var validateArray = parseCart.cart
        var itemFilter = validateArray.filter(function(item) {
            return item.product_id == product_id;
        })

        if(itemFilter[0]){
            itemFilter[0].quantity = itemFilter[0].quantity + 1
            localStorage.setItem(query, JSON.stringify(parseCart));
            window.location.href = '/'
        }else{
            var data = '{\
                "product_id":'+product_id+',\
                "quantity":1,\
                "image":"'+image+'",\
                "name":"'+name+'" , \
                "price":"'+price+'"}';
            validateArray.push(JSON.parse(data))
            localStorage.setItem(query, JSON.stringify(parseCart));
            window.location.href = '/'
        }

        // let carritoSinDuplicados = [...new Set(cartParse)];
        // let cantidad = count_quantity(carritoSinDuplicados,cartParse)
        // console.log(cantidad)
    }else{
        var cartOBJ = '{"cart":[{"product_id":'+product_id+',"quantity":1,"image":"'+image+'","name":"'+name+'","price":"'+price+'"}]}' 
        localStorage.setItem(query, cartOBJ);
        window.location.href = '/'
    }
}




