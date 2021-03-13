$('.menu').click(() => {
    $('.menu').toggleClass('active');
});

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
  
function success(pos) {
    let crd = pos.coords;
    let lat = crd.latitude;
    let long = crd.longitude;
    getCurrentWeather(lat, long);
}
  
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
  
navigator.geolocation.getCurrentPosition(success, error, options);

function getCurrentWeather(lat, long) {
    return fetch(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=e61cc6cdbace4684a9f9e4eaf610a1ba`)
            .then(response => {
                if(!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(response => {
                if(response.Response === 'False') {
                    throw new Error(response.Error);
                }
                const respons = response.data;
                showCurrentWeather(respons);
            })
}

function showCurrentWeather(response) {
    $('.main-icon').attr('src', `../icons/${response[0]["weather"].icon}.png`);
    $('.city').html(`${response[0].city_name}`);
    $('.temp').html(`${response[0].temp}`);
    $('.weather-description').html(`${response[0]["weather"].description}`);

    $('.app-temp').html(`${response[0].app_temp}`);
    $('.visibility').html(`${response[0].vis}`);
    $('.pressure').html(`${response[0].aqi}`);
    $('.uv').html(`${response[0].uv}`);
    $('.humidity').html(`${response[0].rh}`);
    $('.wind-speed').html(`${response[0].wind_spd}`);
}