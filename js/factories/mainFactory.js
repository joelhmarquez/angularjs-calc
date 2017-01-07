/**
 * Created by Joel on 5/18/2016.
 */
(function () {
    'use strict';

    angular
        .module('calculatorApp')
        .factory('mainFactory', mainFactory);
    function mainFactory() {
        var factory = {};

        init();

        function init(){
            factory.values = [];    //array of objects holding number, operator pairs
            factory.currentNum = '';    //placeholder for current number being checked
        }

        factory.clear = function clear() {
            factory.values = [];
            factory.currentNum = '';
        };

        factory.checkCalculateErr = function checkCalculateErr(expresion){
            var length = expresion.length-1;

            /* return true if the expression is blank or if the last character is an operator */
            return ((expresion == '') || (factory.isOperator(expresion[length])));
        };

        factory.checkInputErr = function checkInputError(last, current) {
            return (((factory.isOperator(last) && factory.isOperator(current))) || ((last == '.') && (current == '.')))
        };

        factory.isNegative = function isNegative(char) {
            return((char == '-') && (factory.values == null || factory.currentNum == ''));
        };

        factory.isOperator = function isOperator(char) {
            return ((char == '*') || (char == '/') || (char == '%') || (char == '+') || (char == '-') || (char == '^'));
        };

        factory.isParenthesis = function isParenthesis(char) {
            return (char == '(') || (char == ')');
        };

        factory.isScientific = function isScientific(char){
            return ((char == 's') || (char == 'c') || (char == 't') || (char == '√'));
        };

        factory.nextOperator = function nextOperator(expression) {
            var length = expression.length;

            for(var i = 0; i < length; i++){
                if(factory.isOperator(expression[i])){
                    break;
                }
            }

            if(i == length){
                return 0;
            }


            return i;
        };

        factory.parseExpression = function parseExpression(expression) {
            if(expression == ''){
                if(factory.currentNum != ''){
                    factory.values.push({number: parseFloat(factory.currentNum), operator: ''});
                }
                return factory.values;
            }

            if(factory.isOperator(expression[0]) && (factory.isNegative(expression[0]) == false)){
                factory.values.push({number: parseFloat(factory.currentNum), operator: expression[0]});
                factory.currentNum = '';
            }
            else if(factory.isScientific(expression[0])){
                var scientific = factory.parseScientific(expression);
                factory.currentNum += scientific.num;
                expression = expression.slice(scientific.index);
            }
            else if(factory.isParenthesis(expression[0])){
                if(expression[0] == ')'){
                    if(factory.currentNum != ''){
                        var next = factory.nextOperator(expression);
                        factory.values.push({number: parseFloat(factory.currentNum), operator: next == 0 ? '' : expression[next]});
                        factory.currentNum = '';
                        if(next != 0){
                            expression = expression.substring(0,next) + expression.substring((next+1), expression.length);
                        }
                    }
                    factory.values.push({number: null, operator: expression[0]});
                }
                else{
                    factory.values.push({number: null, operator: expression[0]});
                }

            }
            else{
                factory.currentNum += expression[0];
            }

            expression = expression.slice(1);
            return factory.parseExpression(expression);
        };

        factory.parseScientific = function parseScientific(expression) {
            var i = 0;
            var num = '';
            var which = '';
            switch (expression[0]){
                case 's':
                    which = 's';
                    break;
                case 'c':
                    which = 'c';
                    break;
                case 't':
                    which = 't';
                    break;
                case '√':
                    which = '√';
            }

            if(which == '√'){
                expression = expression.slice(2);
            }
            else{
                expression = expression.slice(4);
            }

            while(expression[i] != ')'){
                num += expression[i];
                i++;
            }


            switch(which){
                case 's':
                    return ({num: Math.sin(parseFloat(num)), index: i+4});
                case 'c':
                    return ({num: Math.cos(parseFloat(num)), index: i+4});
                case 't':
                    return ({num: Math.tan(parseFloat(num)), index: i+4});
                    break;
                case '√':
                    return ({num: Math.sqrt(parseFloat(num)), index: i+2});
            }

        };


        return factory;
    }
})();
