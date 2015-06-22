app.controller('CurrentTestCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$cookies', '$routeParams', "$sce",
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $cookies, $routeParams, $sce){


$scope.currentTest=null;


if(Auth.getUser().role == "admin_user"){
  $rootScope.isAdmin=true;
}


 
  var EndTest = $resource(routeRessource.EndTest, {},
  {
    'query': {
            method: 'GET',
            isArray: false,
            headers: {
              "Authorization" : 'WSSE profile="UsernameToken"',
              "X-wsse" : Auth.getUser().wsse
            },
            params:{idtest:"@idtest"},
        },
  });

   var CurrentTest = $resource(routeRessource.CurrentTest, {},
  {
    'query': {
            method: 'GET',
            isArray: true,
            headers: {
              "Authorization" : 'WSSE profile="UsernameToken"',
              "X-wsse" : Auth.getUser().wsse
            },
            params:{iduser:"@iduser"},
        },
  });



  $scope.getCurrentTest=function(){
    CurrentTest.query({iduser:false}, function(mess){

      $scope.currentTest=mess[0];
    }) 
  };




  $scope.endTest=function(idtest){
    EndTest.query({idtest:idtest}, function(){
      $scope.currentTest=null;
      $scope.newTest={
        "label": null,
        "mode": null,
        "groups":[],
      };
    });
  }

  $scope.getCurrentTest();




}]);
