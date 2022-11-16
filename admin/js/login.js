function login(){
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value

    if(username == 'admin' && password == '1234'){
        localStorage.setItem('admin', 'loged')
        location.href = 'admin.html'
    }else{
        location.href = 'login.html'
    }
}