import {showSearchResults} from "./updateSearch"
import {selectImage} from "./updateSearch"
import {clearSearchResults} from "./updateSearch"
import {storeSearchResults} from "./storeSearch"
import {getAPIData} from "./requestAPI"
import {postData} from "./requestAPI"

/* Global Variables */
document.getElementById('generate').addEventListener('click', performSearch);

let postID
let searchObj = {}

function safeSearch(event) {
    try {
        event.preventDefault();
    } catch (event) {
    }
    console.log('ping')
    if(searchObj.imgData !== undefined && searchObj.weatherData !== undefined ) {
        searchObj.category = document.querySelector('.category select').value
        searchObj.notes = document.querySelector('.notes input').value
        searchObj.packlist = document.querySelector('.packlist input').value
        postData("http://localhost:8081/add", searchObj)
        clearSearchResults()
    } else{
        alert('could not fetch api data!')
    }

}

function performSearch(event) {
    try {
        event.preventDefault();
    } catch (event) {
    }

    postID = Date.now();
    searchObj = {
        "city": document.querySelector('.city > input').value,
        "countryCode": document.querySelector('.country select').value,
        "date": document.querySelector('.date input').value,
        "id": postID
    }

    if (inputValidator(searchObj)) {
        postData("http://localhost:8081/key", {"key": "geonames"}).then((response) => {
            getAPIData(response, {
                "city": searchObj.city,
                "countryCode": searchObj.countryCode,
                "api": "geonames"
            }).then(function (response) {
                    let newGeoData = {
                        "id": postID,
                        "countryCode": response.geonames[0].countryCode,
                        "city": response.geonames[0].name,
                    }
                }
            ).then(() => {
                postData("http://localhost:8081/key", {"key": "weatherbit"}).then((response) => {
                    getAPIData(response, {
                        "city": searchObj.city,
                        "countryCode": searchObj.countryCode,
                        "api": "weatherbit"
                    }).then(function (response) {
                        let newData = {
                            "id": postID,
                            "weatherData": {
                                "city_weather": response.data[0].city_name,
                                "country_weather": response.data[0].country_code,
                                "icon": response.data[0].weather.icon,
                                "description": response.data[0].weather.description,
                            }
                        };
                        searchObj.weatherData = newData.weatherData
                    }).then(() => {
                            postData("http://localhost:8081/key", {"key": "pixabay"}).then((response) => {
                                getAPIData(response, {
                                    "city": searchObj.city,
                                    "api": "pixabay"
                                }).then(function (response) {
                                    let newData = {
                                        "id": postID,
                                        "imgData": selectImage(response, postID)
                                    };
                                    searchObj.imgData = newData.imgData
                                    console.log(newData)
                                }).then(() => {
                                    showSearchResults(searchObj)
                                    storeSearchResults(searchObj)
                                })
                            })
                        }
                    )
                })
            })
        })
    }
}

const inputValidator = (searchObj) => {
    let keys = ["city", "countryCode", "date"]
    let msg = []
    let inputValid = false

    for (let key of keys) {
        if (searchObj[key].length === 0 || searchObj[key] === "select country") {
            msg.push(key)
        }
    }
    if (msg.length === 3) {
        alert(`missing input for flied ${msg[0]},${msg[1]} and ${msg[2]}`)
    } else if (msg.length === 2) {
        alert(`missing input for flied ${msg[0]} and ${msg[1]}`)
    } else if (msg.length === 1) {
        alert(`missing input for flied ${msg[0]}`)
    } else {
        inputValid = true
    }
    return inputValid
}

export {safeSearch}
export {performSearch}
export {selectImage}