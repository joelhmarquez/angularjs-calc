/**
 * Created by Joel on 5/18/2016.
 */
(function () {
    'use strict';

    angular
        .module('calculatorApp')
        .factory('mathFactory', mathFactory);
    function mathFactory() {
        var factory = {};

        factory.evaluate = function evaluate(array){
            if(array.length == 1){
                return array;
            }

            if(factory.prioritize(array[0], array[1], array[2])){
                switch (array[1].operator){
                    case '*':
                        array[2].number = (array[1].number * array[2].number);
                        break;
                    case '/':
                        array[2].number = (array[1].number / array[2].number);
                        break;
                    case '%':
                        array[2].number = (array[1].number % array[2].number);
                        break;
                    case '^':
                        array[2].number = Math.pow(array[1].number,array[2].number);
                        break;
                }
                array.splice(1,1);
            }
            else{
                switch (array[0].operator){
                    case '*':
                        array[1].number = (array[0].number * array[1].number);
                        break;
                    case '/':
                        array[1].number = (array[0].number / array[1].number);
                        break;
                    case '%':
                        array[1].number = (array[0].number % array[1].number);
                        break;
                    case '^':
                        array[1].number = Math.pow(array[0].number,array[1].number);
                        break;
                    case '+':
                        array[1].number = (array[0].number + array[1].number);
                        break;
                    case '-':
                        array[1].number = (array[0].number - array[1].number);
                        break;
                }
                array.splice(0,1);
            }

            return factory.evaluate(array);
        };

        factory.solution = function solution(array) {
            var open = 0;
            var close = 0;
            var depth = 0;

            if(array.length == 1){
                return array[0];
            }

            for(var i = 0; i < array.length; i++){
                if(array[i].operator == '('){
                    depth++;
                    if(depth == 1){
                        open = i;
                    }
                }
                else if(array[i].operator == ')'){
                    depth--;
                    if(depth == 0) {
                        array[open] = factory.solution(array.slice((open+1),i));
                        array.splice((open+1), (i-open));
                        i = -1;
                    }
                }
            }
            factory.evaluate(array);

            return factory.solution(array);
        };

        factory.prioritize = function prioritize (current, next, afterNext) {
            var operators = (((current.operator == '+') || (current.operator == '-')) && ((next.operator == '*') || (next.operator == '/') || (next.operator == '%') || (next.operator == '^')));
            return (operators && (afterNext != null));
        };

        return factory;
    }
})();
