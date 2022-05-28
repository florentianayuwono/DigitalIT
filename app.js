const express = require('express');
const app = express();

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

app.get("/dashboard", function(request, response) {
    response.render("dashboard");
})

app.get("*", function(request, response) {
    response.send("Oops! This page does not exist.");
});

app.listen("3000", () => console.log('DigitalIT is running for the first time!'));