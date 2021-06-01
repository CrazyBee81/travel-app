
// build request URL for external API
const buildRequestURL = (requestParams = {}) => {
    let requestURL = '';
    try {
        switch (requestParams.api) {
            case 'weatherbit':
                requestURL = `https://api.weatherbit.io/v2.0/current?city=${requestParams.city}&country=${requestParams.countryCode}&include=minutely&key=`
                break;
            case 'pixabay':
                requestURL = `https://pixabay.com/api/?q=${requestParams.city}&category=places&orientation=horizontal&image_type=photo&key=`
                break;
            case 'geonames':
                requestURL = `http://api.geonames.org/searchJSON?name=${requestParams.city}&country=${requestParams.countryCode}&featureCode=ppl&username=`

                break;
            default:
                console.log(`API ${requestParams.api} not supported`);
        }
    } catch (error) {
        console.error(error);
    }
    return requestURL
}

// Async GET API
const getAPIData = async (key, requestParam = {}) => {
    let requestURL = buildRequestURL(requestParam)
    const response = await fetch(requestURL + key)
    try {
        const newData = await response.json();
        console.log(newData)
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

// Async POST
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

export {getAPIData}
export {postData}
