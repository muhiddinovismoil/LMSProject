import express from 'express'
import morgan from 'morgan'
import passport from 'passport'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import todoRoutes from './routes/index.js'
import { googleRouter } from './routes/google.routes.js'
// import "./strategies/passport-local.js"
// import "./strategies/passport-berear.js"
// import './strategies/passport-jwt.js'
import jwt from 'jsonwebtoken'

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

// ROUTES
app.use('/api/v1', googleRouter)

// auth
// app.use(
//     '/cookies',
//     (req, res, next) => {
//         try {
//             console.log({ cookies: req.cookies })

//             // console.log({ setruession: req.session })
//             res.cookie('rememberme', 'ASSALOMY ALAYKUM')
//             res.send('ok')
//         } catch (error) {
//             next(error)
//         }
//     },
// )

// auth
// app.use(
//     '/test',
//     passport.authenticate('jwt', {
//         session: false,
//     }),
//     (req, res, next) => {
//         try {
//             // eslint-disable-next-line no-console
//             console.log({ user: req.user })
//             // console.log({ setruession: req.session })
//             res.send('ok')
//         } catch (error) {
//             next(error)
//         }
//     },
// )
// app.use('/token', (req, res, next) => {
//     try {
//         const payload = {
//             name: 'eshmat',
//             role: 'user',
//         }

//         const token = jwt.sign(payload, 'qwer', {
//             expiresIn: '1h',
//         })
//         res.send({ token })
//     } catch (error) {
//         next(error)
//     }
// })

// User.findOne({ username: username }, function (err, user) {
//     if (err) { return done(err); }
//     if (!user) { return done(null, false); }
//     if (!user.verifyPassword(password)) { return done(null, false); }
//     return done(null, user);
// });
// ERROR HANDLE
// app.use()

// set up

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
