const db = require('../db')
const bcrypt = require('bcrypt')
const config = require('../config')

class Users {
    static _createPublicUser(user) {
        // return (
        //     id: user.id,
        //     firstName: user.firstName,
        //     lastName: user.lastName,
        //     email: user.email,
        //     location: user.location,
        //     date: user.date
        // )
    }
    static authenticate(creds) {
        const { email, password } = creds
        //try this
        if(user) {
            //compare the user pw
                //bcrypt.compare(password, user.password)
            //if true, 
                //return user
        }
        //throw unauthorized error after try
    }

    static async register(creds) {
        const {email, password} = creds
        const requiredCres = ['email', 'password']

        //Check to see if the user with that email exists
            //if true, bad request error
        
        //const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
        //set email to lowercase
        //set result to a query and insert, 
    }
}