/**
 * Created by myag on 6/8/16.
 */
//window.location
//https://api.forecast.io/forecast/5e0ddccbff7fc41c1b68672e9ff5634f/LATITUDE,LONGITUDE
(function () {
    'use strict';

    angular
        .module('calculatorApp')
        .controller('WeatherController', WeatherController);
    WeatherController.$inject = ['$http', '$filter', 'weatherFactory'];
    function WeatherController(http, filter, weatherFactory) {
        var vm = this;
        init();

        function init(){
            vm.current = weatherFactory.current;
            vm.city = weatherFactory.current.city;
            vm.date = filter('date')(new Date(), 'MM/dd/yy');
            vm.err = 'Invalid City';
        }

        vm.animation = function animation() {
            $.when($('#loading').animate({
                opacity: 0
            }, 550)).then(function () {
                $("#loading").css("display","none");
                $("#getWeather").fadeIn();
            });
        };

        vm.getCurrent = function getCurrent() {
            var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + vm.city + ',us&units=imperial&appid=c50dce7ca477334f2f45ad6f61de0ac7';
            return http.get(url).then(function (response) {
                var temp, font;
                vm.city = response.data.name;
                temp = Math.round(response.data.main.temp) + '°F';
                font = response.data.weather[0].id;
                weatherFactory.setCurrent(vm.city, temp, font);
            }, function (err) {
                alert('Error:' + err);
            });
        };

        vm.getForecast = function getForecast() {
            var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + vm.city + ',us&units=imperial&cnt=1&appid=c50dce7ca477334f2f45ad6f61de0ac7';

            return http.get(url).then(function (response) {
                var min, max;
                min = Math.round(response.data.list[0].temp.min) + '°F';
                max = Math.round(response.data.list[0].temp.max) + '°F';
                weatherFactory.setForecast(min, max);
            }, function (err) {
                alert('Error:' + err);
            });
        };

        vm.getWeather = function getWeather() {
            if(vm.city == ''){
                vm.city = vm.current.city;
                throw(vm.err);
            }

            if(vm.city != vm.current.city || vm.current.min == null){
                Promise.all([vm.getCurrent(), vm.getForecast()]).then(vm.animation, function (err) {
                    alert('Error: ' + err);
                });
            } else {
                vm.animation();
            }
        };

        vm.refresh = function refresh() {
            vm.getCurrent().then(function () {
                $("#loading").css({
                    opacity: '1',
                    display: 'flex'
                });
                $("#getWeather").css("display","none");

                vm.animation();
            });
        };

    }
})();