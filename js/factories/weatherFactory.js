/**
 * Created by myag on 6/13/16.
 */
(function () {
    'use strict';

    angular
        .module('calculatorApp')
        .factory('weatherFactory', weatherFactory);
    function weatherFactory() {
        var factory = {};

        init();

        function init(){
            factory.current = {};
            factory.current.city = 'Littleton';
        }

        factory.setCurrent = function setCurrent(city, temp, font) {
            factory.current.city = city;
            factory.current.temp = temp;
            factory.current.font = font;
        };

        factory.setForecast= function setForecast(minTemp, maxTemp) {
            factory.current.minTemp = minTemp;
            factory.current.maxTemp = maxTemp;
        };

        return factory;
    }
})();