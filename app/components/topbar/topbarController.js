app.controller('topbarController', ['$scope','$cookieStore', 'Auth', '$location',function ($scope, $cookieStore, Auth, $location) {

  
   $scope.status = {
    isopen: false
  };

  $scope.logout = function(){
    Auth.setUser(null);
    $cookieStore.remove("user");
    $location.path("/preferences");
  }

  $scope.toggled = function(open) {
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };

  $scope.user = Auth.getUser();

  

}]);