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

    //Clock and Date function
    var getClock = function() {
        var tday = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
        var tmonth = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
        var d = new Date();
        var nday = d.getDay(),nmonth=d.getMonth(),ndate=d.getDate(),nyear=d.getYear();
        var nhour = d.getHours(),nmin=d.getMinutes(),nsec=d.getSeconds(),ap;
        var topTimeElement = document.querySelector('main header section div time');
        var bottomTimeElement = document.querySelector('main article section time');

        if(nyear<1000) {
            nyear+=1900;
        }

        if(nhour === 0) {
            ap=" AM";nhour=12;
        } else if(nhour<12){
            ap=" AM";
        } else if(nhour === 12) {
            ap=" PM";
        } else if(nhour>12) {
            ap=" PM";
            nhour-=12;
        }

        if(nmin<=9) {
            nmin="0"+nmin;
        }

        if(nsec<=9) {
            nsec="0"+nsec;
        }

        topTimeElement.innerHTML = nhour+":"+nmin+":"+nsec+ap+"";
        bottomTimeElement.innerHTML = ""+tday[nday]+", "+tmonth[nmonth]+" "+ndate;

    };
    getClock();
    setInterval(getClock,1000);

    //Location Request
    var location = function() {
        //Making sure that your browser has geolocation object
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET',  '//api.wunderground.com/api/ddfbc22639b02032/geolookup/q/' + position.coords.latitude + ',' + position.coords.longitude + '.json');
                xhr.onreadystatechange = function() {
                    if( (xhr.status === 200) && (xhr.readyState === 4) ) {

                        //Information
                        var response = JSON.parse(xhr.responseText);
                        var country = response.location.country_name;
                        var state = response.location.state;
                        var city = response.location.city;
                        //Elements
                        var countryEl = document.querySelector('main header section h1');
                        var cityEl = document.querySelector('main header section div p');
                        countryEl.innerHTML = country;
                        cityEl.innerHTML = city;

                    }
                };
                xhr.send();
            });
        }
    }();

    //Forecast Request
    var forecast = function() {
        //Making sure that your browser has geolocation object
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET',  '//api.wunderground.com/api/ddfbc22639b02032/forecast10day/q/' + position.coords.latitude + ',' + position.coords.longitude + '.json');
                xhr.onreadystatechange = function() {
                    if( (xhr.status === 200) && (xhr.readyState === 4) ) {

                        //Information
                        var response = JSON.parse(xhr.responseText);
                        var highTempC = response.forecast.simpleforecast.forecastday[0].high.celsius;
                        var highTempF = response.forecast.simpleforecast.forecastday[0].high.fahrenheit;
                        var lowTempC = response.forecast.simpleforecast.forecastday[0].low.celsius;
                        var lowTempF = response.forecast.simpleforecast.forecastday[0].low.fahrenheit;
                        //Elements
                        var highTemp = document.getElementById('highTemp');
                        var lowTemp = document.getElementById('lowTemp');
                        var tempUnitEl = document.querySelectorAll('tr td');
                        highTemp.innerHTML = highTempC;
                        lowTemp.innerHTML = lowTempC;

                        //Toggle temp between C & F
                        var toggleTemp = function() {

                            if( (highTemp.innerHTML == highTempC) && (lowTemp.innerHTML == lowTempC) ) {
                                highTemp.innerHTML = highTempF;
                                lowTemp.innerHTML = lowTempF;
                                tempUnitEl[2].innerHTML = '<sup>&#x2218;</sup>F';
                                tempUnitEl[5].innerHTML = '<sup>&#x2218;</sup>F';
                            } else if( (highTemp.innerHTML == highTempF) && (lowTemp.innerHTML == lowTempF) ) {
                                highTemp.innerHTML = highTempC;
                                lowTemp.innerHTML = lowTempC;
                                tempUnitEl[2].innerHTML = '<sup>&#x2218;</sup>C';
                                tempUnitEl[5].innerHTML = '<sup>&#x2218;</sup>C';
                            }

                        };
                        tempUnitEl[2].addEventListener("click", toggleTemp);
                        tempUnitEl[5].addEventListener("click", toggleTemp);


                        //Updating Animated Icon and Backgrounds depending on time
                        var xhrIcon;
                        var timeDifference = function() {
                            var d = new Date();
                            var nhour = d.getHours(),nmin=d.getMinutes(),nsec=d.getSeconds(),ap;
                            var ourIcons = document.getElementById('weather-icons').children;
                            var topTimeElement = document.querySelector('main header section div time');
                            if(nhour === 0) {
                                ap=" AM";nhour=12;
                                xhrIcon = response.forecast.txt_forecast.forecastday[0].icon;
                            } else if(nhour<12){
                                ap=" AM";
                                xhrIcon = response.forecast.txt_forecast.forecastday[1].icon;
                            } else if(nhour === 12) {
                                ap=" PM";
                                xhrIcon = response.forecast.txt_forecast.forecastday[1].icon;
                            } else if(nhour>12) {
                                ap=" PM";
                                nhour-=12;
                                xhrIcon = response.forecast.txt_forecast.forecastday[0].icon;
                            }

                            if(nmin<=9) {
                                nmin="0"+nmin;
                            }

                            if(nsec<=9) {
                                nsec="0"+nsec;
                            }
                            console.log(xhrIcon);
                        };
                        timeDifference();
                        setInterval(timeDifference,1000);
                        // if( topTimeElement.innerHTML >= '6:00:00 AM' && topTimeElement <= '6:00:00 PM' ) {
                        //     xhrIcon = response.forecast.txt_forecast.forecastday[0].icon;
                        // } else {
                        //     xhrIcon = response.forecast.txt_forecast.forecastday[1].icon;
                        // }
                        var headerEl = document.querySelector('main header');
                        var blurEl = document.querySelector('.blur');
                        headerEl.style.backgroundImage = 'url(https://achmed4.github.io/weather-app/img/' + xhrIcon + '.jpg)';
                        blurEl.style.backgroundImage = 'url(https://achmed4.github.io/weather-app/img/' + xhrIcon + '.jpg)';

                        for(var i = 0; i < ourIcons.length; i++) {
                            if( ourIcons[i].getAttribute('id') === xhrIcon ) {
                                var ourIcon = ourIcons[i].innerHTML;
                                var iconEl = document.getElementById('current-icon');
                                iconEl.innerHTML = ourIcon;
                            }
                        }

                        //Updating forecast for the rest of the week
                        var forecast10day = response.forecast.simpleforecast.forecastday;
                        var ul = document.getElementById('rest-of-theweek');
                        var update = '';
                        for(var j = 1; j < forecast10day.length-3; j++) {
                            update += '<li>';
                            update += '<time>' + forecast10day[j].date.weekday_short + '</time>';
                            update += '<img src="' + forecast10day[j].icon_url + '" />';
                            update += '<span>' + forecast10day[j].high.celsius + '<sup>&#x2218;</sup></span>';
                            update += '</li>';
                        }
                        ul.innerHTML = update;

                    }
                };
                xhr.send();
            });
        }
    }();

}();
