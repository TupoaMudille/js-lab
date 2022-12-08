//при нажатии на кнопку запись
document.querySelector('#order').onsubmit = function(event){
    //переопределяем поведение браузера, шоб не отправлял непонятно что при нажатии кнопки
    event.preventDefault();
    //trim() убирает мусорные пробелы из записи
    let username=document.querySelector('#username').value.trim();
    let phone=document.querySelector('#phone').value.trim();
    var element = document.querySelector('#time');
    let time=element.options[element.selectedIndex].value;
    if(!document.querySelector('#rule').checked){
        //не согласен с правилами
        alert('без согласия нельзя записаться');
        return false;
    }
    //console.log(localStorage.getItem('card'));
    if (username==''||phone==''){
        //не заполнены поля
        if(username=='') alert('не заполнили поле имя');
        if (phone=='') alert('не заполнили поле телефон');
        return false;
    }
    //посылаем на запись
    fetch('/get-order',{
        method: 'POST',
        body: JSON.stringify({
            'username':username,
            'phone':phone,
            'time':time,
            'key': JSON.parse(localStorage.getItem('card'))
            }),
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })

        .then(function (res){
            return res.text();
        })
    //чистим чтобы в массиве card не копились услуги
    localStorage.clear();
}