/**
 * Created by joel on 5/23/16.
 */
(function () {
    'use strict';
    
    angular
        .module('calculatorApp')
        .factory('historyFactory', historyFactory);
    function historyFactory() {
        var factory = {};

        init();

        function init(){
            factory.history = [];   //Array of objects that will store my history as expression: expression, answer: answer, totalOps: totalOps
        }

        factory.addHistory = function addHistory(expression, answer) {
            return factory.history.push({expression: expression, answer: answer});
        };

        factory.clearHistory = function clearHistory() {
            var i;
            var length = factory.history.length;
            for(i = 0; i < length; i++){
                factory.history.pop();
            }
        };
        
        return factory;
    }
})();