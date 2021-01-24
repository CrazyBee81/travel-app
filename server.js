// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;

const listening = function(){
    console.log(`server is running on port ${port}`);
}

const server = app.listen(port, listening);

// POST route
let data = [];

app.post('/add', addWeatherData);

function addWeatherData(req,res){

    let newEntry = {
        temp: req.body.temp,
        date: req.body.date,
        feelings: req.body.feelings
    }

    data.push(newEntry)
    console.log(data)
}

// GET route
app.get('/all', function (req, res) {
    res.send(data[0])
})
