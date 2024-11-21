import express from 'express'
import morgan from 'morgan'
import passport from 'passport'
import session from 'express-session'
import LocalStrategy from 'passport-local'
import cookieParser from 'cookie-parser'

import todoRoutes from './routes/index.js'
import { Service } from './services/index.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(
    session({
        secret: 'asdvfbfgtre',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: true,
        },
    }),
)

app.use(passport.initialize())
app.use(passport.session())

passport.use(
    new LocalStrategy(async function (username, password, done) {
        try {
            const currentUser = await Service.findByUsername(username)
            if (!currentUser) {
                return done(null, false, {
                    message: 'Incorrect username or password.',
                })
            }

            done(null, currentUser)

            // User.findOne({ username: username }, function (err, user) {
            //     if (err) { return done(err); }
            //     if (!user) { return done(null, false); }
            //     if (!user.verifyPassword(password)) { return done(null, false); }
            //     return done(null, user);
            // });
        } catch (error) {
            done(error)
        }
    }),
)

// ERROR HANDLE
// app.use()

// set up

// auth
app.use(
    '/test',
    passport.authenticate('local', {
        session: false,
    }),
    (req, res, next) => {
        try {
            console.log(req.user)
            res.send('ok')
        } catch (error) {
            next(error)
        }
    },
)

app.use('/api/v1', todoRoutes)

// app.get('/api/v1/setup', async (req, res) => {
//     await createUserTable()
//     res.send('Table created!.')
// })

app.use((err, req, res, next) => {
    if (err) {
        return res.send(err.message)
    }
    return res.send('not found')
})

export default app
