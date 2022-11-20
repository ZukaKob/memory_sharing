const { ValidateSignature } = require("../utils/user_validations")

exports.Authenticate = async (req,res,next) => {
    const validate = await ValidateSignature(req) 
    if(validate){
        next()
    } else {
        return res.json({msg: "user not authorized"})
    }
}