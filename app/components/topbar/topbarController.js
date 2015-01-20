app.controller('topbarController',["$scope",'$log','$location', '$rootScope',function ($scope, $log, $location,$rootScope) {
  
    $rootScope.wordSearched = {search : null};
   

   $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };

  $scope.user = {

    id : 177383,
    lastName : "John",
    firstName : "Thomas"

  };
  $scope.search = function(){
    if($location.url() != "search")
      $location.path('/search');

    
  };

  

}]);