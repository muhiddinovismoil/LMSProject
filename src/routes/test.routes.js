import { Router } from 'express'
import passport from 'passport'
// import '../strategies/passport-google.js'
import '../strategies/passport-local.js'

const googleRouter = Router()

googleRouter.use('/auth/profile', (req, res) => {
    // eslint-disable-next-line no-console
    console.log(req.user)
    res.send('ok')
})

googleRouter.post(
    '/auth/local',
    passport.authenticate('local', {
        successRedirect: '/api/v1/auth/profile',
        failureRedirect: '/error',
    }),
)

googleRouter.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/api/v1/profile')
    },
)
