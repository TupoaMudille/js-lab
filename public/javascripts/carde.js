//здесь инфо о выбранной услуге
let card = {};

//перебор массива кнопок с айди колл, ищем ту, что нажали
document.querySelectorAll('#call').forEach(function (element){
    element.onclick = addCall;
    //console.log(card);
});

//получаем информацию(она привязана к кнопке)
function addCall(){
    let servId = this.dataset.servid;
    card[servId]=servId;
    //console.log(card);
    ajaxGetInfo();
}

//получить всю информацию об услуге
function ajaxGetInfo(){
    updateLocStor();
    fetch('/get-info',{
        method: 'POST',
        body: JSON.stringify({key:Object.keys(card)}),
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(function (res){
            return res.text();
        })
        .then(function (body){
            //console.log(body);
        })
}

//добавление услуги в локальное хранилище
function updateLocStor(){
    localStorage.setItem('card',JSON.stringify(card));
}
