import passport from 'passport'
import passportJWT from 'passport-jwt'
const { Strategy, ExtractJwt } = passportJWT
import { Service } from '../services/index.js'

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'qwer'

export default passport.use(
    new Strategy(opts, function (jwt_payload, done) {
        try {
            console.log({ jwt_payload })

            done(null, jwt_payload)
        } catch (error) {
            done(error)
        }
    }),
)
