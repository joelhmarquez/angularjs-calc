/**
 * Created by myag on 6/9/16.
 */
(function() {
    'use strict';

    describe('WeatherController', function () {
        beforeEach(module('calculatorApp'));

        var scope;
        var $httpBackend;
        var response;
        var url = 'http://api.openweathermap.org/data/2.5/weather?q=Littleton,us&units=imperial&appid=c50dce7ca477334f2f45ad6f61de0ac7';
        var urlForecast = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=Littleton,us&units=imperial&cnt=1&appid=c50dce7ca477334f2f45ad6f61de0ac7';

        beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {

            $httpBackend = _$httpBackend_;
            /* Need jasmine-jquery */
            jasmine.getJSONFixtures().fixturesPath='base/tests/mockJSON';

            scope = $rootScope.$new();
            $controller('WeatherController as vm', {$scope: scope});

            response = $httpBackend.when("GET", url).respond(getJSONFixture("mockCurrentJSON.json"));
            response = $httpBackend.when("GET", urlForecast).respond(getJSONFixture("mockForecastJSON.json"));

        }));

        describe('getWeather function', function () {
            afterEach(function() {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            beforeEach(inject(function () {
                scope.vm.getWeather();
                $httpBackend.flush();
            }));

            it('should set local variable city equal to returned city', function () {
                expect(scope.vm.current.city).toBe('Littleton');
            });

            it('should set local variable temp equal to returned temp', function () {
                expect(scope.vm.current.temp).toBe('67.55°F');
            });

            it('should set local variable minTemp equal to returned min temp', function () {
                expect(scope.vm.current.minTemp).toBe('66.65°F');
            });

            it('should set local variable maxTemp equal to returned max temp', function () {
                expect(scope.vm.current.maxTemp).toBe('92.55°F');
            });

            it('should set local variable font equal to the font id returned', function () {
                expect(scope.vm.current.font).toEqual(800);
            });

            it('should hide the loading screen when loading is complete', function () {
                expect($('#loading')).not.toBeVisible();
            });

            it('should show the getWeather screen after it has fetched the data', function () {
                expect($('#getWeather')).not.toBeHidden();
            });
        });


    });
})();