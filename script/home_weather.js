'use strict';

(function () {
    $(document).ready(function () {
        getData();
        setUpUnitChange();
    });

    let currentLocation;
    let celciusTemp;
    let condition;
    let mainCondition;

    const images = {
        Clear: "https://ak2.picdn.net/shutterstock/videos/3054394/thumb/1.jpg",
        Clouds: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
        Mist: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Mist_-_Ensay_region3.jpg",
        Drizzle: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Row_of_poplars_in_the_drizzle_-_geograph.org.uk_-_591822.jpg",
        Rain: "https://images.unsplash.com/19/drops.JPG?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2592&q=80",
        Fog: "https://images.unsplash.com/photo-1519982714547-54ccfb2c121e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2573&q=80",
    };

    async function getPosition(options) {
        return new Promise(function (resolve, reject) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(resolve, reject, options);
            } else {
                reject("No geolocation");
            }
        });
    }

    function toProperCase(input) {
        return input.replace(/\w\S*/g, text => {
            return text[0].toUpperCase() + text.substring(1).toLowerCase();
        });
    }

    function setUpUnitChange() {
        $("#unit").click(() => {
            switch ($("#temp").data("unit")) {
                case "C":
                    $("#temp").data("unit", "F").html(Math.round(celciusTemp * 1.8 + 32));
                    $("#unit").html("°F");
                    break;

                case "F":
                    $("#temp").data("unit", "C").html(celciusTemp);
                    $("#unit").html("°C");
                    break;

                default:
                    break;
            }
        });
    }

    function getData() {
        getPosition({ enableHighAccuracy: true })
            .then(position => position.coords)
            .then(coords => {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: `https://fcc-weather-api.glitch.me/api/current?lon=${coords.longitude}&lat=${coords.latitude}`,
                        cache: true
                    })
                        .done(resolve)
                        .fail(reject);
                });
            })
            .then(obj => {
                currentLocation = obj.name;
                celciusTemp = parseInt(obj.main.temp, 10);
                condition = toProperCase(obj.weather[0].description);
                mainCondition = obj.weather[0].main;
                updateWeather();
            }).catch(err => {
                console.error(err);
                $('.loader').css('display', 'none');
                $('#weather-error').css('display', 'flex');
            });
    }

    function updateWeather() {
        $("#location").html(currentLocation);
        $("#temp").html(celciusTemp);
        $("#condition").html(condition);

        if (images[mainCondition]) {
            $(".weather-image").css(
                "background-image",
                `url('${images[mainCondition]}')`
            );
            $("#weather-image-source ").removeClass("hidden").attr("href", images[mainCondition]);
        } else {
            console.error('No image for ' + mainCondition);
        }

        $('.loader').css('display', 'none');
        $('.weather-text').removeClass('hidden').addClass('coming-up');
    }
})()