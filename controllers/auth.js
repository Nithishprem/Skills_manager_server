const User = require('../models/User')
const { StatusCodes } = require("http-status-codes")
const{ BadRequestError, UnauthenticatedError} =require("../errors")

const register = async (req,res) => {
    const user = await User.create({...req.body})
    const token = user.createJWT()
//     const oneDay = 24*60*60*1000
//     res.cookie('token', token, {
//         httpOnly:true,
//         expires:new Date(Date.now()+oneDay )
//     })
    res.status(StatusCodes.CREATED).json({user:{name: user.name}, token})
}

const login = async (req,res) => {
    const {email, password} =req.body

    if(!email || !password){
        throw new BadRequestError("Please provide email and password")
    }

    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError("Invalid credentials")
    }
    
    // check password
    const isPasswordCorrect = await user.comparePassword(password)

    if(!isPasswordCorrect){
        throw new UnauthenticatedError("Invalid credentials")
    }

    const token = user.createJWT()
    //set a cookie
    // const oneDay = 24*60*60*1000
    // res.cookie('token', token, {
    //     httpOnly:true,
        
    //     expires:new Date(Date.now()+oneDay ),
    //     SameSite: 'None'
    // })
    res.status(StatusCodes.OK).json({user:{name: user.name}, token})
}

module.exports = {register, login}