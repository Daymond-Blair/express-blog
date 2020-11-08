// **********ROUTES**********

// ********INITIAL VARIABLES**********
const express = require("express")
const router = express.Router()
const DB = require('../database/connection')

// **********GET HOME PAGE**********
router.get('/', (req, res) => { 
    return res.render('../assets/views/homepage.pug')
})

// **********GET CREATE POST PAGE**********
router.get('/post/create', (req, res) => { 
    return res.render('../assets/views/post/create.pug')
})

// **********POST TO CREATE POST PAGE**********
// VERY IMPORTANT TO REMEMBER THIS CONCEPT - INSERT POST BODY INTO DATABASE
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

// **********GET SPECIFIC POST BASED ON ID**********
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

// **********GET EDIT POST PAGE**********
router.get('/post/:id/edit', (req, res) => { 
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
            return res.render('../assets/views/post/edit.pug', {
                id: req.params.id,
                title: result[0].title,
                image_url: result[0].image_url,
                description: result[0].description
            })
        }
    })
})

// **********UPDATE**********
// **********POST UPDATE TO SPECIFIC POST**********
router.post('/post/:id/edit', (req, res) => {
    const post = req.body
    DB.query(
        `UPDATE posts SET title = '${post.title}', 
        image_url = '${post.image_url}',
        description = '${post.description}'
        WHERE id = ${req.params.id}`, 
        (error, result) => {
        if(error){
            console.log('There Was An Error')
            console.log(error)
            return res.redirect('/post/create')
        }else{
            return res.redirect(`/post/${req.params.id}`)
        }
    })
})

//**********DELETE**********
router.get('/post/:id/delete', (req, res) => {
    const post = req.body
    DB.query(
        `DELETE FROM posts WHERE id = ${req.params.id}`, 
        (error, result) => {
        if(error){
            console.log('There Was An Error')
            console.log(error)
            return res.redirect(`/post/${req.params.id}/edit`)
        }else{
            return res.redirect(`/`)
        }
    })
})

// Get elements page
router.get('/elements', (req, res) => { 
    return res.render('../assets/views/elements.pug')
})

// Get test page
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