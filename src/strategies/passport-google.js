import passport from 'passport'
import { Strategy } from 'passport-google-oauth20'

export default passport.use(
    new Strategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/api/v1/auth/google/callback',
        },
        function (accessToken, refreshToken, profile, done) {
            // eslint-disable-next-line no-console
            console.log({
                accessToken,
                refreshToken,
                profile,
                done,
            })
            done(null, profile)
        },
    ),
)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((obj, done) => {
    done(null, obj)
})
