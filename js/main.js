// Document Varibles
var getZipCode = document.querySelector('.zipCode');
var tempHtml = document.querySelector('.temp');
var weatherDesc = document.querySelector('.weatherDesc');
var city = document.querySelector('.city');
var changeBackground = document.getElementById('body');
var errorMessage = document.querySelector('.error-wrapper');
var weatherWrapper = document.querySelector('.content-container');
var unitAdded = '&#176;F';


// Creating the AJAX call

var getJSON = function(url, callback) {
    var jsonCall = new XMLHttpRequest();
    jsonCall.open('GET', url, true);
    jsonCall.responseType = 'json';
    jsonCall.onload = function() {
        var status = jsonCall.status;
        if (status === 200) {
            callback(null, jsonCall.response);
        } else {
            callback(status, jsonCall.response);
        }
    };
    jsonCall.send();
};

// Building the URL

function buildUrl(zip) {
    apiKey = "cd1dc209d7b31000ec4c5b2e1334cac7";
    url = "https://api.openweathermap.org/data/2.5/weather?zip=" + zip + "&units=imperial&appid=" + apiKey;

    return url;

}

// Getting and Displaying data to the Dom
function displayDataToPage() {
    var getZipCodeValue = getZipCode.value;
    getDataUrl = buildUrl(getZipCodeValue);
    getZipCode.value = "";

    var data = getJSON(getDataUrl, function(err, data) {
        if (err) {
            console.log(err);


            errorMessage.classList.add('error');
            changeBackground.removeAttribute('class');
            changeBackground.classList.add('redError');
            weatherDesc.innerHTML = "";
            tempHtml.innerHTML = "";
            city.innerHTML = "";

        } else {
            var weatherIcon = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
            weatherDesc.setAttribute('src', weatherIcon);

            city.innerHTML = data.name;

            var temp = Math.round(data.main.temp);
            tempHtml.innerHTML = temp + unitAdded;

            weatherWrapper.classList.add('weatherBoxBackground');

            switch (data.weather[0].main) {
                case "Clouds":
                    changeBackground.removeAttribute('class');
                    errorMessage.classList.remove('error');
                    changeBackground.classList.add('clouds');
                    break;

                case "Clear":
                    changeBackground.removeAttribute('class');
                    errorMessage.classList.remove('error');
                    changeBackground.classList.add('clear');
                    break;

                case "ThunderStorm":
                    changeBackground.removeAttribute('class');
                    errorMessage.classList.remove('error');
                    changeBackground.classList.add('thunderStorm');
                    break;

                case "Rain":
                    changeBackground.removeAttribute('class');
                    errorMessage.classList.remove('error');
                    changeBackground.classList.add('rain');

                    break;

                case "Atmosphere":
                    changeBackground.removeAttribute('class');
                    errorMessage.classList.remove('error');
                    changeBackground.classList.add('atmosphere');

                    break;

                case "Snow":
                    changeBackground.removeAttribute('class');
                    errorMessage.classList.remove('error');
                    changeBackground.classList.add('snow');

                    break;

                case "Drizzle":
                    changeBackground.removeAttribute('class');
                    errorMessage.classList.remove('error');
                    changeBackground.classList.add('drizzle');

                    break;

                case "Mist":
                    changeBackground.removeAttribute('class');
                    errorMessage.classList.remove('error');
                    changeBackground.classList.add('drizzle');
                    break;

                default:
                    changeBackground.removeAttribute('class');

            }

        }
    })

    return data;

}