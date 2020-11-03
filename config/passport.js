const User = require('../models/user')
const config = require('./config.json');


let JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt

module.exports = function (passport) {


    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
    opts.secretOrKey = config.secret
    // opts.issuer = 'accounts.examplesoft.com'
    // opts.audience = 'yoursite.net'

    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {


        User.getUserById({id: jwt_payload.sub}, function(err, user) {

            console.log('passport: -- ' + user)
            if (err) {
                return done(err, false)
            }
            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
                // or you could create a new account
            }
        })

    }))

}

