const express = require("express")
const app = express()
const PORT = 3000
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

// Use public folder for custom styles
app.use(express.static("public"))

// EJS config
app.set("view engine", "ejs")

// Connecting to MongoDB database
mongoose.connect("mongodb://localhost/yelpcamp")

// body-parser config
app.use(bodyParser.urlencoded({extended: true}))

// Schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
})

// Compile model
var Campground = mongoose.model("Campground", campgroundSchema)

// GET requests
app.get("/", function(req, res){
    res.render("homepage")
})

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, queriedCampground){
        if(err){
            console.log(err)
        } else{
            res.render("campgrounds", {campgrounds: queriedCampground})
        }
    })
})

app.get("/campgrounds/new", function(req, res){
    res.render("addcampground")
})

// POST requests
app.post("/campgrounds", function(req, res){
    var name = req.body.name
    var image = req.body.image
    var newCampground = {name: name, image: image}
    Campground.create(newCampground, function(err, createdCampground){
        if(err){
            console.log(err)
        } else{
            res.redirect("campgrounds")
        }
    })
})



// App server configurations
app.listen(PORT, function(){
    console.log(`Your server is running on localhost:${PORT}`)
})