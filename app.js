//подключаем модуль express к проекту
let express = require('express');

//создаем экземпляр экпресса
let app = express();

//подключаем модуль для работы с бд
let mysql = require('mysql');
const {json} = require("express");

//задаем параметры подключения
let con = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '0000',
    database: 'bb_shop'
})

//
app.use(express.json());

//паблик - имя папки, где хранится статика
//javascripts - скрипты
//images - изображения
//stylesheets - стили css
//views - шаблоны пага

app.use(express.static('public'));

//ставим шаблонизатор
app.set('view engine','pug');

//конфигурация по сути
app.listen(3000,function (){
    //console.log("node express work on 3000");
});

/*-------------базовая страница - каталог услуг-------------*/
app.get('/', function (req, res) {

        //console.log(req.query.id);
        let cat = new  Promise(function (resolve,reject){
            con.query(
                'SELECT * FROM category',
                function (error,result){
                    if(error) throw error;
                    resolve(result);
                })
        })

    let services = new  Promise(function (resolve,reject){
        con.query(
            'SELECT * FROM service',
            function (error,result){
                if(error) throw error;
                resolve(result);
            })
    })

        Promise.all([cat,services]).then(function (value){
            //console.log(value[0]);
            res.render('cat', {
                cat: JSON.parse(JSON.stringify(value[0])),
                services: JSON.parse(JSON.stringify(value[1]))
            })
        })
})

/*--------------------страница каждой услуги с описанием-----------------*/
app.get('/serv', function (req,res){
    //console.log(req.query.id);
    con.query('SELECT * FROM service WHERE id='+req.query.id, function (error, result, fields){
        if(error) throw error;
        res.render('service', {services: JSON.parse(JSON.stringify(result))})
    });
})

/*--------------------страница записи на услугу--------------------*/
app.get('/order', function (req,res) {

    let bb = new  Promise(function (resolve,reject){
        con.query(
            'SELECT * FROM bb',
            function (error,result){
                if(error) throw error;
                resolve(result);
            })
    })

    let services = new  Promise(function (resolve,reject){
        con.query(
            'SELECT * FROM service WHERE id=' + req.query.id,
            function (error,result){
                if(error) throw error;
                resolve(result);
            })
    })

    Promise.all([bb,services]).then(function (value){
        //console.log(value[0]);
        res.render('order', {
            bb: JSON.parse(JSON.stringify(value[0])),
            services: JSON.parse(JSON.stringify(value[1]))
        })
    })

})

/*-----------------------чтение информации об услуге-------------------------*/
app.post('/get-info',function (req, res){
    //console.log(req.body.key);
    con.query('SELECT id, service, price, time FROM service WHERE id IN('+req.body.key.join(',')+')', function (error, result, fields){
        if (error) throw  error;
        //console.log(result);
        res.json(result);
    })
})

/*-------------------заносим запись на мастера---------------------------*/
app.post('/get-order',function (req, res){
    //console.log(Object.keys(req.body.key));
    //console.log(Object.keys(req.body.time));
    //console.log(Object.keys(req.body.username));
    con.query('INSERT INTO bb (name,time,idserv,clname,num) VALUES ("Marya","'+req.body.time+'","'+Object.keys(req.body.key)+'","'+req.body.username+'","'+req.body.phone+'")');
    res.send('1');
})

/*------------------личный кабинет-------------------*/
app.get('/lk', function (req,res){
    //console.log(req.query.id);
        res.render('lk');
})

/*------------------заносим данные о новом пользователе-----------------------*/
app.post('/get-reg',function (req, res){
    con.query('INSERT INTO users (email,password,username,num) VALUES ("'+req.body.email+'","'+req.body.password+'","'+req.body.username+'","'+req.body.num+'")');
    res.send('1');
})

/*-----------------проверяем есть ли пользователь чтобы войти-----------------------*/
app.post('/get-enter',function (req, res){
    con.query('SELECT * FROM users WHERE email ="'+req.body.email+'" and password = "'+req.body.password+'"',function (error, result, fields){
        if (error) throw  error;
        //console.log(result[0]);
        if(result!=''){
            if ((result[0].password==req.body.password)&(result[0].email==req.body.email)) {
                //console.log('пользователь существует');
                res.send(result[0].num);
            }}
        else res.send('0');
        });
})
