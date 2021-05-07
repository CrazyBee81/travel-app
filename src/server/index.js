// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run index and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const dotenv = require('dotenv');
dotenv.config();

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'))

// Setup Server
const port = 8081;

const listening = function(){
    console.log(`server is running on port ${port}`);
}

const index = app.listen(port, listening);

// POST route

app.post('/add', addWeatherData);

function addWeatherData(req,res){

    let newEntry = {
        temp: req.body.data.temp,
        date: req.body.data.date,
        feelings: req.body.data.feelings
    }
    projectData[Object.keys(projectData).length] = newEntry;
    console.log(req.body)
    res.send(projectData[0])
}

// GET route
app.get('/all', function (req, res) {
    res.send(projectData[0])
})


// GET route
app.get('/key', function (req, res) {
    res.json(process.env.userName)
})
