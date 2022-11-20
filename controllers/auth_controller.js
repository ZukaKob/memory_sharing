const { ValidateEmail } = require("../utils/email_validate")
const {
    HashPassword,
    CreateAccessToken,
    ComparePasswords
} = require("../utils/user_validations")
const User = require('../models/User')

// @Desc Register User
// @Route POST /api/v1/register 
// @Access public 
exports.RegisterUser = async (req,res) => {
    try {
        const { username, email, password } = req.body

        if( !username || !email || !password ) {
            return res.status(400).json({success:false, msg:"Enter all fields"})
        } 
        else if(!ValidateEmail(email)){
            return res.status(400).json({success:false, msg:"Enter valid email"})
        }
        else {
            const user = await User.findOne({email}) 
            if(user){
                res.status(400).json({
                success:false,
                msg:"This email is already used"
            })} else {
                const hashed_password = HashPassword(password)

                const newUser = await User({
                    username:username,
                    email:email,
                    password:hashed_password
                })
                
                await newUser.save() 
                return res.status(200).json(newUser)
            } 
        }    
    } catch (error) {
        res.status(400).json({
            error: error,
            msg: "Something wrong try again"
        })
    }
}
// @Desc Login User
// @Route POST /api/v1/login
// @Access public
exports.LoginUser = async(req,res) => {
    const {email,password} = req.body 
    if(!email || !password) {
        res.status(400).json({
            success:false,
            msg: "Please insert all fields"
        })
    } else if(!ValidateEmail(email)) {
        res.status(400).json({
            success:false,
            msg: "Please Enter valid email"
        })
    } else {
        const user = await User.findOne({email})
        if(user){
            const password_matched = await ComparePasswords(password, user.password) 
                if(password_matched) {
                    const access_token = await CreateAccessToken(user.toJSON())
                    res.status(200).json({
                        success: true,
                        token: access_token,
                        user: user 
                    })
                } else {
                    res.status(400).json({
                        success:false,
                        msg:"Please enter correct password"
                    })
                }
        } else {
            res.status(400).json({
                success:false,
                msg: "Please enter correct email"
            })
        }
    }
}