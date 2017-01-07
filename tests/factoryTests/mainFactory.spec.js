/**
 * Created by joel on 5/23/16.
 */
(function() {
    'use strict';

    describe('mainFactory', function () {
        beforeEach(module('calculatorApp'));

        var factory;
        
        beforeEach(inject(function (mainFactory) {
            factory = mainFactory;
        }));

        describe('clear function', function () {
            it('should reset all variables', function () {
                factory.values = [{
                    number: 4, operator: '*'
                }, {
                    number: 8, operator: ''
                }
                ];
                expect(factory.values.length).toEqual(2);

                factory.currentNum = '8';

                factory.clear();

                expect(factory.values.length).toEqual(0);
                expect(factory.currentNum).toBe('');
            });
        });

        describe('checkCalculateErr function', function () {
            it('should return true if the given expression is empty', function () {
                var expression = '';

                expect(factory.checkCalculateErr(expression)).toBeTruthy();
            });

            it('should return true if the given expression ends with an operator', function () {
                var expression1 = '8*'
                    , expression2 = '8/'
                    , expression3 = '8%'
                    , expression4 = '8+'
                    , expression5 = '8-'
                    , expression6 = '^';

                expect(factory.checkCalculateErr(expression1)).toBeTruthy();
                expect(factory.checkCalculateErr(expression2)).toBeTruthy();
                expect(factory.checkCalculateErr(expression3)).toBeTruthy();
                expect(factory.checkCalculateErr(expression4)).toBeTruthy();
                expect(factory.checkCalculateErr(expression5)).toBeTruthy();
                expect(factory.checkCalculateErr(expression6)).toBeTruthy();
            });

            it('should return false if the expression is valid (ends with a number or parenthesis)', function () {
                var expression1 = '8*3'
                    , expression2 = '8/6'
                    , expression3 = '8%9'
                    , expression4 = '8+12'
                    , expression5 = '8-15'
                    , expression6 = '(8-15)';

                expect(factory.checkCalculateErr(expression1)).toBeFalsy();
                expect(factory.checkCalculateErr(expression2)).toBeFalsy();
                expect(factory.checkCalculateErr(expression3)).toBeFalsy();
                expect(factory.checkCalculateErr(expression4)).toBeFalsy();
                expect(factory.checkCalculateErr(expression5)).toBeFalsy();
                expect(factory.checkCalculateErr(expression6)).toBeFalsy();
            });

        });

        describe('checkInputErr function', function () {
            it('should return true if the last and current character in the expression are both operators', function () {
                var multiplication = '*'
                    , division = '/'
                    , modulo = '%'
                    , plus = '+'
                    , minus = '-'
                    , power = '^';

                expect(factory.checkInputErr(multiplication, multiplication)).toBeTruthy();
                expect(factory.checkInputErr(multiplication, division)).toBeTruthy();
                expect(factory.checkInputErr(multiplication, modulo)).toBeTruthy();
                expect(factory.checkInputErr(multiplication, plus)).toBeTruthy();
                expect(factory.checkInputErr(multiplication, minus)).toBeTruthy();
                expect(factory.checkInputErr(multiplication, power)).toBeTruthy();

                expect(factory.checkInputErr(division, division)).toBeTruthy();
                expect(factory.checkInputErr(division, modulo)).toBeTruthy();
                expect(factory.checkInputErr(division, plus)).toBeTruthy();
                expect(factory.checkInputErr(division, minus)).toBeTruthy();
                expect(factory.checkInputErr(division, power)).toBeTruthy();

                expect(factory.checkInputErr(modulo, modulo)).toBeTruthy();
                expect(factory.checkInputErr(modulo, plus)).toBeTruthy();
                expect(factory.checkInputErr(modulo, minus)).toBeTruthy();
                expect(factory.checkInputErr(modulo, power)).toBeTruthy();

                expect(factory.checkInputErr(plus, plus)).toBeTruthy();
                expect(factory.checkInputErr(plus, minus)).toBeTruthy();
                expect(factory.checkInputErr(plus, power)).toBeTruthy();

                expect(factory.checkInputErr(minus, minus)).toBeTruthy();
                expect(factory.checkInputErr(minus, power)).toBeTruthy();

                expect(factory.checkInputErr(power, power)).toBeTruthy();

            });

            it('should return true if both the last and current characters are decimals', function () {
                var decimal = '.';

                expect(factory.checkInputErr(decimal, decimal)).toBeTruthy();
            });

            it('should return false if the expression is valid (number following an operator)', function () {
                var multiplication = '*'
                    , division = '/'
                    , modulo = '%'
                    , plus = '+'
                    , minus = '-'
                    , power = '^';
                var number = 7;

                expect(factory.checkInputErr(multiplication, number)).toBeFalsy();
                expect(factory.checkInputErr(division, number)).toBeFalsy();
                expect(factory.checkInputErr(modulo, number)).toBeFalsy();
                expect(factory.checkInputErr(plus, number)).toBeFalsy();
                expect(factory.checkInputErr(minus, number)).toBeFalsy();
                expect(factory.checkInputErr(power, number)).toBeFalsy();
            });

            it('should return false if the expression is valid (operator following a number)', function () {
                var multiplication = '*'
                    , division = '/'
                    , modulo = '%'
                    , plus = '+'
                    , minus = '-'
                    , power = '^';
                var number = 7;

                expect(factory.checkInputErr(number, multiplication)).toBeFalsy();
                expect(factory.checkInputErr(number, division)).toBeFalsy();
                expect(factory.checkInputErr(number, modulo)).toBeFalsy();
                expect(factory.checkInputErr(number, plus)).toBeFalsy();
                expect(factory.checkInputErr(number, minus)).toBeFalsy();
                expect(factory.checkInputErr(number, power)).toBeFalsy();
            });

        });

        describe('isNegative function', function () {
            it('should return true if current char is - and is the first char in expression', function () {
               expect(factory.isNegative('-')).toBeTruthy();
            });

            it('should return true if current char is - and the previous char was an operator', function () {
               /* If the last char was an operator, factory.currentNum has been reset to '' */
                factory.currentNum = '';

                expect(factory.isNegative('-')).toBeTruthy();
            });

            it('should return false if current char is - but is not the first char, and the previous is not an operator', function () {
                /* There is a pre-existing values */
                factory.values = [{
                   number: 10, operator: '+'
                }];
                factory.currentNum = '10';

                expect(factory.isNegative('-')).toBeFalsy();

            });

            it('should return false if current char is NOT -', function () {
                var multiplication = '*'
                    , division = '/'
                    , modulus = '%'
                    , plus = '+'
                    , power = '^';

                expect(factory.isNegative(multiplication)).toBeFalsy();
                expect(factory.isNegative(division)).toBeFalsy();
                expect(factory.isNegative(modulus)).toBeFalsy();
                expect(factory.isNegative(plus)).toBeFalsy();
                expect(factory.isNegative(power)).toBeFalsy();


            });
        });

        describe('isOperator function', function () {
            it('should return true if a character is an operator', function () {
                var multiplication = '*'
                    , division = '/'
                    , modulus = '%'
                    , plus = '+'
                    , minus = '-'
                    , power = '^';


                /* Are all operators; should return true */
                expect(factory.isOperator(multiplication)).toBeTruthy();
                expect(factory.isOperator(division)).toBeTruthy();
                expect(factory.isOperator(modulus)).toBeTruthy();
                expect(factory.isOperator(plus)).toBeTruthy();
                expect(factory.isOperator(minus)).toBeTruthy();
                expect(factory.isOperator(power)).toBeTruthy();


            });

            it('should return false if a character is a scientific operator', function () {
                var sin = 's'
                    , cos = 'c'
                    , tan = 't'
                    , sqrt = '√';


                /* Are all operators; should return true */
                expect(factory.isOperator(sin)).toBeFalsy();
                expect(factory.isOperator(cos)).toBeFalsy();
                expect(factory.isOperator(tan)).toBeFalsy();
                expect(factory.isOperator(sqrt)).toBeFalsy();

            });

            it('should return false if a character is not an operator', function () {
                var number1 = '8', number2 = '0.5', number3 = '-8';

                /* Numbers are not operators; should return false */
                expect(factory.isOperator(number1)).toBeFalsy();
                expect(factory.isOperator(number2)).toBeFalsy();
                expect(factory.isOperator(number3)).toBeFalsy();

            });
        });

        describe('nextOperator function', function () {
            it('should return 0 if there is nothing following the close parenthesis', function () {
                var expression = ')';

                expect(factory.nextOperator(expression)).toEqual(0);
            });

            it('should return 0 if there are only more close parenthesis following the current close parenthesis', function () {
                var expression = '))))))))))))))))))))))';

                expect(factory.nextOperator(expression)).toEqual(0);
            });

            it('should return the index of the next operator if there is one', function () {
                var expression1 = '))))*2';

                expect(factory.nextOperator(expression1)).toEqual(4);
            });
        });

        describe('isParenthesis function', function () {

            it('should return true if a character is an open or closed parenthesis', function () {
                var open = '('
                    , closed = ')';

                expect(factory.isParenthesis(open)).toBeTruthy();
                expect(factory.isParenthesis(closed)).toBeTruthy();


            });

            it('should return false if a character is an operator', function () {
                var multiplication = '*';
                var division = '/';
                var modulus = '%';
                var plus = '+';
                var minus = '-';
                var power = '^';


                /* Are all operators; should return false */
                expect(factory.isParenthesis(multiplication)).toBeFalsy();
                expect(factory.isParenthesis(division)).toBeFalsy();
                expect(factory.isParenthesis(modulus)).toBeFalsy();
                expect(factory.isParenthesis(plus)).toBeFalsy();
                expect(factory.isParenthesis(minus)).toBeFalsy();
                expect(factory.isParenthesis(power)).toBeFalsy();


            });

            it('should return false if a character is a number or a decimal', function () {
                var num = '8'
                    , decimal = '.';

                expect(factory.isParenthesis(num)).toBeFalsy();
                expect(factory.isParenthesis(decimal)).toBeFalsy();
            });

        });

        describe('isScientific function', function () {
            it('should return true if a character is a scientific operator', function () {
                var sin = 's'
                    , cos = 'c'
                    , tan = 't'
                    , sqrt = '√';


                /* Are all operators; should return true */
                expect(factory.isScientific(sin)).toBeTruthy();
                expect(factory.isScientific(cos)).toBeTruthy();
                expect(factory.isScientific(tan)).toBeTruthy();
                expect(factory.isScientific(sqrt)).toBeTruthy();

            });

            it('should return false if a character is NOT a scientific operator', function () {
                var multiplication = '*';
                var division = '/';
                var modulus = '%';
                var plus = '+';
                var minus = '-';
                var power = '^';


                /* Are all operators; should return false */
                expect(factory.isScientific(multiplication)).toBeFalsy();
                expect(factory.isScientific(division)).toBeFalsy();
                expect(factory.isScientific(modulus)).toBeFalsy();
                expect(factory.isScientific(plus)).toBeFalsy();
                expect(factory.isScientific(minus)).toBeFalsy();
                expect(factory.isScientific(power)).toBeFalsy();


            });

            it('should return false if a character is a number or a decimal', function () {
                var num = '8'
                    , decimal = '.';

                expect(factory.isScientific(num)).toBeFalsy();
                expect(factory.isScientific(decimal)).toBeFalsy();
            });
        });

        describe('parseExpression function', function () {
            var expression;

            it('should be able to parse string into an array of objects', function () {
                expression = '10-9+8*7/6%5^4';

                factory.parseExpression(expression);

                expect(factory.values[0].number).toEqual(10);
                expect(factory.values[0].operator).toBe('-');

                expect(factory.values[1].number).toEqual(9);
                expect(factory.values[1].operator).toBe('+');

                expect(factory.values[2].number).toEqual(8);
                expect(factory.values[2].operator).toBe('*');

                expect(factory.values[3].number).toEqual(7);
                expect(factory.values[3].operator).toBe('/');

                expect(factory.values[4].number).toEqual(6);
                expect(factory.values[4].operator).toBe('%');

                expect(factory.values[5].number).toEqual(5);
                expect(factory.values[5].operator).toBe('^');

                expect(factory.values[6].number).toEqual(4);
                expect(factory.values[6].operator).toBe('');
            });

            it('should be able to parse string containing trig functions string into an array of objects', function () {
                expression = 'sin(10)-cos(9)+tan(8)*7/6%5^√(4)';

                factory.parseExpression(expression);

                expect(factory.values[0].number).toBeCloseTo(-0.54);
                expect(factory.values[0].operator).toBe('-');

                expect(factory.values[1].number).toBeCloseTo(-0.91);
                expect(factory.values[1].operator).toBe('+');

                expect(factory.values[2].number).toBeCloseTo(-6.80);
                expect(factory.values[2].operator).toBe('*');

                expect(factory.values[3].number).toEqual(7);
                expect(factory.values[3].operator).toBe('/');

                expect(factory.values[4].number).toEqual(6);
                expect(factory.values[4].operator).toBe('%');

                expect(factory.values[5].number).toEqual(5);
                expect(factory.values[5].operator).toBe('^');

                expect(factory.values[6].number).toEqual(2);
                expect(factory.values[6].operator).toBe('');
            });

            it('should be able to parse string containing parenthesis into an array of objects', function () {
                expression = '(10-9+8)*7/6%(5^4)';

                factory.parseExpression(expression);

                expect(factory.values[0].number).toBeNull();
                expect(factory.values[0].operator).toBe('(');

                expect(factory.values[1].number).toEqual(10);
                expect(factory.values[1].operator).toBe('-');

                expect(factory.values[2].number).toEqual(9);
                expect(factory.values[2].operator).toBe('+');

                expect(factory.values[3].number).toEqual(8);
                expect(factory.values[3].operator).toBe('*');

                expect(factory.values[4].number).toBeNull();
                expect(factory.values[4].operator).toBe(')');

                expect(factory.values[5].number).toEqual(7);
                expect(factory.values[5].operator).toBe('/');

                expect(factory.values[6].number).toEqual(6);
                expect(factory.values[6].operator).toBe('%');

                expect(factory.values[7].number).toBeNull();
                expect(factory.values[7].operator).toBe('(');

                expect(factory.values[8].number).toEqual(5);
                expect(factory.values[8].operator).toBe('^');

                expect(factory.values[9].number).toEqual(4);
                expect(factory.values[9].operator).toBe('');

                expect(factory.values[10].number).toBeNull();
                expect(factory.values[10].operator).toBe(')');
            });
        });

    });
})();