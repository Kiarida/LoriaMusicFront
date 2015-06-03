app.controller('AdminCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$cookies', '$routeParams', "$sce",
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $cookies, $routeParams, $sce){

$scope.listAlgos=["hello", "truc"];
$scope.selectedAlgo=[];

 //Liste des algos disponibles
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
        'save':{
        	ethod: 'POST',
            isArray: true,
            headers: {
              "Authorization" : 'WSSE profile="UsernameToken"',
              "X-wsse" : Auth.getUser().wsse
            },
            params:{}
        }

    });

  var AlgosUser = $resource(routeRessource.AlgosUser,{},
  {
        'query': {
            method: 'GET',
            isArray: true,
            headers: {
              "Authorization" : 'WSSE profile="UsernameToken"',
              "X-wsse" : Auth.getUser().wsse
            },
        },
        'save':{
          ethod: 'POST',
            isArray: true,
            headers: {
              "Authorization" : 'WSSE profile="UsernameToken"',
              "X-wsse" : Auth.getUser().wsse
            },
            params:{iduser:"@iduser"}
        }

    });

   var Recommandations = $resource(routeRessource.Recommandations,{},
  {
        'query': {
            method: 'GET',
            isArray: true,
            headers: {
              "Authorization" : 'WSSE profile="UsernameToken"',
              "X-wsse" : Auth.getUser().wsse
            },
        },
        'save':{
          ethod: 'POST',
            isArray: true,
            headers: {
              "Authorization" : 'WSSE profile="UsernameToken"',
              "X-wsse" : Auth.getUser().wsse
            },
            params:{iduser:"@iduser"}
        }

    });

	 $scope.availableAlgorithms=function(){

	 }
	 	
 	$scope.getAlgorithms=function(){
    Algos.query({}, function(mess){
      for(var i = 0; i < mess.length; i++){
        console.log(mess[i].used);
        if(mess[i].used == true){
          $scope.selectedAlgo.push(mess[i]);
          console.log($scope.selectedAlgo);
        }
       else{
          $scope.listAlgos.push(mess[i]);
        }
      }
    })
 	}
 
  $scope.getAlgorithms();

}]);
