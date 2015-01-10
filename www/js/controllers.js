var globalVar = {};
angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$rootScope,$http) {
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


      //data fetch functions
      $rootScope.cars = [];
      $rootScope.doRefresh = function() {
        $http.get('https://spreadsheets.google.com/feeds/list/1wNJ1v1s9GKcSq7EkJU0qoK1TZdPD6J9FFXSROuvJmcc/od6/public/values?alt=json')
            .success(function(data) {
              console.log(data);
              var rows = data.feed.entry;
              var finalData = [];
              rows.forEach(function(row){finalData.push({
                sno  : parseInt(row.gsx$sno.$t),
                cartype : row.gsx$cartype.$t,
                colour  : row.gsx$colour.$t,
                fueltype  : row.gsx$fueltype.$t,
                kms  : parseInt(row.gsx$kms.$t),
                model  : row.gsx$model.$t,
                owner  : row.gsx$owner.$t,
                price  : parseInt(row.gsx$price.$t),
                samplepics  : row.gsx$samplepics.$t,
                sellername  : row.gsx$sellername.$t,
                sellerphone  : row.gsx$sellerphone.$t,
                year  : parseInt(row.gsx$year.$t),
                location  : row.gsx$location.$t
              })});

              console.log(rows);
              console.log(finalData);
              $rootScope.cars = finalData;
            })
            .error(function () {

            })
            .finally(function() {
              // Stop the ion-refresher from spinning
              $rootScope.$broadcast('scroll.refreshComplete');
            })

      };
})

.controller('PlaylistsCtrl', function($scope,$http,$rootScope) {
  $scope.init = function() {
    console.log("initialize called");
    $rootScope.doRefresh();
  };

})

.controller('PlaylistCtrl', function($scope, $stateParams,$rootScope) {
      console.log($scope);
      console.log($stateParams);
      var sno = $stateParams.sno;

      $scope.$watch('cars', function() {
        var found = false;
        $rootScope.cars.forEach(function(car){
          if(car.sno==sno){
            $scope.car = car;
            found = true;
          }
        });
        $scope.offer = 0;
        if(found) $scope.offerprice = (1-($scope.offer/100))*$scope.car.price;
        else $scope.offerprice = 0;
      });
      $scope.increaseOffer = function(){
        $scope.offer = $scope.offer +10;
      };
      $scope.decreaseOffer = function(){
        $scope.offer = $scope.offer -10;
      };


      //DRAW MAP
      $scope.myLatlng = new google.maps.LatLng(12.983662, 77.638499);
      var mapOptions = {
        zoom: 12,
        center: $scope.myLatlng
      };
      var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
      //var image = 'img/marker1.png';
      //var marker_mylocation = new google.maps.Marker({
      //  position: $scope.myLatlng,
      //  map: map,
      //  draggable:true,
      //  icon: image,
      //  animation: google.maps.Animation.DROP,
      //  title: 'Hello World!'
      //});
      //google.maps.event.addListener(marker_mylocation, 'click', toggleBounce);

//      var populationOptions = {
//        strokeColor: '#3399FF',
//        strokeOpacity: 0.8,
//        strokeWeight: 2,
//        fillColor: '#3399FF',
//        fillOpacity: 0.1,
//        map: map,
////            icon: {
////                url: "img/location_pin.png",
////                size: new google.maps.Size(700, 700),
////                anchor: new google.maps.Point(40, 40)
////            },
//        //center: $scope.myLatlng,
//        editable : true,
//        radius: $scope.radius
//      };
      $scope.init = function() {
        console.log("initialize called");
        $rootScope.doRefresh();
      };
});

