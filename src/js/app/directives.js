/* Directives */

angular.module('lorenz').

  directive('pattern', function() {
    return {
        restrict: 'E',
        scope: {
          id: '@',
          wheelname: '@',
          cams: '='
        },
        templateUrl: 'templates/patternInput.html'
    };
  }).

  directive('start', function() {
    return {
        restrict: 'E',
        scope: {
          id: '@',
          wheelname: '@',
          pattern: '=',
          pos: '=',
          onStartChange: '&'
        },
        templateUrl: 'templates/patternStart.html'
    };
  });



