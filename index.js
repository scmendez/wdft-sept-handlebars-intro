//from the NPM dotenv Usage section: https://www.npmjs.com/package/dotenv
//now we can access the PORT variable in the .env file
require("dotenv").config();

const express = require("express");

const app = express();
//process.env is created when we require the library above on line 3, and from there we can access our variable PORT
const port = process.env.PORT;

let {
    students,
    instructors
} = require("./data");

app.use((req, res, next) => {
    console.log("Hello im the middleware");
    next();
});

app.use(express.static(__dirname + "/public"));

//MUST be placed BEFORE the routes are defined
app.set("view engine", "hbs");
//app.set(key, value)
//key is views, value is the path
app.set("views", __dirname + "/views");
//BUT views only works with dynamic files
//sendFile sends a static file, so views doesn't come into effect, must use render instead
//so we make the file dynamic! changing from landing.html to landing.hbs

app.get("/", (req, res) => {
    //for css we need the middleware
    //when use render, it'll check for views and generate the path using the value given in the pair
    res.render("landing.hbs", {
        name: "Sandra",
        location: "Madrid",
        laptop: "mac",
        layout: false
        //this false layout tells handlebars to ignore the layout when rendering the landing.hbs file
        //by default it's set to true, so don't need to edit the other pages
    });
    //must send a second parameter, it's ALWAYS an object. can pass any key: value pair
    //this name will be available within the hbs file
});

//we've already exported and imported data.js, so now we just need to pass the students and instructors
app.get("/students", (req, res) => {
    students.sort((a, b) => {
        if (a.name > b.name) {
            return 1
        } else if (a.name < b.name) {
            return -1
        } else {
            return 0
        }
    })
    //handlebars is more for looping over info, but manipulating and editing data needs to be done within js file

    students = students.map((student) => {
        student.name = student.name.toUpperCase()
        return student
    })
    //instead of storing in a new variable, we updated the existing students array and within the map we edit the .name
    //remember that map always returns a new array with the same number of things within it

    res.render("students.hbs", {
        students
    });
    //can write just students because the key and value are the same, better than writing students: students
});

app.get("/instructors", (req, res) => {
    instructors.sort((a, b) => {
        if (a.city > b.city) {
            return 1
        } else if (a.city < b.city) {
            return -1
        } else {
            return 0
        }
    })

    res.render("instructors.hbs", {
        instructors
    });
    //can write just instructors because the key and value are the same, better than writing instructors: instructors
});

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);