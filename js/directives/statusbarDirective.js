/**
 * Created by myag on 6/13/16.
 */
/**
 * @desc Adds in HTML and JS for my status bar
 * @example <jm-statusbar></jm-statusbar>
 */
(function() {
    'use strict';

    angular
        .module('calculatorApp')
        .directive('jmStatusbar', jmStatusbar);
    function jmStatusbar() {
        return {
            templateUrl: 'templates/statusbarTemplate.html',
            controller: 'WeatherController',
            controllerAs: 'weather'
        };
    }
})();