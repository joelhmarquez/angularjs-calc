/**
 * Created by myag on 5/25/16.
 */
(function() {
    'use strict';

    describe('historyFactory', function () {
        beforeEach(module('calculatorApp'));

        var factory;

        beforeEach(inject(function (historyFactory) {
            factory = historyFactory;
        }));

        describe('Init function', function(){
            it('should initialize the history array as empty',function () {
               expect(factory.history.length).toEqual(0);
            });
        });

        describe('addHistory function', function(){
            it('should add the passed in (expression, answer, total operations) to the history object array',function () {

                /* Verify that it's empty to start */
                expect(factory.history.length).toEqual(0);

                /* Add in some sample values */

                factory.addHistory('9*2', '18');
                expect(factory.history.length).toEqual(1);                           //Should now hold 1 object
                expect(factory.history[0].expression).toBe('9*2');                  //First expression: 9*2
                expect(factory.history[0].answer).toBe('18');                      //First answer: 18

                factory.addHistory('9*2+6', '24');
                expect(factory.history.length).toEqual(2);                           //Should now hold 2 objects
                expect(factory.history[1].expression).toBe('9*2+6');                //Second expression: 9*2+6
                expect(factory.history[1].answer).toBe('24');                      //Second answer: 24

                factory.addHistory('9*2+6/3', '20');
                expect(factory.history.length).toEqual(3);                           //Should now hold 3 objects
                expect(factory.history[2].expression).toBe('9*2+6/3');              //Third expression: 9*2+6/3
                expect(factory.history[2].answer).toBe('20');                      //Third answer: 22

            });
        });

        describe('clearHistory function', function(){
            it('should clear all objects stored in history object array',function () {
                /* Check that array starts off empty */
                expect(factory.history.length).toEqual(0);

                /* Sample values to populate value array */
                factory.history = [
                    {
                        expression: '9*2',
                        answer: '18'
                    },
                    {
                        expression: '9*2+6',
                        answer: '24'
                    },
                    {
                        expression: '9*2+6/3',
                        answer: '20'
                    }
                ];

                /* Checking that the array is now not empty */
                expect(factory.history.length).toBeGreaterThan(0);

                /* Call clear function */
                factory.clearHistory();
                expect(factory.history.length).toBe(0);   //Array should now be empty
            });
        });


    });
})();