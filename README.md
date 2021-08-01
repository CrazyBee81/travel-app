# TravelBee the travel planer

## About the app
TravelBee is a personal travel planer App that helps to organize itineraries. By requesting APIs of different web services, it provides the user with additional information about their destination. The information get´s stored and viewed in the sections `#my trips`. By deleting and updating picklists and cards, the stored data can be managed.

## Install
All dependencies have been included within the package.json.

1. Clone the project from the git repository for local usage.
2. Use npm install and run bundle install from your shell. 

```shell
$ git clone https://github.com/CrazyBee81/travel-app.git
$ npm install 
```
## Usage

This project uses three public APIs, which are being accessed while performing a search. Please consider, that the access keys are not included after cloning the git hub repro.

To get started, it´s required to sign up for the following api services:
[geonames](http://www.geonames.org/export/web-services.html) to get geo data
[weatherbit](https://www.weatherbit.io/account/create) to get weather data
[pixabay](https://pixabay.com/api/docs/) to get weather data

Next step is, to declare the environment variables in the .env file.

```javascript
geoname_user='user_name'
pixabay_key='your-pixabay-api-id'
weatherbit_key='your-weatherbit-api-id'
```

**Production and Development Environment**
There are two different webpack.configs one for production and another one for development. Depending on the purpose, the state of the website can be changed to make development easier or to increase the performance of the website in the browser. That means when building the app with npm a user should relate to either build-dev or build-prod, e.g. 

```shell
$ npm run build-dev
```

**Local storage and service workers**
Furthermore, it´s worth mentioning that the App uses local storage to store search data. When a user closes the page after performing a search and later revisit it, the result will reappear. The production environment makes also use of service workers, to allow offline usage. This way, a user sees a cached version of the site, even if the server is not running.  

## Contributers
This apps has been build as part of the front-end developer nano degree of  Udacity, Inc. All the setup and configuration are based on the examples provided to me in this program.  Thank´s to all the great teachers and support staff!

## Contribution Guidelines
The code in this project has been written according to the Udacity style guidelines for writing code in JavaScript, CSS, and HTML. Before starting to contribute, please have a look at the following documents.

- [CSS Style Guide] (http://udacity.github.io/frontend-nanodegree-styleguide/css.html)
- [HTML Style Guide] (http://udacity.github.io/frontend-nanodegree-styleguide/index.html)
- [JavaScript Style Guide] (http://udacity.github.io/frontend-nanodegree-styleguide/javascript.html)

Most of the course requirements have been met. However, there are some additional tasks to extend the project which are still open. Your help is welcome to program the following features:
- Add end date and display length of trip.
- Pull in an image for the country from Pixabay API when the entered location brings up no results (good for obscure localities).
- Allow user to add multiple destinations on the same trip.
- Allow the user to add hotel and/or flight data.
- Integrate the REST Countries API to pull in data for the country being visited.
- Allow the user to remove the trip.
- Instead of just pulling a single day forecast, pull the forecast for multiple days.
- Allow user to Print their trip and/or export to PDF.

License
It is free software, and may be redistributed under the terms specified in the [LICENSE](https://github.com/CrazyBee81/travel-app/blob/main/LICENSE) file.
