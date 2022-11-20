const router = require('express').Router() 
// const upload = require('../middlewares/Multer')

const { User_Create_Post, User_Create_Tags, User_Add_Friends, User_Gets_Friend_Posts, User_Gets_His_Posts, User_Likes_Posts, User_Shares_Friend_Post, User_Search_Posts_With_Tag } = require('../controllers/user_controller')
const {Authenticate} = require('../middlewares/Authentication')


router.post('/post', Authenticate, User_Create_Post) 
router.post('/tags', Authenticate, User_Create_Tags)
router.post('/add_friend/:user_id', Authenticate, User_Add_Friends)
router.get('/friend/posts', Authenticate, User_Gets_Friend_Posts) 
router.get('/posts', Authenticate, User_Gets_His_Posts)
router.put('/like_post/:post_id', Authenticate, User_Likes_Posts)
router.post('/share/:post_id', Authenticate, User_Shares_Friend_Post)
router.post('/search', Authenticate, User_Search_Posts_With_Tag)

module.exports = router