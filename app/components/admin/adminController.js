app.controller('AdminCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$cookies', '$routeParams', "$sce",
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $cookies, $routeParams, $sce){

$scope.listAlgos=[];
$scope.selectedAlgo=[];
$scope.symbols=[">", "<", "="];
//$rootScope.isAdmin = true;
$scope.isAdmin = true;


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
        console.log(mess);
        if(mess[i].used == true){
          
          $scope.selectedAlgo.push(mess[i]);

        }
        else{
          $scope.listAlgos.push(mess[i]);
        }
      }
    })
 	}

  $scope.addAlgo=function(){
    var algo={id:"new", nom:$scope.listAlgos[0].nom};
    $scope.selectedAlgo.push(algo);
  }

  $scope.addLimit=function(index){
    console.log("limite "+index);
    var limit={id:"new", symbole:$scope.symbols[0], valeur:0}
    $scope.selectedAlgo[index].idlimit.push(limit);

  }

  $scope.update=function(before_algo, index){
    for(var i = 0; i < $scope.listAlgos.length; i++){
      if($scope.listAlgos[i].id == before_algo){
        var algo_a=$scope.listAlgos[i];
        var index_a=i;
      }
    }
    
    var algo_b = $scope.selectedAlgo[index];
    //var algo_a=$scope.listAlgos[];
    $scope.selectedAlgo.splice(index);


    $scope.selectedAlgo.push(algo_a);

    $scope.listAlgos.splice(index_a);
    $scope.listAlgos.push(algo_b);

  }

  $scope.saveAlgo=function(){

  }
 
  $scope.getAlgorithms();

}]);
