angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope,$http) {
  $scope.cars = [];
  $scope.doRefresh = function() {
    console.log($http.get('./data.json'));
    $http.get('./data.json')
        .success(function(newItems) {
          console.log("SUCCESS:"+JSON.stringify(newItems['cars']));
          $scope.cars = newItems['cars'];
        })
        .error(function () {

        })
        .finally(function() {
          // Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
        })
  };
  $scope.init = function() {
    console.log("initialize called");
    $scope.doRefresh();
  };

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
