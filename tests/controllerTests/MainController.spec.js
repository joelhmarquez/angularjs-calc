/**
 * Created by joel on 5/23/16.
 */
(function() {
    'use strict';

    describe('MainController', function () {
        beforeEach(module('calculatorApp'));

        var scope;
        var historyFactory;
        var mainFactory;
        var mathFactory;

        beforeEach(inject(function ($controller, $rootScope, _historyFactory_, _mainFactory_, _mathFactory_) {

            historyFactory = _historyFactory_;
            mainFactory = _mainFactory_;
            mathFactory =_mathFactory_;

            scope = $rootScope.$new();
            $controller('MainController as math', {$scope: scope});

        }));

        describe('init function', function () {
            it('should initialize all variables/objects as empty/default', function () {
                expect(scope.math.closeParen).toBe(false);
                expect(scope.math.expression).toBe('');
                expect(scope.math.err).toBe('Invalid Operation');
                expect(scope.math.history.length).toBe(0);
                expect(scope.math.negative).toBe(false);
                expect(scope.math.lastValue).toBe('');
                expect(scope.math.reset).toBe(false);
                expect(scope.math.scientific).toBe(false);
                expect(scope.math.value).toBe('');
            });
        });

        describe('addValue function', function () {
            it('should clear the expression if reset is toggled on and the next character is a number', function () {
                scope.math.reset = true;                            // Reset is toggled on
                scope.math.expression = '24';                       // Currently, the expression is set to be 24

                scope.math.value = '7';                             // The number 7 is clicked
                scope.math.addValue();

                expect(scope.math.expression).toBe('7');            // 24 should be overwritten by 7
            });

            it('should NOT clear the expression if reset is toggled on and the next value is an operator', function () {
                scope.math.reset = true;                            // Reset is toggled on
                scope.math.expression = '24';                       // Currently, the expression is set to be 24
                scope.math.lastValue = '';                          // Last Value is reset

                scope.math.value = '*';                             // An operator(*) is clicked
                scope.math.addValue();

                expect(scope.math.expression).toBe('24*');          //Number is NOT overwritten but appended
            /* --------------------------------------------------------------------------------------------------- */
                scope.math.reset = true;                            // Reset is toggled on
                scope.math.expression = '24';                       // Currently, the expression is set to be 24
                scope.math.lastValue = '';                          // Last Value is reset

                scope.math.value = '/';                             // An operator(/) is clicked
                scope.math.addValue();

                expect(scope.math.expression).toBe('24/');          //Number is NOT overwritten but appended
            /* --------------------------------------------------------------------------------------------------- */
                scope.math.reset = true;                            // Reset is toggled on
                scope.math.expression = '24';                       // Currently, the expression is set to be 24
                scope.math.lastValue = '';                          // Last Value is reset

                scope.math.value = '%';                             // An operator(%) is clicked
                scope.math.addValue();

                expect(scope.math.expression).toBe('24%');          //Number is NOT overwritten but appended
            /* --------------------------------------------------------------------------------------------------- */
                scope.math.reset = true;                            // Reset is toggled on
                scope.math.expression = '24';                       // Currently, the expression is set to be 24
                scope.math.lastValue = '';                          // Last Value is reset

                scope.math.value = '+';                             // An operator(%) is clicked
                scope.math.addValue();

                expect(scope.math.expression).toBe('24+');          //Number is NOT overwritten but appended
            /* --------------------------------------------------------------------------------------------------- */
                scope.math.reset = true;                             // Reset is toggled on
                scope.math.expression = '24';                        // Currently, the expression is set to be 24
                scope.math.lastValue = '';                           // Last Value is reset

                scope.math.value = '-';                              // An operator(%) is clicked
                scope.math.addValue();

                expect(scope.math.expression).toBe('24-');           //Number is NOT overwritten but appended
            });

            it('should NOT close the parenthesis of a scientific opertor while the input value is not an operator', function () {
                scope.math.expression = 'sin(2';
                scope.math.scientific = true;

                scope.math.value = '3';
                scope.math.addValue();

                expect(scope.math.expression).toBe('sin(23');
            /* --------------------------------------------------------------------------------------------------- */
                scope.math.expression = 'cos(2';
                scope.math.scientific = true;

                scope.math.value = '.';
                scope.math.addValue();

                expect(scope.math.expression).toBe('cos(2.');

            });

            it('should throw an error if two operators are entered next to one another', function () {
                scope.math.lastValue = '*';
                scope.math.value = '*';

                expect(scope.math.addValue).toThrow();

            });
        });

        describe('back function', function () {
            it('should delete last entered value when back button is clicked', function () {

                /* Add sample expression holding three characters */
                scope.math.expression = '8+9';

                /* Call the back function */
                scope.math.back();

                /* Expression should now have deleted the last character: 9 */
                expect(scope.math.expression).toBe('8+');
            /* --------------------------------------------------------------------------------------------------- */
                /* Add sample expression holding four characters */
                scope.math.expression = '8+9-';

                /* Call the back function */
                scope.math.back();

                /* Expression should now have deleted the last character: - */
                expect(scope.math.expression).toBe('8+9');
            });
        });

        describe('calculate function', function () {

            beforeEach(function(){
                /* Factory functions to be spied on */
                spyOn(historyFactory, 'addHistory');
                spyOn(mathFactory, 'solution').and.callThrough();
                spyOn(mainFactory, 'clear').and.callThrough();
                spyOn(mainFactory, 'parseExpression').and.callThrough();
            });

            it('should throw an error if calculate is called with an empty expression', function () {

                scope.math.expression = '';
                expect(scope.math.calculate).toThrow(); //Exception should be thrown

            });

            it('should throw an error if calculate is called with an expression that ends with an operator', function(){

                scope.math.expression = '9+8*';
                expect(scope.math.calculate).toThrow(); //Exception should be thrown
            /* --------------------------------------------------------------------------------------------------- */
                scope.math.expression = '9+8/';
                expect(scope.math.calculate).toThrow(); //Exception should be thrown
            /* --------------------------------------------------------------------------------------------------- */
                scope.math.expression = '9+8%';
                expect(scope.math.calculate).toThrow(); //Exception should be thrown
            /* --------------------------------------------------------------------------------------------------- */
                scope.math.expression = '9+8+';
                expect(scope.math.calculate).toThrow(); //Exception should be thrown
            /* --------------------------------------------------------------------------------------------------- */
                scope.math.expression = '9+8-';
                expect(scope.math.calculate).toThrow(); //Exception should be thrown
            /* --------------------------------------------------------------------------------------------------- */

            });

            it('should be able to calculate a simple expression(No order of operations)', function(){

                scope.math.expression = '9+2+3';
                scope.math.calculate();

                expect(mainFactory.parseExpression).toHaveBeenCalled();        //Calculate calls parseExpression
                expect(mathFactory.solution).toHaveBeenCalled();              //Calculate calls solution
                expect(historyFactory.addHistory).toHaveBeenCalled();        //Calculate calls addHistory
                expect(mainFactory.clear).toHaveBeenCalled();               //Calculate calls clear

                expect(scope.math.reset).toBeTruthy();                      //Reset toggle should be enabled
                expect(scope.math.closeParen).toBeFalsy();                 //closeParen should be reset
                expect(scope.math.scientific).toBeFalsy();                //scientific should be reset
                expect(scope.math.negative).toBeFalsy();                 //negative should be reset
                expect(scope.math.expression).toEqual('14');            // Answer should be 14

            });

            it('should be able to store and calculate a complex expression w/ order of operations', function(){

                scope.math.expression = '9+2*2-3*4+10%2+10/2';
                scope.math.calculate();

                expect(mainFactory.parseExpression).toHaveBeenCalled();      //Calculate calls parseExpression
                expect(mathFactory.solution).toHaveBeenCalled();            //Calculate calls solution
                expect(historyFactory.addHistory).toHaveBeenCalled();      //Calculate calls addHistory
                expect(mainFactory.clear).toHaveBeenCalled();             //Calculate calls clear

                expect(scope.math.reset).toBeTruthy();                    //Reset toggle should be enabled
                expect(scope.math.closeParen).toBeFalsy();               //closeParen should be reset
                expect(scope.math.scientific).toBeFalsy();              //scientific should be reset
                expect(scope.math.negative).toBeFalsy();               //negative should be reset
                expect(scope.math.expression).toBe('6');              //Answer should be 6

            });

            it('should be able to store and calculate a scientific operator', function () {
                scope.math.expression = 'sin(2)';
                scope.math.calculate();

                expect(mainFactory.parseExpression).toHaveBeenCalled();      //Calculate calls parseExpression
                expect(mathFactory.solution).toHaveBeenCalled();            //Calculate calls solution
                expect(historyFactory.addHistory).toHaveBeenCalled();      //Calculate calls addHistory
                expect(mainFactory.clear).toHaveBeenCalled();             //Calculate calls clear

                expect(scope.math.reset).toBeTruthy();                    //Reset toggle should be enabled
                expect(scope.math.closeParen).toBeFalsy();               //closeParen should be reset
                expect(scope.math.scientific).toBeFalsy();              //scientific should be reset
                expect(scope.math.negative).toBeFalsy();               //negative should be reset
                expect(scope.math.expression).toBeCloseTo('0.91');              //Answer should be 6
            /* --------------------------------------------------------------------------------------------------- */
                scope.math.expression = 'cos(2)';
                scope.math.calculate();

                expect(mainFactory.parseExpression).toHaveBeenCalled();      //Calculate calls parseExpression
                expect(mathFactory.solution).toHaveBeenCalled();            //Calculate calls solution
                expect(historyFactory.addHistory).toHaveBeenCalled();      //Calculate calls addHistory
                expect(mainFactory.clear).toHaveBeenCalled();             //Calculate calls clear

                expect(scope.math.reset).toBeTruthy();                    //Reset toggle should be enabled
                expect(scope.math.closeParen).toBeFalsy();               //closeParen should be reset
                expect(scope.math.scientific).toBeFalsy();              //scientific should be reset
                expect(scope.math.negative).toBeFalsy();               //negative should be reset
                expect(scope.math.expression).toBeCloseTo('-0.42');              //Answer should be 6
            /* --------------------------------------------------------------------------------------------------- */
                scope.math.expression = 'tan(2)';
                scope.math.calculate();

                expect(mainFactory.parseExpression).toHaveBeenCalled();      //Calculate calls parseExpression
                expect(mathFactory.solution).toHaveBeenCalled();            //Calculate calls solution
                expect(historyFactory.addHistory).toHaveBeenCalled();      //Calculate calls addHistory
                expect(mainFactory.clear).toHaveBeenCalled();             //Calculate calls clear

                expect(scope.math.reset).toBeTruthy();                    //Reset toggle should be enabled
                expect(scope.math.closeParen).toBeFalsy();               //closeParen should be reset
                expect(scope.math.scientific).toBeFalsy();              //scientific should be reset
                expect(scope.math.negative).toBeFalsy();               //negative should be reset
                expect(scope.math.expression).toBeCloseTo('-2.19');              //Answer should be 6
            /* --------------------------------------------------------------------------------------------------- */
                scope.math.expression = '√(2)';
                scope.math.calculate();

                expect(mainFactory.parseExpression).toHaveBeenCalled();      //Calculate calls parseExpression
                expect(mathFactory.solution).toHaveBeenCalled();            //Calculate calls solution
                expect(historyFactory.addHistory).toHaveBeenCalled();      //Calculate calls addHistory
                expect(mainFactory.clear).toHaveBeenCalled();             //Calculate calls clear

                expect(scope.math.reset).toBeTruthy();                    //Reset toggle should be enabled
                expect(scope.math.closeParen).toBeFalsy();               //closeParen should be reset
                expect(scope.math.scientific).toBeFalsy();              //scientific should be reset
                expect(scope.math.negative).toBeFalsy();               //negative should be reset
                expect(scope.math.expression).toBeCloseTo('1.41');              //Answer should be 6
            });

            it('should be able to store and calculate an expression with parenthesis', function () {
                scope.math.expression = '2*(3-1)';
                scope.math.calculate();

                expect(mainFactory.parseExpression).toHaveBeenCalled();      //Calculate calls parseExpression
                expect(mathFactory.solution).toHaveBeenCalled();            //Calculate calls solution
                expect(historyFactory.addHistory).toHaveBeenCalled();      //Calculate calls addHistory
                expect(mainFactory.clear).toHaveBeenCalled();             //Calculate calls clear

                expect(scope.math.reset).toBeTruthy();                    //Reset toggle should be enabled
                expect(scope.math.closeParen).toBeFalsy();               //closeParen should be reset
                expect(scope.math.scientific).toBeFalsy();              //scientific should be reset
                expect(scope.math.negative).toBeFalsy();               //negative should be reset
                expect(scope.math.expression).toEqual('4');              //Answer should be 6
            /* --------------------------------------------------------------------------------------------------- */
                scope.math.expression = '(2+2)*(3-1)';
                scope.math.calculate();

                expect(mainFactory.parseExpression).toHaveBeenCalled();      //Calculate calls parseExpression
                expect(mathFactory.solution).toHaveBeenCalled();            //Calculate calls solution
                expect(historyFactory.addHistory).toHaveBeenCalled();      //Calculate calls addHistory
                expect(mainFactory.clear).toHaveBeenCalled();             //Calculate calls clear

                expect(scope.math.reset).toBeTruthy();                    //Reset toggle should be enabled
                expect(scope.math.closeParen).toBeFalsy();               //closeParen should be reset
                expect(scope.math.scientific).toBeFalsy();              //scientific should be reset
                expect(scope.math.negative).toBeFalsy();               //negative should be reset
                expect(scope.math.expression).toEqual('8');              //Answer should be 6
            /* --------------------------------------------------------------------------------------------------- */
                scope.math.expression = '√(4)+((2+2)*(3-1)+10)/2';
                scope.math.calculate();

                expect(mainFactory.parseExpression).toHaveBeenCalled();      //Calculate calls parseExpression
                expect(mathFactory.solution).toHaveBeenCalled();            //Calculate calls solution
                expect(historyFactory.addHistory).toHaveBeenCalled();      //Calculate calls addHistory
                expect(mainFactory.clear).toHaveBeenCalled();             //Calculate calls clear

                expect(scope.math.reset).toBeTruthy();                    //Reset toggle should be enabled
                expect(scope.math.closeParen).toBeFalsy();               //closeParen should be reset
                expect(scope.math.scientific).toBeFalsy();              //scientific should be reset
                expect(scope.math.negative).toBeFalsy();               //negative should be reset
                expect(scope.math.expression).toEqual('11');              //Answer should be 6
            });
        });

        describe('clear function', function () {
            it('should clear the current expression when the clear button is clicked', function () {
                /* Adding sample expression */
                scope.math.expression = '9+8';
                expect(scope.math.expression).toBe('9+8');

                /* Call clear function in controller */
                scope.math.clear();

                expect(scope.math.expression).toBe('');          //Clear function should set the expression variable to empty
            });
        });

        describe('clearAll function', function () {
            it('should clear the current expression when the clear button is clicked', function () {
                /* Adding sample expression */
                scope.math.expression = '9+8';
                expect(scope.math.expression).toBe('9+8');

                /* Call clear function in controller */
                scope.math.clearAll();

                expect(scope.math.expression).toBe('');          //Clear function should set the expression variable to empty
            });

            it('should clear the history array when clear button is cleared', function () {
                /* Spy on the clear function in mainFactory to check that it's called */
                spyOn(historyFactory, 'clearHistory').and.callThrough();

                /* Adding sample expression */
                scope.math.expression = '9+8';

                /* Adding sample expression to stored history array */
                historyFactory.addHistory('9+8','16');        //Expression: 9+8, Answer: 16
                expect(scope.math.history.length).toEqual(1);   //Check that it's no longer empty to then test the clearHistory function

                /* Call clearHistory function in controller */
                scope.math.clearAll();

                expect(historyFactory.clearHistory).toHaveBeenCalled();   //Controller should call factory clearHistory function
                expect(scope.math.history.length).toBe(0);               //Check that the history array in controller is now empty
                expect(historyFactory.history.length).toEqual(0);       //Check that array in history factory is now empty;
                                                                       // verifies that it is the same array as the one in the controller
            });
        });
        
    });
})();