import {performSearch} from "./js/performAction"
import {safeSearch} from "./js/performAction"
import {openDropdown} from "./js/updateSearch"
import {showSearchResults} from "./js/updateSearch"
import {calculateCountdown} from "./js/updateSearch"
import {clearSearchResults} from "./js/updateSearch"
import {selectImage} from "./js/updateSearch"
import {loadSearchResults} from "./js/storeSearch"
import {storeSearchResults} from "./js/storeSearch"
import {postData} from "./js/requestAPI"
import {getCardData} from "./js/updateCards"
import {createCards} from "./js/updateCards"
import {getAPIData} from "./js/requestAPI"

import './styles/banner.scss'
import './styles/cards.scss'
import './styles/footer.scss'
import './styles/header.scss'
import './styles/main.scss'

export {
    performSearch,
    getAPIData,
    postData,
    showSearchResults, openDropdown, clearSearchResults, selectImage, safeSearch, getCardData, createCards, calculateCountdown, storeSearchResults, loadSearchResults
}
