/* Filters */

angular.module('lorenz').

  /**
   * Filter that augments an array with a range of integers
   *
   * @param input Array to be extended
   * @param min From value
   * @param max To value
   * @return Array whose last n elements are a range of integers
   */
  filter('range', function() {
    return function(input, min, max) {
      min = parseInt(min, 10);
      max = parseInt(max, 10);
      for (var i = min; i <= max; i++) {
        input.push(i);
      }
      return input;
    };
  });