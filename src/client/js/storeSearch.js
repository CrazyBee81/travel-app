import {showSearchResults} from "./updateSearch"

const storeSearchResults = async (searchResult) => {
    let itemsArray = localStorage.getItem('searchResults') ? JSON.parse(localStorage.getItem('searchResults')) : [];

    if (itemsArray.length > 0) {
        itemsArray.pop()
        itemsArray.push(searchResult);
        localStorage.setItem('searchResults', JSON.stringify(itemsArray));
    } else {
        itemsArray.push(searchResult);
        localStorage.setItem('searchResults', JSON.stringify(itemsArray));
    }
}

const loadSearchResults = async () => {
    const data = JSON.parse(localStorage.getItem('searchResults'));
    if (data[0] !== undefined) {
        top.searchObj = data[0]
        showSearchResults(data[0])
    }
}

document.addEventListener("DOMContentLoaded", loadSearchResults);

export {loadSearchResults}
export {storeSearchResults}