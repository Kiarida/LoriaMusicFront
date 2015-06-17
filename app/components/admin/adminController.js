app.controller('AdminCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$cookies', '$routeParams', "$sce",
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $cookies, $routeParams, $sce){

$scope.listAlgos=[];
$scope.currentTest=null;
$scope.nbGroups=null;
$scope.complete=true;
$scope.genGroups=true;
$scope.newTest={
  "label": null,
  "mode": null,
  "groups":[],
};
$rootScope.isAdmin=true;



$scope.algorithms={
  "id" : null,
  "label" : null,
};

console.log($rootScope);


//$rootScope.isAdmin = true;
$scope.isAdmin = true;
$scope.modes=[
{"Label": "A/B Testing", 
"Mode" : "A_B"},
{"Label" : "Same for all", "Mode" : "Same"}];

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
        },
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
          $scope.listAlgos.push(mess[i]);
        }
      
    })
 	};

  $scope.getCurrentTest=function(){
    CurrentTest.query({}, function(mess){

      $scope.currentTest=mess[0];
      console.log($scope.currentTest);
    }) 
  };

  $scope.changeMode=function(mode){
    console.log(mode);
  }

  $scope.testGroups=function(nbGroups){
    Groups.query({nbgroups : nbGroups}, function(){
      console.log("true");
        $scope.genGroups=true;
        $scope.generateGroups(nbGroups);
      }, function(){
        console.log("false");
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
    "algos" :[],
    };
      $scope.newTest.groups.push(newgroup);
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
      Tests.save({}, {mode: $scope.newTest.mode, label:$scope.newTest.label, groups:$scope.nbGroups, idAlgo:arrayalgo}, function(){
        $scope.getCurrentTest();
        $scope.currentTest=true;
      });
    }
    else{
      $scope.complete=false;
    }
    
  }

  $scope.removeAlgo=function(algo, parent, index){
    $scope.newTest.groups[parent].algos.splice(index, 1);
  }


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

  $scope.getAlgorithms();
  $scope.getCurrentTest();


}]);
