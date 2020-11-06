const express = require("express")
const router = express.Router()
const DB = require('../database/connection')
// **********ROUTES**********
router.get('/', (req, res) => { 
    return res.render('../assets/views/homepage.pug')
})


router.get('/post/create', (req, res) => { 
    return res.render('../assets/views/post/create.pug')
})
// VERY IMPORTANT TO REMEMBER THIS CONCEPT OF CONSUMING DATA
// Post request to url /post/create
router.post('/post/create', (req, res) => {
    // Get post request object which contains the data from body of user submission
    const post = req.body
    // here are some different ways to verify we're getting data from post
    // console.log(post)
    // return res.json(post)
    
    // Run a mysql query to insert body data inside of database
    DB.query(
        `INSERT INTO posts(title, description, image_url) 
        VALUES('${post.title}', '${post.description}', '${post.image_url}')`, (error, result) => {
        if(error){
            // console log Error in browser and log actual error in terminal
            console.log('There Was An Error')
            console.log(error)
            // Return to submit page if error
            return res.redirect('/post/create')
        }else{
            // Return to home if no error
            return res.redirect('/')
        }
    })
}
)

// For routing, the :id route parameter PATH should always be last, any routes from /post/routeNameHere will be treated as an id variable otherwise
router.get('/post/:id', (req, res) => { 
    // const postID = req.params

    DB.query(
        `SELECT * FROM posts WHERE id = ${req.params.id} LIMIT 1`, (error, result) => {
        if(error){
            return res.status(400).json({
                status: 'error',
                error: 'there was an error'
            })
        }else{
            console.log('results:')
            console.log(result[0])
            return res.render('../assets/views/post/show.pug', result[0])
        }
    })
})


router.get('/elements', (req, res) => { 
    return res.render('../assets/views/elements.pug')
})

router.get('/pug', (req, res) => {
    return res.render('../assets/views/testing.pug', {
        username: 'sleepyg',
        fname: 'Dee',
        lname: 'Blair',
        loggedIn: true
    })
}
)
module.exports = router;