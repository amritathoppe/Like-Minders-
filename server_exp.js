const logger = require("morgan");
const bcrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");

const MONGO_URL = "mongodb://localhost/mean";
const MONGO_USERNAME = "matchMaker";
const MONGO_PASSWORD = "p@ssw0rd";

mongoose.connect(MONGO_URL, {
    auth: {
        user: MONGO_USERNAME,
        password: MONGO_PASSWORD
    },
    useNewUrlParser: true
});
mongoose.set("useCreateIndex", true);
let meanSchema = require("./mean_schema.js").meanSchema;

const User = mongoose.model("User", meanSchema);


mongoose.connection.once("open", function () {
    console.log("Open connection!");
});

var app = express();
// Logging
app.use("/", logger("dev"));
// Static files
app.use("/static", express.static("static"));
// Body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//use sessions for tracking logins
app.use(session({
    secret: "it is a secret to everybody",
    resave: true,
    saveUninitialized: false
}));

// Sending those who type "localhost" to
// "localhost/static/html/home.html"
app.get("/", function (req, res) {
    res.redirect("/static/html/home.html");
});

// User is registering
app.post("/save/registration", function (req, res) {

    console.log("Saving Registration Information");
    console.log(req.body);

    //Username Validation - not empty
    if (!req.body.username || req.body.username.length <= 0) {
        res.writeHead(404);
        res.end("Username is required!");
        return;
    }
    //Username Validation- email format
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!req.body.username.match(mailFormat)) {
        res.writeHead(404);
        res.end("Username isnt in Email Format!");
        return;
    }
    //Password Validation - not empty
    if (!req.body.password || req.body.password.length <= 0) {
        res.writeHead(404);
        res.end("Password is required!");
        return;
    }


    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if(err)
        {
            res.writeHead(412);
            res.end(JSON.stringify(err,null,2));
        }
        else{
        console.log(req.body.password + " is hashed to: " + hash);
            let newUser = new User({
                userName: req.body.username,
                password: hash
            });
        console.log(newUser);

        newUser.save({}, function (err, doc) {
            if (err) {
                console.log(err);
                res.writeHead(412);
                res.end("Registration not successful, Username Already exists!");

            } else {
                console.log("\nSaved document: " + doc);
                res.writeHead(200);
                res.end("Registration Success!");

            }
        });}
    });
});

// User is logging in
app.post("/login", function (req, res) {
    console.log("Checking Login Credentials");
    console.log(req.body);
    //Add validation
    //Username Validation - not empty
    if (!req.body.username || req.body.username.length <= 0) {
        res.writeHead(404);
        res.end("Username is required!");
        return;
    }
    //Username Validation- email format
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!req.body.username.match(mailFormat)) {
        res.writeHead(404);
        res.end("Username isnt in Email Format!");
        return;
    }
    //Password Validation - not empty
    if (!req.body.password || req.body.password.length <= 0) {
        res.writeHead(404);
        res.end("Password is required!");
        return;
    }
    //Find user and compare passwords
    User.findOne({userName:req.body.username},function(err,userDoc)
    {
        if (err) {
            console.log(err);
            throw err;
        }
        if(userDoc)
        {
            bcrypt.compare(req.body.password,userDoc.password,function(err, result){

                if(result)
                {
                    console.log("Passwords match");
                    req.session.userId = userDoc._id;
                    res.writeHead(200);
                    res.end("Login Success!");
                }
                else {
                    console.log("Passwords don't match");
                    res.writeHead(412);
                    res.end("Incorrect Password");
                }
            });
        }
        else {console.log("username itsnt exsisting!");
            res.writeHead(412);
            res.end("Username Incorrect!");
        }
    });

});

// Get User Info from Session
app.get("/user", function (req, res) {
    console.log("Getting _id from the session.");
    console.log(req.session.userId);

    if (req.session.userId) {
        User.findOne({ _id: req.session.userId })
            .exec(function (err, user) {
                if (err) {
                    console.log(err);
                    res.writeHead(400);
                    res.end(JSON.stringify(err));
                } else if (!user) {
                    var err = new Error("User not found.");
                    console.log(err);
                    res.writeHead(400);
                    res.end(JSON.stringify(err));
                } else {
                    console.log(user);
                    res.writeHead(200);
                    res.end(JSON.stringify(user));
                }
            });
    } else {
        var err = new Error("You must be logged in to view this page.");
        console.log(err);
        res.writeHead(401);
        res.end("You must be logged in to view this page.");
    }
});

// User is logging out
app.get("/logout", function(req, res, next) {
    if (req.session) {
        console.log("Deleting the session");
        req.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                return res.redirect("/");
            }
        });
    }
});

app.post("/personalProfile", function(req,res){
    console.log("Personal Profile");
    console.log(req.body);
   if(req.body.firstName.length >50)
    {
        res.writeHead(404);
        res.end("Update unsuccessful! First Name max 50 chars!");
        return;
    }
    if(req.body.lastName.length >50)
    {
        res.writeHead(404);
        res.end("Update unsuccessful! Last Name max 50 chars!");
        return;
    }
    if(req.body.interest.length >2000)
    {
        res.writeHead(404);
        res.end("Update unsuccessful! Interest max 2000 chars!");
        return;
    }

    User.findOne({userName:req.body.sessionUser},function(err,doc)
    {
        if (err) {
            console.log(err);
            throw err;
        }
        if(doc)
        {
            doc.firstName = req.body.firstName;
            doc.lastName = req.body.lastName;
            doc.interests = req.body.interest;
            doc.profileImage = req.body.ImageUpload;
            doc.state    = req.body.state;

            doc.save();
            console.log("Profile Updated!");
            res.writeHead(200);
            res.end("Profile Updated!");

        }
        else {
            console.log("itsn't existing!");
            res.writeHead(412);
            res.end("Username Incorrect!Login");
        }
    });


});

app.post("/searchProfile", function(req, res){
    console.log("Search Profile");
    console.log(req.body);
    console.log(req.body.searchBy);
    console.log(req.body.searchTerm);
    console.log(req.body.sessionUser);
    if(!req.body.searchBy)
    {

        res.writeHead(404);
        res.end("Check Interests/Locality!");
        return;

    }
    if(!req.body.searchTerm)
    {

        res.writeHead(404);
        res.end("Enter Search Term!");
        return;

    }

    if (req.body.searchBy == "state") {

        User.find({$and :[{state: req.body.searchTerm}, {"userName" : {$ne : req.body.sessionUser}}]},function (err, doc) {

            if (err) {
                console.log(err);
                throw err;
            }
            if (doc) {
                console.log(JSON.stringify(doc));
                if(JSON.stringify(doc) == "[]")
                {
                    console.log("NotExists");
                    res.writeHead(412);
                    res.end("Profiles with "+req.body.searchTerm +" locality not found!\"");
                }
                else {
                    res.writeHead(200);
                    res.end(JSON.stringify(doc , null, 2));}

            }
        });
    }
    if (req.body.searchBy == "interests") {


        User.find({$and :[{interests: req.body.searchTerm}, {"userName" : {$ne : req.body.sessionUser}}]}, function (err, doc) {

            if (err) {
                console.log(err);
                throw err;
            }
            if (doc) {
                console.log(JSON.stringify(doc));
                if(JSON.stringify(doc) == "[]")
                {
                    console.log("NotExists");
                    res.writeHead(412);
                    res.end("Profiles with "+ req.body.searchTerm+" interests not found!");
                }
                else {
                    res.writeHead(200);
                    res.end(JSON.stringify(doc , null, 2));}
            }
        });
    }

});

// Listening to port 8080
app.listen(8080);