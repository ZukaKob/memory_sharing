const {Schema, model} = require('mongoose') 


const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required:true
    }, 
    photo: {
        type:String,
        default: 'none'
    },
    description:{
        type:String,
        default: 'none'
    },
    like:{
        type:Number,
        default:0
    },
    share: {
        type:Number,
        default: 0
    },
    people_who_shared: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    people_who_liked: {
        type:Schema.Types.ObjectId,
        ref: 'user'
    },
    TAGS: [String]
})

module.exports = model('post', PostSchema)