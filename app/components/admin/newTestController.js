app.controller('NewTestCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$cookies', '$routeParams', "$sce",
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $cookies, $routeParams, $sce){

$scope.listAlgos=[];
$scope.nbGroups=null;
$scope.complete=true;
$scope.currentTest=false;
$scope.genGroups=true;
$scope.newTest={
  "label": null,
  "mode": null,
  "groups":[],
};

if(Auth.getUser().role == "admin_user"){
  $rootScope.isAdmin=true;
}




$scope.algorithms={
  "id" : null,
};



//$rootScope.isAdmin = true;
$scope.modes=[
{"Label": "One recommandation", 
"Mode" : "A_B"},
{"Label" : "Multiple recommendations", "Mode" : "Same"}];

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

    });

 var Groups = $resource(routeRessource.Groups,{},
  {
        'query': {
            method: 'GET',
            isArray: false,
            headers: {
              "Authorization" : 'WSSE profile="UsernameToken"',
              "X-wsse" : Auth.getUser().wsse
            },
        },

    });

  var Tests = $resource(routeRessource.Tests, {},
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
            method: 'POST',
            isArray: false,
            headers: {
              "Authorization" : 'WSSE profile="UsernameToken"',
              "X-wsse" : Auth.getUser().wsse
            },
     }
  });



	 	
 	$scope.getAlgorithms=function(){
    Algos.query({}, function(mess){
      for(var i = 0; i < mess.length; i++){
          $scope.listAlgos.push(mess[i]);
        }
      
    })
 	};

  $scope.getCurrentTest=function(){
    CurrentTest.query({iduser:false}, function(mess){

      $scope.currentTest=mess[0];
    }) 
  };

  $scope.changeMode=function(mode){

  }

  $scope.testGroups=function(nbGroups){
    Groups.query({nbgroups : nbGroups}, function(){
        $scope.genGroups=true;
        $scope.generateGroups(nbGroups);
      }, function(){
        $scope.genGroups=false;
      }

    );
  }


  $scope.generateGroups=function(nbGroups){
    $scope.newTest.groups=[];
    $scope.nbGroups=nbGroups;
    for(var i = 0; i < nbGroups; i++){
         var newgroup={
        "numero" : i+1,
        "nbalgos": 0,
        "algos" :[],
        };
          $scope.newTest.groups.push(newgroup);
          if($scope.newTest.mode=="Same"){
            console.log("hey");
            $scope.newTest.groups[i].nbalgos=3;
          }
          else if($scope.newTest.mode=="A_B"){
            $scope.newTest.groups[i].nbalgos=1;
          }
          for(var j = 1; j<= $scope.newTest.groups[i].nbalgos; j++){
            var newalgo={
            "id" : null,
              };
              $scope.newTest.groups[i].algos.push(newalgo);
    }
      }

    
  }

  $scope.changeAlgo=function(id, algo, index){
    algo.id=id;
    //$scope.newTest.groups[index].algos
  }

  $scope.addAlgo=function(index){
    var newalgo={
      "id" : null,
    };
    $scope.newTest.groups[index].algos.push(newalgo);
  }

  $scope.generateAlgos=function(index){
    $scope.newTest.groups[index].algos =[];
    for(var i = 1; i<= $scope.newTest.groups[index].nbalgos; i++){
      var newalgo={
      "id" : null,
        };
        $scope.newTest.groups[index].algos.push(newalgo);
    }
    
  }

  $scope.saveTest=function(){
    var arrayalgo=new Object();
    for(var i in $scope.newTest.groups){
      arrayalgo[$scope.newTest.groups[i].numero] = [];
      for(var j in $scope.newTest.groups[i].algos){
        arrayalgo[$scope.newTest.groups[i].numero].push($scope.newTest.groups[i].algos[j].id);
        
      }
    }
    if($scope.newTest.mode != null && $scope.nbGroups != null){
      $scope.complete=true;
      $scope.currentTest=true;
      Tests.save({}, {mode: $scope.newTest.mode, label:$scope.newTest.label, groups:$scope.nbGroups, idAlgo:arrayalgo}, function(){
      });
    }
    else{
      $scope.complete=false;
    }
    
  }

  $scope.removeAlgo=function(algo, parent, index){
    $scope.newTest.groups[parent].algos.splice(index, 1);
  }


  $scope.getAlgorithms();



}]);
