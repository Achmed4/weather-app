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
        navigator.geolocation.getCurrentPosition(function(position) {

            tday = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
            tmonth = new Array("January","February","March","April","May","June","July","August","September","October","November","December");

            function getClock() {
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

            }
            getClock();
            setInterval(getClock,1000);


            // function GetClock() {
            //
            // document.getElementById('clockbox').innerHTML=""+tday[nday]+", "+tmonth[nmonth]+" "+ndate+", "+nyear+" "+nhour+":"+nmin+":"+nsec+ap+"";
            // }


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

                    // var topTimeElement = document.querySelector('main header section div time');
                    // var bottomTimeElement = document.querySelector('main article section time');
                    var highTemp = document.getElementById('highTemp');
                    var lowTemp = document.getElementById('lowTemp');
                    // topTimeElement.innerHTML = currentTime;
                    // bottomTimeElement.innerHTML = month + ' ' + day;
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
