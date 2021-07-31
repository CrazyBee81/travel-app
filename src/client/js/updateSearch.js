// show search results
const showSearchResults = async (searchResult) => {
    if (searchResult !== undefined) {
        let iconId = searchResult.weatherData.icon
        let formatURL = searchResult.imgData.formatURL
        let remainingDays = calculateCountdown(searchResult.date)
        document.querySelector('form .city input').value = searchResult.city
        document.querySelector('form .country select').value = searchResult.countryCode
        document.querySelector('form .date input').value = searchResult.date
        document.querySelector('form .weather .destination').innerHTML = `Current weather in ${searchResult.city}:`
        document.querySelector('form .weather .weather_icon').src = `./src/client/media/icons/${iconId}.png`
        document.querySelector('form .weather .description').innerHTML = searchResult.weatherData.description
        document.querySelector('form .image-holder img').src = formatURL
        document.querySelector('form .countdown p').innerHTML = `Your Trip to ${searchResult.city} is ${remainingDays} days away`
        document.querySelector('form').classList.add('result')
        document.querySelector('#banner').classList.add('result')
        document.querySelector('#app').classList.add('result')
        document.querySelector('#banner_wrapper').classList.add('result')
        toggleForm()
        return searchResult
    } else {
        toggleForm()
    }
}

// clear search results
document.getElementById('cancel').addEventListener('click', clearSearchResults);

function clearSearchResults(event) {
    try {
        event.preventDefault();
    } catch (event) {
    }
    let inputFlieds = document.querySelectorAll('form input')
    let images = document.querySelectorAll('form img')
    let paragraphs = document.querySelectorAll('form p')

    for (let field of inputFlieds) {
        field.innerHtml = ""
    }
    for (let image of images) {
        image.src = ""
    }
    for (let paragraph of paragraphs) {
        paragraph.innerHtml = ""
    }
    toggleForm()
    document.querySelector('form').classList.remove('result')
    document.querySelector('#banner').classList.remove('result')
    document.querySelector('#app').classList.remove('result')
    document.querySelector('#banner_wrapper').classList.remove('result')

    localStorage.clear();
}

// toggle search banner
const toggleForm = () => {
    const toggleSelectors = ['form .countdown','form .weather','form .image-holder','.form_element.packlist','.form_element.notes','.btn #safe','.btn #cancel','.btn #generate']
    for (let selector of toggleSelectors) {
        let element = document.querySelector(selector)
        if (element.classList.contains('active')) {
            element.classList.replace("active", "inactive");
        } else {
            element.classList.replace("inactive", "active");
        }
    }
}

// toggle left input
function openDropdown(element) {
    let nodes = element.parentElement.children
    for (let node of nodes) {
        if (node.tagName !== 'A') {
            node.classList.toggle('open');
        }
    }
};

// countdown to event
const calculateCountdown = (date) => {
    var countDownDate = new Date(date).getTime();
    var now = new Date().getTime();
    var timeleft = countDownDate - now;
    var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    return days
}

// select image
const selectImage = (responseObj = {}, postId) => {

    const images = responseObj.hits
    let imgData = {
        "height": "",
        "width": "",
        "formatURL": "",
        "tags": "",
        "copyright": "",
    };

    // choose most popular image
    const mostPopular = (img) => {
        let mostDownloads = true
        if (imgData.downloads > img.downloads) {
            mostDownloads = false
        }
        return mostDownloads
    }

    // set image data
    for (let image of images) {
        const deltaRatio = (image.webformatHeight / 2) * 3 - image.webformatWidth
        const fitContent = deltaRatio < 50 && deltaRatio > -50 ? true : false
        if (imgData.downloads === undefined && fitContent) {
            imgData.height = image.webformatHeight
            imgData.width = image.webformatWidth
            imgData.formatURL = image.webformatURL
            imgData.tags = image.tags
            imgData.copyright = image.user
            imgData.downloads = image.downloads
        } else if (imgData.downloads !== undefined && fitContent && mostPopular(image)) {
            imgData.height = image.webformatHeight
            imgData.width = image.webformatWidth
            imgData.formatURL = image.webformatURL
            imgData.tags = image.tags
            imgData.copyright = image.user
            imgData.downloads = image.downloads
        }
    }
    return imgData
}


export {openDropdown}
export {selectImage}
export {showSearchResults}
export {clearSearchResults}
export {calculateCountdown}