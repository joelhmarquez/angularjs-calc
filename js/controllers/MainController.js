/**
 * Created by Joel on 5/18/2016.
 */
(function () {
    'use strict';

    angular
        .module('calculatorApp')
        .controller('MainController', MainController);
    MainController.$inject = ['mainFactory', 'mathFactory', 'historyFactory', '$window'];
    function MainController(mainFactory, mathFactory, historyFactory, window) {
        var vm = this;
        init();

        function init(){
            vm.closeParen = false;
            vm.err = 'Invalid Operation';
            vm.expression = '';
            vm.history = historyFactory.history;
            vm.hidden = 0;
            vm.negative = false;
            vm.lastValue = '';
            vm.reset = false;
            vm.scientific = false;
            vm.value = '';
            vm.weather = false;
        }

        vm.addValue = function addValue() {
            var element = document.getElementById("answer");
            if(element != null){
                element.className = "bg-warning";
            }

            /* If reset switch is on and the next value is not an operator, reset */
            if(vm.reset){
                vm.reset = false;

                if(mainFactory.isOperator(vm.value) == false){
                   vm.expression = '';
                }
            }

            if(vm.closeParen){
                if((vm.value == '(' || vm.value == 'sin(' || vm.value == 'cos(' || vm.value == 'tan(' || vm.value == '√(') && mainFactory.isOperator(vm.lastValue) == false){
                    vm.closeParen = false;
                    vm.expression += '*';
                }
            }
            /* If the entered value is a negative, allow it next to follow  */
            if(vm.negative){
                vm.negative = false;
            }
            /* otherwise check for errors */
            else if(mainFactory.checkInputErr(vm.lastValue, vm.value)){
                document.getElementById("answer").className = "bg-danger";
                throw vm.err;
            }

            vm.lastValue = vm.value;
            vm.expression += vm.value;
            vm.hidden = 0;
        };

        vm.back = function back() {
            var element = document.getElementById("answer");
            if(element != null){
                element.className = "bg-warning";
            }
            vm.reset = false;
            vm.lastValue = '';
            vm.expression = vm.expression.slice(0, -1);
            vm.hidden = 0;

        };

        vm.calculate = function calculate() {
            var oldExpression = vm.expression;
            var length = oldExpression.length-1;

            /* Check for any errors */
            if(mainFactory.checkCalculateErr(vm.expression)){
                document.getElementById("answer").className = "bg-danger";
                throw vm.err;
            }

            if(vm.scientific && oldExpression[length] != ')'){
                vm.scientific = false;
                oldExpression += ')';
            }

            /* Evaluate the expression and set the answer equal to the expression variable */
            vm.expression = mathFactory.solution(mainFactory.parseExpression(oldExpression)).number.toString();

            /* Add expression, answer pair to history */
            historyFactory.addHistory(oldExpression, vm.expression);

            /* Toggle reset */
            vm.reset = true;

            /* Reset Booleans */
            vm.closeParen = false;
            vm.negative = false;
            vm.scientific = false;
            vm.hidden = 0;

            mainFactory.clear();
        };

        vm.clear = function clear() {
            vm.hidden++;

            if(vm.hidden == 3){
                vm.weather = ~vm.weather;
                vm.hidden  = 0;

                if(vm.weather)
                    window.location.href = '#weather';
                else
                    window.location.href = '#';
            }

            var element = document.getElementById("answer");
            if(element != null){
                element.className = "bg-warning";
            }
            vm.expression = '';
        };

        vm.clearAll = function clearAll(){
            var element = document.getElementById("answer");
            if(element != null){
                element.className = "bg-warning";
            }
            vm.expression = '';
            historyFactory.clearHistory();
            vm.hidden = 0;
        };

    }
})();