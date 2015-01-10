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
    //$http.get('./data.json')
    //    .success(function(newItems) {
    //      console.log("SUCCESS:"+JSON.stringify(newItems['cars']));
    //      $scope.cars = newItems['cars'];
    //    })
    //    .error(function () {
    //
    //    })
    //    .finally(function() {
    //      // Stop the ion-refresher from spinning
    //      $scope.$broadcast('scroll.refreshComplete');
    //    })
    $http.get('https://spreadsheets.google.com/feeds/list/1wNJ1v1s9GKcSq7EkJU0qoK1TZdPD6J9FFXSROuvJmcc/od6/public/values?alt=json')
        .success(function(data) {
          console.log(data);
          var rows = data.feed.entry;
          var finalData = [];
          rows.forEach(function(row){finalData.push({
            cartype : row.gsx$cartype.$t,
            colour  : row.gsx$colour.$t,
            fueltype  : row.gsx$fueltype.$t,
            kms  : row.gsx$kms.$t,
            model  : row.gsx$model.$t,
            owner  : row.gsx$owner.$t,
            price  : row.gsx$price.$t,
            samplepics  : row.gsx$samplepics.$t,
            sellername  : row.gsx$sellername.$t,
            sellerphone  : row.gsx$sellerphone.$t,
            sno  : row.gsx$sno.$t,
            year  : row.gsx$year.$t,
            location  : row.gsx$location.$t
          })});

          console.log(rows);
          console.log(finalData);
          $scope.cars = finalData;
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
  console.log($stateParams);
});
