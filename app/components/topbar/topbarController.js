app.controller('topbarController', ['$scope','$cookieStore', 'Auth', '$location','$rootScope',"$window",
  function ($scope, $cookieStore, Auth, $location,$rootScope,$window) {
  
    $rootScope.wordSearched = {search : null};
   

   $scope.status = {
    isopen: false
  };

  $scope.logout = function(){
    Auth.setUser(null);
    $cookieStore.remove("user");
    $window.location.reload();
  }

  $scope.toggled = function(open) {
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };

  $scope.user = Auth.getUser();
  $scope.search = function(){
    if($location.url() != "search")
      $location.path('/search');

    
  };
}]);