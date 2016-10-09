var weather = function() {

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

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position)     {
            var myRequest = function() {
                var xhr = new XMLHttpRequest();
                xhr.open('GET',  '//api.wunderground.com/api/ddfbc22639b02032/forecast10day/q/' + position.coords.latitude + ',' + position.coords.longitude + '.json');
                xhr.onreadystatechange = function() {
                    if( (xhr.status === 200) && (xhr.readyState === 4) ) {
                        var response = JSON.parse(xhr.responseText);
                        var time = response.forecast.txt_forecast.date;
                        var timeElement = document.querySelector('main header section div time');
                        timeElement.innerHTML = time;
                    }
                };
                xhr.send();
            }();
        });
    }

    var sunShowerIcon = document.querySelector('#sun-shower').innerHTML;
    var iconElement = document.getElementById('current-icon');
    iconElement.innerHTML = sunShowerIcon;

}();
