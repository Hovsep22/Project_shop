function itemmDelete(item, id){
    let productId = (+localStorage.getItem('id'))-1
    localStorage.setItem('id', productId)

    
    localStorage.removeItem(`product_${id}`)
    localStorage.removeItem(`product_cart_${id}`)

    item.parentElement.parentElement.parentElement.remove()
}