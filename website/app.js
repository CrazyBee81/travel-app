/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + '.' + d.getMonth() + 1  + '.' + d.getFullYear();

const apiKey = '2ab26a436d58499cf7890d34e58ba3dd&units=metric';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const newZipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeather(baseURL, newZipCode, apiKey).then(function (data) {
            postData('/add', {temp: data.main.temp, date: newDate, feelings: feelings});
        }
    ).then(updateUI())

}

// Async Get
const getWeather = async (baseURL, zipCode, key) => {
    const res = await fetch(baseURL + zipCode + ',de' + '&appid=' + key)
    try {

        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

// Async POST
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    try {
        const newData = await response.json();
        console.log(newData)
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

// updateUI
const updateUI = async () => {
    const response = await fetch('/all');
    try {
        const newData = await response.json();
        console.log(newData);
        document.getElementById('temp').innerHTML = Math.round(newData.temp) + '°C';
        document.getElementById('date').innerHTML = newData.date;
        document.getElementById('content').innerHTML = newData.feelings;
    } catch (error) {
        console.log("error", error);
    }
}

const baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const newZipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeather(baseURL, newZipCode, apiKey).then(function (data) {
            postData('/add', {temp: data.main.temp, date: newDate, feelings: feelings});
        }
    ).then(updateUI())

}

// Async Get
const getWeather = async (baseURL, zipCode, key) => {
    const res = await fetch(baseURL + zipCode + ',de' + '&appid=' + key)
    try {

        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

// Async POST
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    try {
        const newData = await response.json();
        console.log(newData)
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

// updateUI
const updateUI = async () => {
    const response = await fetch('/all');
    try {
        const newData = await response.json();
        console.log(newData);
        document.getElementById('temp').innerHTML = (newData.temp-273.15).toFixed(2) + '°C';
        document.getElementById('date').innerHTML = newData.date;
        document.getElementById('content').innerHTML = newData.feelings;
    } catch (error) {
        console.log("error", error);
    }
}
