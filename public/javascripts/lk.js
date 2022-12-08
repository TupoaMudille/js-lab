document.querySelector('#reg').onsubmit = function(event){
    event.preventDefault();
    let username=document.querySelector('#username').value.trim();
    let num=document.querySelector('#num').value.trim();
    let email=document.querySelector('#email').value.trim();
    let password=document.querySelector('#password').value.trim();
    if(!document.querySelector('#rule').checked){
        //не согласен с правилами
        alert('без согласия нельзя записаться');
        return false;
    }
    if (username==''||num==''||email==''||password==''){
        //не заполнены поля
        if(username=='') alert('не заполнили поле имя');
        if (num=='') alert('не заполнили поле телефон');
        if(email=='') alert('не заполнили поле почта');
        if(password=='') alert('не заполнили поле пароль');
        return false;
    }

    //просимся на регистрацию
    fetch('/get-reg',{
        method: 'POST',
        body: JSON.stringify({
            'username':username,
            'num':num,
            'email':email,
            'password': password
        }),
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
        .then(function (res){
            return res.text();
        })
}