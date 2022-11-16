let card = document.getElementById('card')
let items = document.getElementsByClassName('items')[0]
let suny = document.getElementById('total')
let total = 0

function cardShow(){
    card.classList.toggle('card-show')
    cardRefresh()
}

for(let i = 0; i < localStorage.length; i++){

    let product = JSON.parse(localStorage.getItem(`product_${i+1}`))

    if(product != null){
        items.innerHTML += `
        <div class="item">
            <div class="item-img">
                <img src="images/${product.img}" alt="img">
            </div>
            <div class="item-info">
                <p class="item-name">${product.name}</p>
                <hr>
                <a href="#" class="add" onclick="addStorage(this, ${product.id})">Add to card</a>
                <p class="item-price"><span>${product.price}</span>$</p>
            </div>
        </div>
        `
    }
}

function addStorage (item, id){
    let name = item.parentElement.firstElementChild.innerText
    let price = item.nextElementSibling.firstElementChild.innerText
    let img = item.parentElement.previousElementSibling.firstElementChild.getAttribute("src")

    let count = 1

    if(localStorage.getItem(`product_cart_${id}`) != null){
        let productObj = JSON.parse(localStorage.getItem(`product_cart_${id}`))

        count = (+productObj.count) + 1
    }

    let newPrice = price * count

    let product = {
        id: id,
        name: name,
        price: newPrice,
        img: img,
        count: count
    }

    localStorage.setItem(`product_cart_${id}`, JSON.stringify(product))
    cardRefresh()
}

function cardRefresh(){
    card.innerHTML = ""
    total = 0
    for(let i = 0; i < localStorage.length; i++){
        let product = JSON.parse(localStorage.getItem(`product_cart_${i+1}`))
        if(product != null){
            total += (+product.price) 
            suny.innerHTML = `Total: ${total}$`
            card.innerHTML += `
            <div class="card-item">
                <span id="itemCount">X${product.count}</span>
                <a href="#" id="itemDelete" onclick="itemDelete(${product.id}, this)"><i class="fa fa-times"></i></a>
                <div class="card-item-img">
                    <img src="${product.img}" alt="">
                </div>
                <input value="${product.count}" type="number" id="quantity" oninput="changeCount(${product.id})" max="10" step="1" value="1">
                <div class="card-item-info">
                    <p>${product.name} / ${product.price}$</p>
                </div>
            </div>
            `
        }
    }

    if(document.getElementsByClassName('card-item').length == 0){
        suny.innerHTML = ''
    }
 }
 function changeCount(id){

    let countVal = document.getElementById('quantity').value

    if(countVal == 0){
        localStorage.removeItem(`product_cart_${id}`)
        cardRefresh()
        return
    }

    let cartProduct = JSON.parse(localStorage.getItem(`product_cart_${id}`))
    let product = JSON.parse(localStorage.getItem(`product_${id}`))

    cartProduct.count = countVal
    cartProduct.price = product.price * countVal

    localStorage.setItem(`product_cart_${id}`, JSON.stringify(cartProduct))

    cardRefresh()
 }


 function itemDelete(id, item){
    let product = JSON.parse(localStorage.getItem(`product_cart_${id}`))
    total -= (+product.price)
    suny.innerHTML = `Total: ${total}$`

    localStorage.removeItem(`product_cart_${id}`)
    item.parentElement.remove()
 }
cardRefresh()