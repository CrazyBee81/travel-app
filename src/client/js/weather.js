/* Global Variables */


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + '.' + d.getMonth() + 1 + '.' + d.getFullYear();
const featureCode = "ppla"

const baseURL = 'http://api.geonames.org/searchJSON?name=';

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const searchTerm = document.getElementById('searchTerm').value;
    const feelings = document.getElementById('feelings').value;
    getData("http://localhost:8081/key").then((response) => {
        getData(baseURL, searchTerm, response).then(function (data) {
                postData('/add', {temp: data.main.temp, date: newDate, feelings: feelings});
            }
        ).then(() => {
            updateUI()
        })
    })
}

// Async GET
const getData = async (url, searchTerm, key) => {
    let requestURL = searchTerm !== undefined? url + searchTerm + '&featureCode=' + featureCode + '&username=' + key: url
    const response = await fetch(requestURL)
    try {
        const newData = await response.json();
        console.log(newData)
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

// Async POST JSONData
const postData = async (url = '', data) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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
    const response = await axios.get('/all');
    try {
        const newData = await response.data;
        console.log(newData);
        document.getElementById('temp').innerHTML = Math.round(newData.temp) + '°C';
        document.getElementById('date').innerHTML = newData.date;
        document.getElementById('content').innerHTML = newData.feelings;
    } catch (error) {
        console.log("error", error);
    }
}


export {performAction}
export {getData}
export {postData}
export {updateUI}