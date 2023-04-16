const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/user.model')

async function login(req, res) {

    try {
        const {email, password} = req.body

        let user = await User.findOne({email: email})

        if(!user) {
            res.send({
                error: true,
                message: "Invalid email or password"
            })
            return
        }

        let matched = await bcrypt.compare(password, user.password);

        if(!matched) {
            res.send({
                error: true,
                message: "Invalid email or password"
            })
            return
        }

        // Generate JWT
        const userJwt = jwt.sign(
            {
            id: user.id,
            email: user.email,
            },
            "secret"
        );


        res.send({
            message: "Login successfull",
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token: userJwt
            }
        })
    } catch (error) {
        console.log(error)
    }

}

async function signup(req, res) {

    try {
        const {email, password, firstName, lastName } = req.body

        let user = await User.findOne({email: email})
    
        if(user) {
            res.send({
                error: true,
                message: "Email already exists"
            })
            return
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        let newUser = {
            firstName,
            lastName,
            email,
            password: hashedPassword
        }
    
        const savedUser = await User.create(newUser)
    
        const userJwt = jwt.sign(
            {
              id: savedUser.id,
              email: savedUser.email,
            },
            "secret"
        );
    
        res.send({
            error: false,
            message: "Account created successfully",
            user: {
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                email: savedUser.email,
                token: userJwt
            }
        })
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    login,
    signup
}