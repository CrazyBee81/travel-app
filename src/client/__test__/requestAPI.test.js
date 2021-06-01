// Import the js file to test
import {getAPIData} from "../js/requestAPI"
import {postData} from "../js/requestAPI"

let searchObj = {
    "city": "Mainz",
    "countryCode": "DE"
}

describe("testing getData", () => {
    test("get Data should return api key", () => {
        return postData("http://localhost:8081/key", {"key": "geonames"}).then((response) => {
            getAPIData(response, {
                "city": searchObj.city,
                "countryCode": searchObj.countryCode,
                "api": "geonames"
            }).then(function (response) {
                let output = {
                    "countryCode": response.geonames[0].countryCode,
                    "city": response.geonames[0].name
                }
                expect(searchObj).toBe(output)
            })
        })
    });
});
