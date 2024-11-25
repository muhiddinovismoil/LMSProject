import { Router } from 'express'
import passport from 'passport'
import '../strategies/passport-google.js'

export const googleRouter = Router()

googleRouter.get('/auth/profile', (req, res) => {
    // eslint-disable-next-line no-console
    console.log({ isAuthenticated: req.isAuthenticated() })
    res.send('ok')
})

googleRouter.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    }),
)
googleRouter.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/api/v1/auth/profile')
    },
)
