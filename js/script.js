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

    function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {

            // Check if the XMLHttpRequest object has a "withCredentials" property.
            // "withCredentials" only exists on XMLHTTPRequest2 objects.
            xhr.open(method, url, true);

        } else if (typeof XDomainRequest != "undefined") {

            // Otherwise, check if XDomainRequest.
            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
            xhr = new XDomainRequest();
            xhr.open(method, url);

        } else {

            // Otherwise, CORS is not supported by the browser.
            xhr = null;

        }
        return xhr;
    }

    // var xhr = createCORSRequest('GET', url);
    // if (!xhr) {
    //     throw new Error('CORS not supported');
    // }

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position)     {
            var myRequest = function() {
                // var request = new XMLHttpRequest();
                var url = 'https://api.darksky.net/forecast/cd80205e6d9b5496aca91ffefffa3a83/' + position.coords.latitude + ',' + position.coords.longitude;
                var xhr = createCORSRequest('GET', url);
                if (!xhr) {
                    throw new Error('CORS not supported');
                }
                // request.open('GET',  'https://api.darksky.net/forecast/cd80205e6d9b5496aca91ffefffa3a83/' + position.coords.latitude + ',' + position.coords.longitude);
                xhr.onreadystatechange = function() {
                    if( (request.status === 200) && (request.readyState === 4) ) {
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
