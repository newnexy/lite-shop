const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config= require('../config/config.json')
const User = require('../models/user')


// ----------------------------- //
// TEMP get function for product //
// ----------------------------- //

// get products dy id

router.get('/product/:id', function(req , res){

    let id = req.params.id
    let sql = 'SELECT * FROM `lite-shops` WHERE id = '+"'"+ id +"'"

    connection.query(sql, function (err, result) {

        if(err)
            res.send({success: false, msg: "product does not exist"})
        else
            res.json({result})
    })

})

// get products

router.get('/products', (req, res) => {

    let sql = "SELECT * FROM `lite-shops`";

    connection.query(sql, (err, result, field) => {
        // console.log(err)
        // console.log(result[0]['email'])

        console.log(result)


        if(err)
            res.json({success: false, msg: "User has not been added"})
        else
            res.json({result})
    })

})

// add product

router.post('/products', (req, res) => {

    console.log(req.query.auth)

    if(req.query.auth === undefined){
        res.send(401);
    } else {

        const newProduct = {
            type: req.body.type,
            title: req.body.title,
            photo: req.body.photo,
            info: req.body.info,
            price: req.body.price
        }

        User.addProduct(newProduct, (err, product) => {

            if(err)
                res.json({success: false, msg: "Product has not been added"})
            else
                res.json({success: false, msg: "Product has been added!"})

        })

        // res.json({success: false, msg: req.body})
    }

})








// регистррация

router.post('/reg', (req, res) => {

    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }

    console.log(newUser)

    User.addUser(newUser, (err, user) => {

        if(err)
            res.json({success: false, msg: "User has not been added"})
        else
            res.json({success: false, msg: "User has been added!"})

    })

})

// авторизация

router.post('/auth', (req, res) => {

    const login = req.body.email
    const password = req.body.password

    User.getUserByLogin(login, (user) => {

        const userData = user[0]

        User.comparePass(password, userData.password, (err, isMatch) => {

            if(err) throw err
            if(isMatch) {

                const token = jwt.sign({ uid: userData.id } , config.secret, {expiresIn: 3600 * 24, algorithm: 'HS256'})

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: userData.id,
                        email: userData.email,
                        name: userData.name,
                        expiresIn: 3600 * 24
                    }
                })

            } else {
                return res.json({seccess: false, msg: "Пароль не совподает"})
            }
        })

    }, (err, user) => {
        return res.json({seccess: true, msg: "Пользователь НЕ найден"})
    })

})

router.get('/dashboard', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send('страница пользователя')
})




module.exports = router