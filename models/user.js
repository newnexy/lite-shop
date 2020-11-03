const bcrypt = require('bcryptjs')
const connection = require('../config/db')

connection.connect(err => {
    if(err) {
        console.log(err)
        return err
    }
    else {
        console.log('mysql connect ok')
    }
})

// добавление продукта

module.exports.addProduct = function (newProduct, callback) {

    let dateMysqlFormat = new Date().toISOString().slice(0, 19).replace('T', ' ')

    let product = ["", newProduct.type, newProduct.title, newProduct.photo, newProduct.info, newProduct.price, dateMysqlFormat]

    const sql = "INSERT INTO `lite-shops` VALUES(?, ?, ?, ?, ?, ?, ?)"

    connection.query(sql, product, function(err, results) {
        if(err) console.log(err)
        else console.log("Продукт добавлен")
    });

}

// регистррация пользователя

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {

            if(err) throw err
            newUser.password = hash

            // Генер. даты в формате mysql

            let dateMysqlFormat = new Date().toISOString().slice(0, 19).replace('T', ' ')

            let user = ["", newUser.email, newUser.password, newUser.name, dateMysqlFormat]

            const sql = "INSERT INTO `lite-shop` VALUES(?, ?, ?, ?, ?)"

            connection.query(sql, user, function(err, results) {
                if(err) console.log(err)
                else console.log("Новый пользователь добавлен")
            });


        })
    })
}

// авторизация пользователя

module.exports.getUserByLogin = function (login, callback, callback2) {


    let sql = 'SELECT * FROM `lite-shop` WHERE email = '+"'"+ login +"'"

    connection.query(sql, function (err, user) {

        if (err) throw err


        if(!user.length == 0) {
            console.log('найден в базе')

            return callback(user)
        } else {
            console.log('не найден в базе')
            return callback2()
        }

    })

}

// найти пользователя по id

module.exports.getUserById = function (id, callback) {

    let sql = 'SELECT * FROM `lite-shop` WHERE id = '+"'"+ id +"'"

    connection.query(sql, function (err, user) {
        if (err) throw err
        if(user.length == 0) console.log('не найден в базе')

        return callback(user)
    })

}

// проверка парроля

module.exports.comparePass = function (passFromUser, userDbPass, callback) {

    bcrypt.compare(passFromUser, userDbPass, (err, isMatch) => {

        if(err) throw  ('err ')
        return callback(null, isMatch)

    })

}









