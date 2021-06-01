import {storeSearchResults} from "../js/storeSearch"
import {loadSearchResults} from "../js/storeSearch"
import "babel-polyfill"

let searchObj = {
    "city": "Mainz",
    "countryCode": "DE"
}

describe("testing getData", () => {
    test("get Data should return api key", () => {
        storeSearchResults(searchObj)
        const output = loadSearchResults()
        expect(searchObj).toBe(output)
    });
});