import db from './db.js'
import application from './app.js'
import jwt from './jwt.js'

export const config = {
    ...db,
    ...application,
    ...jwt,
}
