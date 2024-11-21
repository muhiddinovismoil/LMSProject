import passport from 'passport'
import BearerStrategy from 'passport-http-bearer'
import { Service } from '../services/index.js'

export default passport.use(
    new BearerStrategy(function (token, done) {
        try {
        } catch (error) {
            done(error)
        }
    }),
)

// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(async function (id, done) {
//   try {
//     const currentUser = await Service.findById(id)
//     done(null, currentUser)
//   } catch (error) {
//     done(error)
//   }
// });
