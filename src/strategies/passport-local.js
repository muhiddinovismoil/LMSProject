import passport from 'passport'
import LocalStrategy from 'passport-local'
import { Service } from '../services/index.js'

export default passport.use(
    new LocalStrategy(async function (username, password, done) {
        try {
            const currentUser = await Service.findByUsername(username)
            if (!currentUser) {
                return done(null, false, {
                    message: 'Incorrect username or password.',
                })
            }
            done(null, currentUser[0])
        } catch (error) {
            done(error)
        }
    }),
)

passport.serializeUser(function (user, done) {
    done(null, user.id)
})

passport.deserializeUser(async function (id, done) {
    try {
        const currentUser = await Service.findById(id)
        done(null, currentUser)
    } catch (error) {
        done(error)
    }
})
