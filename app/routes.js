const express = require("express"),
router = express.Router()

// **********ROUTES**********
router.get('/', (req, res) => { 
    return res.render('../assets/views/homepage.pug')
})

router.get('/generic', (req, res) => { 
    return res.render('../assets/views/generic.pug')
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