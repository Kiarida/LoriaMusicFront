app.controller('topbarController', ['$scope','$resource', 'routeRessource', '$cookieStore', 'Auth', '$location','$rootScope',"$window",
  function ($scope,$resource, routeRessource, $cookieStore, Auth, $location,$rootScope,$window) {   

   $scope.status = {
    isopen: false
  };

  $scope.logout = function(){
    var EndSession = $resource(routeRessource.EndSession,{},
        {
          update: {
            method: 'PUT',
            isArray: false,
            headers: {
              "Authorization" : 'WSSE profile="UsernameToken"',
              "X-wsse" : Auth.getUser().wsse
            },
            params: {iduser:"@iduser"},
          }
        });
    EndSession.update({iduser:Auth.getUser().id});
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
  
}]);