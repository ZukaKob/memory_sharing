const {Schema, model} = require('mongoose')


const UserSchema = new Schema({
    username: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String,required:true},
    TAGS: [
        String
    ],
    friends: [{type:Schema.Types.ObjectId, ref: 'user'}],
    shared_posts: [{
        type:Schema.Types.ObjectId, ref: 'post'
    }]
})

module.exports = model('user', UserSchema)