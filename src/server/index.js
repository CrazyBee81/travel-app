// Setup empty JS object to act as endpoint for all routes
let projectData = [];

// Require Express to run index and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
const cors = require("cors");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const dotenv = require('dotenv');
dotenv.config();

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'))

// Setup Server
const port = 8081;

const listening = function () {
    console.log(`server is running on port ${port}`);
}

const index = app.listen(port, listening);

// POST route

app.post('/add', addData);

function addData(req, res) {
    let newPost = req.body
    projectData[Object.keys(projectData).length] = newPost
    res.send(projectData[Object.keys(projectData).length - 1])
    console.log(newPost)
}

// GET route
app.get('/all', function (req, res) {
    res.json(projectData)
})


// POST route
app.post('/key', function (req, res) {
    let api = req.body.key
    let key = ""
    switch (api) {
        case 'weatherbit':
            key = process.env.weatherbit_key
            break;
        case 'pixabay':
            key = process.env.pixabay_key
            break;
        case 'geonames':
            key = process.env.geoname_user
            break;
        default:
            console.log(`key ${api} not found`);
    }
    res.json(key)
})
