const User = require('../models/User')
const Post = require('../models/Post') 
const { cloudinary_js_config } = require('../utils/cloudinary')

// @Desc user create a post 
// @Route /api/v1/user/post 
// @Access private
exports.User_Create_Post = async (req,res) => {
    const user = req.user
    if(user) {
        try {

            // const cloudinary_image = await cloudinary_js_config.uploader.upload(
            //     req.file.path, {folder: 'SHARE_MEMORIES'}
            // )

            const new_post = new Post({
                user: user,
                description: req.body.description,
                TAGS: req.body.tags 
            })

            await new_post.save()
            return res.status(200).json({
                success:true,
                post: new_post
            })
        } catch (error) {
            return res.status(400).json({
                success:false
            })
        }
    } else {
        return res.status(400).json({
            success:false
        })
    }
}

// @Desc user add friend
// @Route /api/v1/user/add_friend/:user_id
// @Access private 
exports.User_Add_Friends = async (req,res) => {
    const {_id} = req.user 
    if(_id !== null) {
        
        // user is a main user who want to send another user friend request(requested user)
        const user = await User.findById(_id)
        const requested_user = await User.findById(req.params.user_id) 

        // friends returns false or true (if false user can sent friend request to another user)
        const friends = user.friends.includes(requested_user._id)
        
        if(friends) {
            return res.status(200).json({
                success:false,
                msg: "Already friends"
            })
        } else {
            user.friends.push(requested_user)
            
            await user.save() 
            return res.status(200).json({
                success:true,
                user: user 
            })
        }
    } else {
        return res.status(400).json({
            success:false 
        })
    }
}

// @Desc user gets his friends posts 
// @Route GET /api/v1/user/friend/posts
// @Access private 
exports.User_Gets_Friend_Posts = async (req,res) => {
    const {_id} = req.user 
    if(_id !== null) {
        try {
            const user = await User.findById(_id) 

            const friends = user.friends.map(friend => friend._id)
            const posts = await Post.find({user: friends}) 
            
            return res.status(200).json({
                success:true,
                posts: posts 
            })
        } catch (error) {
            return res.status(400).json({success:false})
        }
    } else  {
        return res.status(400).json({
            success:false 
        })
    }
}

// @Desc user creates a tags that he want to see on his feed
// @Route /api/v1/user/tags
// @Access private 
exports.User_Create_Tags = async (req,res) => {
    const {_id} = req.user 
    if(_id !== null) {
        try {
            const user = await User.findById(_id)
            const tags = req.body.tags
    
            tags.map(tag => {
                user.TAGS.push(tag)         
            })
    
            await user.save()
    
            return res.status(200).json({
                success:true,
                user: user 
            })
        } catch (error) {
            return res.status(400).json({
                success:false
            })
        }
    } else {
        return res.status(400).json({
            success:false
        })
    }
}

// @Desc user gets his posts 
// @Route /api/v1/user/posts 
// @Access private
exports.User_Gets_His_Posts = async (req,res) => {
    const {_id} = req.user 
    if(_id !== null) {
        const posts = await Post.find({user: _id}) 
        if(posts.length > 0) {
            return res.status(200).json({
                success:true,
                posts: posts
            })
        } else {
            return res.status(200).json({
                success:true,
                msg: "No posts yet"
            })
        }
    } else {
        return res.status(400).json({
            success:false
        })
    }
}

// @Desc user likes posts 
// @Route /api/v1/user/like_post/:post_id 
// @Access private
exports.User_Likes_Posts = async (req,res) => {
    try {
        const post = await Post.findById(req.params.post_id) 
        post.like += 1

        await post.save()

        return res.status(200).json({
            success:true,
            post: post 
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false
        })
    }
}

// Desc user shares friends memories 
// @Route /api/v1/user/share/:post_id 
// @Access private
exports.User_Shares_Friend_Post = async (req,res) => {
    const {_id} = req.user 
    try {
        const user = await User.findById(_id) 
        const post = await Post.findById(req.params.post_id)
        
        // increasing share counter 
        post.share += 1 
        
        // saving shared post to user shared posts
        user.shared_posts.push(post) 

        await user.save()
        return res.status(200).json({
            success:true,
            user: user
        }) 

    } catch (error) {
        return res.status(400).json({
            success:false
        })
    }
}

// @Desc user search feature
// @Route /api/v1/user/search 
// @Access private 
exports.User_Search_Posts_With_Tag = async (req,res) => {
    try {
        const query = { $text: {$search: req.body.search} } 

        const projection = {
            _id: 0,
            TAGS: 1
        }

        const result = await Post.find(query).projection(projection)
        console.log(result)

    } catch (error) {
        return res.status(400).json({
            success:false
        })
    }
} 

// Model.find({
//     $or:[{author:{'$regex':req.query.dsearch}},{books:{'$regex':req.query.dsearch}}]
//     },(err,data)=>{  
//         if(err){  
//             console.log(err);  
//         }else{  
//             res.render('pages/home',{data:data});  
//         }  
//     }) 

// 63754a9de6ede9e2fc70eb7d