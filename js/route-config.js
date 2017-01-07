/**
 * Created by myag on 6/8/16.
 */
(function () {
    'use strict';

    angular
        .module('calculatorApp')
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/history.html'
            })
            .when('/weather', {
                templateUrl: 'partials/weather.html',
                controller: "WeatherController",
                controllerAs: "weather"
            })
            .otherwise({
                redirectTo: '/'
            });
    }

})();