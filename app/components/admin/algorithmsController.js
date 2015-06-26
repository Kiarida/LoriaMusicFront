app.controller('AlgoCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$cookies', '$routeParams', "$sce",
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $cookies, $routeParams, $sce){

$scope.listAlgos=[];

if(Auth.getUser().role == "admin_user"){
  $rootScope.isAdmin=true;
}


 
  var UpdateAlgos = $resource(routeRessource.UpdateAlgos, {},
  {
    
  });



  var Algos = $resource(routeRessource.Algos,{},
  {
        'query': {
            method: 'GET',
            isArray: true,
            headers: {
              "Authorization" : 'WSSE profile="UsernameToken"',
              "X-wsse" : Auth.getUser().wsse
            },
        },
        'update': {
            method: 'PUT',
            isArray: false,
            headers: {
              "Authorization" : 'WSSE profile="UsernameToken"',
              "X-wsse" : Auth.getUser().wsse
            },
        },

    });


  $scope.getAlgorithms=function(){
    Algos.query({}, function(mess){
      for(var i = 0; i < mess.length; i++){
          $scope.listAlgos.push(mess[i]);
        }
      
    })
  };




  $scope.updateAlgos=function(idalgo, label){

    for(var i in $scope.listAlgos){
      
      Algos.update({},{idalgo:$scope.listAlgos[i].id, label:$scope.listAlgos[i].label, color:$scope.listAlgos[i].color}, function(){
    });
    }
    
  }

  $scope.getAlgorithms();




}]);
