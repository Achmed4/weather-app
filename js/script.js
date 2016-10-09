var weather = function() {

    //Changing active class for links on Click
    var activeClass = function() {
        var listItems = document.querySelectorAll('nav ul li');
        function handleClick() {
            for (var i = 0; i < listItems.length; i++) {
                listItems[i].classList.remove('active');
            }
            this.classList.add('active');
        }
        for (var i = 0; i < listItems.length; i++) {
            listItems[i].addEventListener('click', handleClick);
        }
    }();

    //Making sure that your browser has geolocation object
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position)     {

            var xhr = new XMLHttpRequest();
            xhr.open('GET',  '//api.wunderground.com/api/ddfbc22639b02032/forecast10day/q/' + position.coords.latitude + ',' + position.coords.longitude + '.json');
            xhr.onreadystatechange = function() {
                if( (xhr.status === 200) && (xhr.readyState === 4) ) {

                    //Information
                    var response = JSON.parse(xhr.responseText);
                    var currentTime = response.forecast.txt_forecast.date;
                    var hour = response.forecast.simpleforecast.forecastday[0].date.hour;
                    var min = response.forecast.simpleforecast.forecastday[0].date.min;
                    var ampm = response.forecast.simpleforecast.forecastday[0].date.ampm;
                    var month = response.forecast.simpleforecast.forecastday[0].date.monthname;
                    var day = response.forecast.simpleforecast.forecastday[0].date.day;
                    var highTempC = response.forecast.simpleforecast.forecastday[0].high.celsius;
                    var highTempF = response.forecast.simpleforecast.forecastday[0].high.fahrenheit;
                    var lowTempC = response.forecast.simpleforecast.forecastday[0].low.celsius;
                    var lowTempF = response.forecast.simpleforecast.forecastday[0].low.fahrenheit;
                    //Elements
                    var topTimeElement = document.querySelector('main header section div time');
                    var bottomTimeElement = document.querySelector('main article section time');
                    var highTemp = document.getElementById('highTemp');
                    var lowTemp = document.getElementById('lowTemp');
                    topTimeElement.innerHTML = currentTime;
                    bottomTimeElement.innerHTML = month + ' ' + day;
                    highTemp.innerHTML = highTempC;
                    lowTemp.innerHTML = lowTempC;

                }
            };
            xhr.send();

        });
    }

    var sunShowerIcon = document.querySelector('#clear').innerHTML;
    var iconElement = document.getElementById('current-icon');
    iconElement.innerHTML = sunShowerIcon;

}();
