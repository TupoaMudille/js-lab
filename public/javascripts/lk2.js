document.querySelector('#enter').onsubmit = function(event){
    event.preventDefault();
    let email=document.querySelector('#email2').value.trim();
    let password=document.querySelector('#password2').value.trim();

    if (email==''||password==''){
        //не заполнены поля
        if(email=='') alert('не заполнили поле почта');
        if(password=='') alert('не заполнили поле пароль');
        return false;
    }

    //просимся проверить данные для входа
    fetch('/get-enter',{
        method: 'POST',
        body: JSON.stringify({
            'email':email,
            'password': password
        }),
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
        .then(function (res){
            console.log(res.body);
            return res.text();
        })
}