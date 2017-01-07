/**
 * Created by myag on 6/2/16.
 */
(function() {
    'use strict';

    angular
        .module('calculatorApp')
        .directive('jmRestore', jmRestore);
    function jmRestore() {
        return {
            restrict: 'A',

            link: function(scope, element, attrs){
                $(element).hover(function(){
                    // on mouseenter
                    element.css('color', '#FF4245');
                    $(element).tooltip('show');
                }, function(){
                    // on mouseleave
                    element.css('color', 'black');
                    $(element).tooltip('hide');
                });
            }
        };
    }
})();