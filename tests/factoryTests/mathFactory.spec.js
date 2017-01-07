/**
 * Created by joel on 5/23/16.
 */
(function() {
    'use strict';

    describe('mathFactory', function () {
        beforeEach(module('calculatorApp'));
        
        var factory;

        beforeEach(inject(function (mathFactory) {
            factory = mathFactory;
        }));

        describe('solution function', function () {
            it('should return the answer to the simple equation: 10+9-2-3', function () {
               var array = [{
                  number: 10, operator: '+'
               },{
                  number: 9, operator: '-'
               },{
                  number: 2, operator: '-'
               },{
                  number: 3, operator: ''
               }];

               expect(factory.solution(array).number).toEqual(14);
           });

            it('should return the answer to the simple equation (w/ order of operations): 10+9*2/3', function () {
                var array = [{
                    number: 10, operator: '+'
                },{
                    number: 9, operator: '*'
                },{
                    number: 2, operator: '/'
                },{
                    number: 3, operator: ''
                }];

                expect(factory.solution(array).number).toEqual(16);
            });

            it('should return the answer to the simple equation (w/ order of operations && parenthesis): (10-8)*(2^3)/2', function () {
                var array = [{
                    number: null, operator: '('
                },{
                    number: 10, operator: '-'
                },{
                    number: 8, operator: '*'
                },{
                    number: null, operator: ')'
                },{
                    number: null, operator: '('
                },{
                    number: 2, operator: '^'
                },{
                    number: 3, operator: '/'
                },{
                    number: null, operator: ')'
                },{
                    number: 2, operator: ''
                }];

                expect(factory.solution(array).number).toEqual(8);
            });

            it('should return the answer to the following equations containing parenthesis', function () {
                /* (2+3*(3-1)) */
                var array = [{
                    number: null, operator: '('
                },{
                    number: 2, operator: '+'
                },{
                    number: 3, operator: '*'
                },{
                    number: null, operator: '('
                },{
                    number: 3, operator: '-'
                },{
                    number: 1, operator: ''
                },{
                    number: null, operator: ')'
                },{
                    number: null, operator: ')'
                }];

                expect(factory.solution(array).number).toEqual(8);
            /* --------------------------------------------------------------------------------------------------- */
                /* 2+3*(3-1)/(4/2) */
                array = [{
                    number: 2, operator: '+'
                },{
                    number: 3, operator: '*'
                },{
                    number: null, operator: '('
                },{
                    number: 3, operator: '-'
                },{
                    number: 1, operator: '/'
                },{
                    number: null, operator: ')'
                },{
                    number: null, operator: '('
                },{
                    number: 4, operator: '/'
                },{
                    number: 2, operator: ''
                },{
                    number: null, operator: ')'
                }];

                expect(factory.solution(array).number).toEqual(5);
            /* --------------------------------------------------------------------------------------------------- */
                /* (2+3*(3-1))+5-3 */
                array = [{
                    number: null, operator: '('
                },{
                    number: 2, operator: '+'
                },{
                    number: 3, operator: '*'
                },{
                    number: null, operator: '('
                },{
                    number: 3, operator: '-'
                },{
                    number: 1, operator: '+'
                },{
                    number: null, operator: ')'
                },{
                    number: null, operator: ')'
                },{
                    number: 5, operator: '-'
                },{
                    number: 3, operator: ''
                }];

                expect(factory.solution(array).number).toEqual(10);
            /* --------------------------------------------------------------------------------------------------- */
                /* 5+(2+3*(3-1))+5-3 */
                array = [{
                    number: 5, operator: '+'
                },{
                    number: null, operator: '('
                },{
                    number: 2, operator: '+'
                },{
                    number: 3, operator: '*'
                },{
                    number: null, operator: '('
                },{
                    number: 3, operator: '-'
                },{
                    number: 1, operator: '+'
                },{
                    number: null, operator: ')'
                },{
                    number: null, operator: ')'
                },{
                    number: 5, operator: '-'
                },{
                    number: 3, operator: ''
                }];

                expect(factory.solution(array).number).toEqual(15);

            });
        });

        describe('priority function', function(){
            it('should return true if; the current operator is (+,-) and the next is (*,/,%,^) AND the state of the next number is empty', function () {
                var current = {
                   number: 6, operator: '+'
                 }
                    , next1 = {
                    number: 2, operator: '*'
                }, next2 = {
                    number: 2, operator: '/'
                }, next3 = {
                    number: 2, operator: '%'
                }, next4 = {
                    number: 2, operator: '^'
                };

                expect(factory.prioritize(current, next1, next1)).toBeTruthy();
                expect(factory.prioritize(current, next2, next1)).toBeTruthy();
                expect(factory.prioritize(current, next3, next1)).toBeTruthy();
                expect(factory.prioritize(current, next4, next1)).toBeTruthy();
            /* --------------------------------------------------------------------------------------------------- */
                current = {
                    number: 10, operator: '-'
                };

                expect(factory.prioritize(current, next1, next1)).toBeTruthy();
                expect(factory.prioritize(current, next2, next1)).toBeTruthy();
                expect(factory.prioritize(current, next3, next1)).toBeTruthy();
                expect(factory.prioritize(current, next4, next1)).toBeTruthy()
            });

            it('should return false if the value two indexes down is empty', function () {
                var current = {
                    number: 6, operator: '+'
                }
                    , next1 = {
                    number: 2, operator: '*'
                }, next2 = {
                    number: 2, operator: '/'
                }, next3 = {
                    number: 2, operator: '%'
                }, next4 = {
                    number: 2, operator: '^'
                },
                    next;

                expect(factory.prioritize(current, next1, next)).toBeFalsy();
                expect(factory.prioritize(current, next2, next)).toBeFalsy();
                expect(factory.prioritize(current, next3, next)).toBeFalsy();
                expect(factory.prioritize(current, next4, next)).toBeFalsy();
                /* --------------------------------------------------------------------------------------------------- */
                current = {
                    number: 10, operator: '-'
                };

                expect(factory.prioritize(current, next1, next)).toBeFalsy();
                expect(factory.prioritize(current, next2, next)).toBeFalsy();
                expect(factory.prioritize(current, next3, next)).toBeFalsy();
                expect(factory.prioritize(current, next4, next)).toBeFalsy()
            });

            it('should return false if the current operator is not (+,-)', function () {
                var next1 = {
                    number: 2, operator: '*'
                }, next2 = {
                    number: 2, operator: '/'
                }, next3 = {
                    number: 2, operator: '%'
                }, next4 = {
                    number: 2, operator: '^'
                };

                expect(factory.prioritize(next1, next1, next1)).toBeFalsy();
                expect(factory.prioritize(next1, next2, next1)).toBeFalsy();
                expect(factory.prioritize(next1, next3, next1)).toBeFalsy();
                expect(factory.prioritize(next1, next4, next1)).toBeFalsy();

                expect(factory.prioritize(next2, next2, next1)).toBeFalsy();
                expect(factory.prioritize(next2, next3, next1)).toBeFalsy();
                expect(factory.prioritize(next2, next4, next1)).toBeFalsy();

                expect(factory.prioritize(next3, next3, next1)).toBeFalsy();
                expect(factory.prioritize(next3, next4, next1)).toBeFalsy();

                expect(factory.prioritize(next4, next4, next1)).toBeFalsy();
            });

            it('should return false if the next operator is NOT (*,/,%,^)', function () {
                var current = {
                    number: 2, operator: '*'
                }, next1 = {
                    number: 2, operator: '+'
                }, next2 = {
                    number: 2, operator: '-'
                };

                expect(factory.prioritize(current, next1, next1)).toBeFalsy();
                expect(factory.prioritize(current, next2, next1)).toBeFalsy();
            });
        });

    });
})();