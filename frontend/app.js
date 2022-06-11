const express = require("express");
const app = express();
const request = require("request");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");

// mongoose.connect("mongodb+srv://DigitalIT:startdigitalizing@digitalit.mj9p3.mongodb.net/?retryWrites=true&w=majority", {
//     useNewUrlParser: true
// }, function(error) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Connected to the database");
//     }
// });

// app.use(bodyParser.urlencoded({ extended: true }));

// Set the public folder as external file folder
app.use(express.static("public"));

// Set the default file type for rendering as .ejs
app.set("view engine", "ejs");

app.get("/landing", function(request, response) {
    response.render("landing");
});

app.get("/login", function(request, response) {
    response.render("login");
});

app.get("/signup", function(request, response) {
    response.render("signup");
})

// //POST Method for /signup route
// app.post("/signup", function(req, res){
//     var data = req.body;
//     userData.push(data);
//     res.redirect("/dashboard");
// });

// // Mock api request
// app.get("/dashboard", function(request, response) {
//     var name = request.query.name;
//     var email = request.query.email;
//     var password = request.query.password;
//     var phone = request.query.phone;

//     request("api-page-link&email=" + email + "&password=" + password, function (error, response, body) {
//         if (error) {
//             console.log(error);
//         } else {
//             var data = JSON.parse(body);
//             res.render("dashboard", {
//                 userData: data
//             });
//         }
//     });
// })

app.get("/dashboard", function(request, response) {
    response.render("dashboard");
})

app.get("/tokopedia", function(request, response) {
    response.render("tokopedia");
})

app.get("*", function(request, response) {
    response.send("Oops! This page does not exist.");
});

app.listen("3000", () => console.log('DigitalIT is running for the first time!'));