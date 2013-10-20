/* Controllers */

angular.module('lorenz')
  .controller('machine', function($scope, lengths, initialPatterns, converters) {

    var bool2obj = function(camSet) {
      return { set: (camSet === 1) ? true : false};
    };

    $scope.generatedKey = '';
    $scope.keyLength = 4000;

    $scope.wheels = {
      chi1: {
        start: 22,
        pattern: initialPatterns.chi.w1.map(bool2obj)
      },
      chi2: {
        start: 11,
        pattern: initialPatterns.chi.w2.map(bool2obj)
      },
      chi3: {
        start: 20,
        pattern: initialPatterns.chi.w3.map(bool2obj)
      },
      chi4: {
        start: 11,
        pattern: initialPatterns.chi.w4.map(bool2obj)
      },
      chi5: {
        start: 14,
        pattern: initialPatterns.chi.w5.map(bool2obj)
      },
      motor1: {
        start: 19,
        pattern: initialPatterns.motor.w1.map(bool2obj)
      },
      motor2: {
        start: 11,
        pattern: initialPatterns.motor.w2.map(bool2obj)
      },
      psi1: {
        start: 3,
        pattern: initialPatterns.psi.w1.map(bool2obj)
      },
      psi2: {
        start: 11,
        pattern: initialPatterns.psi.w2.map(bool2obj)
      },
      psi3: {
        start: 15,
        pattern: initialPatterns.psi.w3.map(bool2obj)
      },
      psi4: {
        start: 13,
        pattern: initialPatterns.psi.w4.map(bool2obj)
      },
      psi5: {
        start: 15,
        pattern: initialPatterns.psi.w5.map(bool2obj)
      }
    };

    $scope.wheels.chi1.pattern[$scope.wheels.chi1.start - 1].startPos = true;
    $scope.wheels.chi2.pattern[$scope.wheels.chi2.start - 1].startPos = true;
    $scope.wheels.chi3.pattern[$scope.wheels.chi3.start - 1].startPos = true;
    $scope.wheels.chi4.pattern[$scope.wheels.chi4.start - 1].startPos = true;
    $scope.wheels.chi5.pattern[$scope.wheels.chi5.start - 1].startPos = true;

    $scope.wheels.motor1.pattern[$scope.wheels.motor1.start - 1].startPos = true;
    $scope.wheels.motor2.pattern[$scope.wheels.motor2.start - 1].startPos = true;

    $scope.wheels.psi1.pattern[$scope.wheels.psi1.start - 1].startPos = true;
    $scope.wheels.psi2.pattern[$scope.wheels.psi2.start - 1].startPos = true;
    $scope.wheels.psi3.pattern[$scope.wheels.psi3.start - 1].startPos = true;
    $scope.wheels.psi4.pattern[$scope.wheels.psi4.start - 1].startPos = true;
    $scope.wheels.psi5.pattern[$scope.wheels.psi5.start - 1].startPos = true;

    $scope.$watch('wheels.chi1.start', function(newValue) {
      updateStart($scope.wheels.chi1.pattern, newValue);
    });
    $scope.$watch('wheels.chi2.start', function(newValue) {
      updateStart($scope.wheels.chi2.pattern, newValue);
    });
    $scope.$watch('wheels.chi3.start', function(newValue) {
      updateStart($scope.wheels.chi3.pattern, newValue);
    });
    $scope.$watch('wheels.chi4.start', function(newValue) {
      updateStart($scope.wheels.chi4.pattern, newValue);
    });
    $scope.$watch('wheels.chi5.start', function(newValue) {
      updateStart($scope.wheels.chi5.pattern, newValue);
    });

    $scope.$watch('wheels.motor1.start', function(newValue) {
      updateStart($scope.wheels.motor1.pattern, newValue);
    });
    $scope.$watch('wheels.motor2.start', function(newValue) {
      updateStart($scope.wheels.motor2.pattern, newValue);
    });

    $scope.$watch('wheels.psi1.start', function(newValue) {
      updateStart($scope.wheels.psi1.pattern, newValue);
    });
    $scope.$watch('wheels.psi2.start', function(newValue) {
      updateStart($scope.wheels.psi2.pattern, newValue);
    });
    $scope.$watch('wheels.psi3.start', function(newValue) {
      updateStart($scope.wheels.psi3.pattern, newValue);
    });
    $scope.$watch('wheels.psi4.start', function(newValue) {
      updateStart($scope.wheels.psi4.pattern, newValue);
    });
    $scope.$watch('wheels.psi5.start', function(newValue) {
      updateStart($scope.wheels.psi5.pattern, newValue);
    });

    function updateStart(pattern, newStart) {
      for (var i = 0; i < pattern.length; i++) {
        if (i + 1 === newStart) {
          pattern[i].startPos = true;
        } else {
          pattern[i].startPos = false;
        }
      }
    }

    $scope.generateKey = function() {

      var advanceChi = function(pos, index) {
        return (pos === chiLengths[index]) ? 1 : pos + 1;
      };

      var advancePsi = function(pos, index) {
        return (pos === psiLengths[index]) ? 1 : pos + 1;
      };

      var chiPositions   = [ $scope.wheels.chi1.start,
                             $scope.wheels.chi2.start,
                             $scope.wheels.chi3.start,
                             $scope.wheels.chi4.start,
                             $scope.wheels.chi5.start ];
      var psiPositions   = [ $scope.wheels.psi1.start,
                             $scope.wheels.psi2.start,
                             $scope.wheels.psi3.start,
                             $scope.wheels.psi4.start,
                             $scope.wheels.psi5.start ];
      var motorPositions = [ $scope.wheels.motor1.start,
                             $scope.wheels.motor2.start ];

      var chiLengths     = [ lengths.chi.w1,
                             lengths.chi.w2,
                             lengths.chi.w3,
                             lengths.chi.w4,
                             lengths.chi.w5 ];
      var motorLengths   = [ lengths.motor.w1,
                             lengths.motor.w2 ];
      var psiLengths     = [ lengths.psi.w1,
                             lengths.psi.w2,
                             lengths.psi.w3,
                             lengths.psi.w4,
                             lengths.psi.w5 ];

      var chiLetter;
      var psiLetter;
      var keyLetter;

      var keyStream = '';

      for (var i = 0; i < $scope.keyLength ; i++) {

        chiLetter = ($scope.wheels.chi1.pattern[chiPositions[0] - 1].set ? 1 : 0) * 16 +
                    ($scope.wheels.chi2.pattern[chiPositions[1] - 1].set ? 1 : 0) * 8 +
                    ($scope.wheels.chi3.pattern[chiPositions[2] - 1].set ? 1 : 0) * 4 +
                    ($scope.wheels.chi4.pattern[chiPositions[3] - 1].set ? 1 : 0) * 2 +
                    ($scope.wheels.chi5.pattern[chiPositions[4] - 1].set ? 1 : 0);

        psiLetter = ($scope.wheels.psi1.pattern[psiPositions[0] - 1].set ? 1 : 0) * 16 +
                    ($scope.wheels.psi2.pattern[psiPositions[1] - 1].set ? 1 : 0) * 8 +
                    ($scope.wheels.psi3.pattern[psiPositions[2] - 1].set ? 1 : 0) * 4 +
                    ($scope.wheels.psi4.pattern[psiPositions[3] - 1].set ? 1 : 0) * 2 +
                    ($scope.wheels.psi5.pattern[psiPositions[4] - 1].set ? 1 : 0);

        keyLetter = chiLetter ^ psiLetter;
        keyStream += converters.num2char(keyLetter);

        // Chi wheels always step
        chiPositions = chiPositions.map(advanceChi);

        // Psi wheels step if Motor 2 has a cross in the active position
        if ($scope.wheels.motor2.pattern[motorPositions[1] - 1].set) {
          psiPositions = psiPositions.map(advancePsi);
        }

        // Motor 2 moves on if Motor 1 has a cross in the active position
        if ($scope.wheels.motor1.pattern[motorPositions[0] - 1].set) {
          if (motorPositions[1] === motorLengths[1]) {
            motorPositions[1] = 1;
          } else {
            motorPositions[1] = motorPositions[1] + 1;
          }
        }

        // Motor 1 always steps
        if (motorPositions[0] === motorLengths[0]) {
          motorPositions[0] = 1;
        } else {
          motorPositions[0] = motorPositions[0] + 1;
        }

      }

      $scope.generatedKey = keyStream;
    };

  });