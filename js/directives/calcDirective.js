/**
 * Created by Joel on 5/19/2016.
 */
/**
 * @desc Adds in HTML and JS for my history table template
 * @example <jm-table></jm-table>
 */
(function() {
    'use strict';

    angular
        .module('calculatorApp')
        .directive('jmCalc', jmCalc);
    function jmCalc() {
       return {
           templateUrl: 'templates/calcTemplate.html'
       };
    }
})();