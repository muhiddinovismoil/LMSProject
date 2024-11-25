var passport = require('passport')
var LocalStrategy = require('passport-local')

passport.use(
    new LocalStrategy(function verify(username, password, next) {
        db.get(
            'SELECT * FROM users WHERE username = ?',
            [username],
            function (err, user) {
                if (err) {
                    return next(err)
                }
                if (!user) {
                    return next(null, false, {
                        message: 'Incorrect username or password.',
                    })
                }

                crypto.pbkdf2(
                    password,
                    user.salt,
                    310000,
                    32,
                    'sha256',
                    function (err, hashedPassword) {
                        if (err) {
                            return next(err)
                        }
                        if (
                            !crypto.timingSafeEqual(
                                user.hashed_password,
                                hashedPassword,
                            )
                        ) {
                            return next(null, false, {
                                message: 'Incorrect username or password.',
                            })
                        }
                        return next(null, user)
                    },
                )
            },
        )
    }),
)
