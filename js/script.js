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
                    var response = JSON.parse(xhr.responseText);
                    var hour = response.forecast.simpleforecast.forecastday[0].date.hour;
                    var min = response.forecast.simpleforecast.forecastday[0].date.min;
                    var ampm = response.forecast.simpleforecast.forecastday[0].date.ampm;
                    var timeElement = document.querySelector('main header section div time');
                    timeElement.innerHTML = hour + ' : ' + min + ' ' + ampm;
                }
            };
            xhr.send();

        });
    }

    var sunShowerIcon = document.querySelector('#sun-shower').innerHTML;
    var iconElement = document.getElementById('current-icon');
    iconElement.innerHTML = sunShowerIcon;

}();
