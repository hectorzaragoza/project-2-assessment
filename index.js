const express = require('express')
const methodOverride = require('method-override')
const db = require('./models')

const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.static('static'))
app.use(methodOverride('_method'))

// WRITE YOUR ROUTES HERE /////////////
//Get Route for Home Page
app.get('/', (req,res) => {
    //db code to display all widgets
    db.widget.findAll()
    .then(widgets => {
        res.render('home', {widgets})
    })
    .catch(error => {
        console.error
    })
})

//POST Route to Create a Widget
app.post('/', (req,res) => {
    //db code to create a widget
    db.widget.create({
        description: req.body.description,
        quantity: req.body.quantity
    })
    .then(widget => {
        //Test for created widget
        console.log('This is my new widget: ', widget)
        //redirect to home page path
        res.redirect('/')
    })
    .catch(error => {
        console.error
    })
})

//DELETE Route to Destroy a Widget
app.delete('/:id', (req, res) => {
    //db code to destroy a record by id (req.params.id)
    db.widget.destroy({
        where: {id: req.params.id}
    })
    .then(deletedItem => {
        console.log('This is my deleted Item: ', deletedItem)
        //redirect to home page path
        res.redirect('/')
    })
    .catch(error => {
        console.error
    })
})

// YOUR ROUTES ABOVE THIS COMMENT /////

app.listen(process.env.PORT || 3000, () => {
    console.log('App Running on PORT: 3000')
})