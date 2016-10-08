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
                var request = new XMLHttpRequest();
                request.open('GET',  'https://api.apixu.com/v1/current.json?key=a13aa5f20b72400c8d9235114160710&q=' + position.coords.latitude + ',' + position.coords.longitude);
                request.onreadystatechange = function() {
                    if( (request.status === 200) && (request.readyState === 4) ) {
                        console.log(request);
                    }
                };
                request.send();
            }();
        });
    }


    var sunShowerIcon = document.querySelector('#sun-shower').innerHTML;
    var iconElement = document.getElementById('current-icon');
    iconElement.innerHTML = sunShowerIcon;

}();
