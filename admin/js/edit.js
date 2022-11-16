let hash = location.hash
let id = hash.slice(1, hash.length)
let image = ''
let oldProduct = JSON.parse(localStorage.getItem(`product_${id}`))

document.getElementById('name').value = oldProduct.name
document.getElementById('price').value = oldProduct.price
document.getElementById('img').setAttribute("src", `images/${oldProduct.img}`)

function edit(){
    let name = document.getElementById('name').value
    let price = document.getElementById('price').value
    
    if(document.getElementById('image').files.length == 0){
        image = document.getElementById('img').getAttribute("src")
        image = image.slice(-5, image.length)
    }else{
        image = document.getElementById('image').files[0]['name']
    }

    let product = {
        id: id,
        name: name,
        price: price,
        img: image
    }

    localStorage.setItem(`product_${id}`, JSON.stringify(product))

    location.href = 'admin.html'
}