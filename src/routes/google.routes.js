import { Router } from 'express'
import passport from 'passport'
import '../strategies/passport-google.js'

export const googleRouter = Router()

googleRouter.get('/profile', (req, res) => {
    // eslint-disable-next-line no-console
    console.log(req.user)
    res.send('ok')
})

googleRouter.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile'] }),
)

googleRouter.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/api/v1/profile')
    },
)
