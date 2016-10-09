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
                xhr.open('GET',  'https://api.darksky.net/forecast/cd80205e6d9b5496aca91ffefffa3a83/' + position.coords.latitude + ',' + position.coords.longitude);
                xhr.onreadystatechange = function() {
                    if( (xhr.status === 200) && (xhr.readyState === 4) ) {
                        console.log(xhr);
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
