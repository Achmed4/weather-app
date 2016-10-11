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
        tday = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
        tmonth = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
        var d = new Date();
        var nday=d.getDay(),nmonth=d.getMonth(),ndate=d.getDate(),nyear=d.getYear();
        var nhour=d.getHours(),nmin=d.getMinutes(),nsec=d.getSeconds(),ap;
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
        bottomTimeElement.innerHTML = ""+tday[nday]+", "+tmonth[nmonth]+" "+ndate+", "+nyear;

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

    // var tempUnitEl = document.querySelectorAll('tr td');
    // var toggleTemp = function() {
    //
    //     if( tempUnitEl[2].innerHTML == 'C' && tempUnitEl[5].innerHTML == 'C' ) {
    //         tempUnitEl[2].innerHTML = 'F';
    //         tempUnitEl[5].innerHTML = 'F';
    //     } else if ( tempUnitEl[2].innerHTML == 'F' && tempUnitEl[5].innerHTML == 'F' ) {
    //         tempUnitEl[2].innerHTML = 'C';
    //         tempUnitEl[5].innerHTML = 'C';
    //     }
    //
    // };
    //
    // tempUnitEl[2].addEventListener("click", toggleTemp);
    // tempUnitEl[5].addEventListener("click", toggleTemp);

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
                        highTemp.innerHTML = highTempC + ' <sup>&#x2218;</sup>';
                        lowTemp.innerHTML = lowTempC + ' <sup>&#x2218;</sup>';

                        var toggleTemp = function() {

                            if( (highTemp.innerHTML == highTempC + ' <sup>&#x2218;</sup>') && (lowTemp.innerHTML == lowTempC + ' <sup>&#x2218;</sup>') ) {
                                highTemp.innerHTML = highTempF + ' <sup>&#x2218;</sup>';
                                lowTemp.innerHTML = lowTempF + ' <sup>&#x2218;</sup>';
                                tempUnitEl[2].innerHTML = 'F';
                                tempUnitEl[5].innerHTML = 'F';
                            } else if ( (highTemp.innerHTML == highTempF + ' <sup>&#x2218;</sup>') && (lowTemp.innerHTML == lowTempF + ' <sup>&#x2218;</sup>') ) {
                                highTemp.innerHTML = highTempC + ' <sup>&#x2218;</sup>';
                                lowTemp.innerHTML = lowTempC + ' <sup>&#x2218;</sup>';
                                tempUnitEl[2].innerHTML = 'C';
                                tempUnitEl[5].innerHTML = 'C';
                            }

                        };
                        tempUnitEl[2].addEventListener("click", toggleTemp);
                        tempUnitEl[5].addEventListener("click", toggleTemp);

                    }
                };
                xhr.send();
            });
        }
    }();

    var sunShowerIcon = document.querySelector('#clear').innerHTML;
    var iconElement = document.getElementById('current-icon');
    iconElement.innerHTML = sunShowerIcon;

}();
