if(localStorage.getItem('admin') == null){
    location.href = 'login.html'
}

let tbody = document.getElementsByTagName('tbody')[0]

for(let i = 0; i < localStorage.length; i++){
    let product = JSON.parse(localStorage.getItem(`product_${i+1}`))

    if(product != null){
        tbody.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td><img src="images/${product.img}"></td>
                <td>
                    <div class="action">
                        <a href="edit.html#${product.id}" id="edit"><i class="fa fa-pen"></i></a>
                        <a href="#" id="delete" onclick="itemmDelete(${product.id}, this)"><i class="fa fa-times"></i></a>
                    </div>
                </td>
            </tr>
        `
    }
}