const express = require("express")
const app = express()
const PORT = 3000
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

// ###########################################################################
// Configuration #############################################################
// ###########################################################################
app.use(express.static("public"))
app.set("view engine", "ejs")
mongoose.connect("mongodb://localhost/yelpcamp")
app.use(bodyParser.urlencoded({extended: true}))

// ###########################################################################
// Schema and Model ##########################################################
// ###########################################################################
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
})

var Campground = mongoose.model("Campground", campgroundSchema)

// ###########################################################################
// Routes ####################################################################
// ###########################################################################
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


// ###########################################################################
// App server configurations #################################################
// ###########################################################################
app.listen(PORT, function(){
    console.log(`Your server is running on localhost:${PORT}`)
})