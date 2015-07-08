app.controller('RecomCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$cookies',
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $cookies){


var controller = this;

  $scope.radioMode=true;
	$scope.user = Auth.getUser();
	$scope.search ="";
	$scope.error = "";
	$scope.success ="";
  $scope.listAlgos=null;
  $rootScope.radioMode=true;
  $scope.currentAlgorithm=null;

  $scope.currentSong = $rootScope.playlist[0];


var Recommandations = $resource(routeRessource.Recommandations,{},
      {
            'query': {
                method: 'GET',
                isArray: true,
                headers: {
                  "Authorization" : 'WSSE profile="UsernameToken"',
                  "X-wsse" : Auth.getUser().wsse
                },
                params:{iduser:"@iduser"},
            }
          });

  $scope.getRecommandation=function(){
    var algostrack=[];
    $scope.listAlgos=$rootScope.currentUserTest[0].idgroup[0].idalgorithm;

    if($rootScope.radioMode){
      var j=0;
      for(var i in $scope.listAlgos){
        console.log(i);
        var algos = $scope.listAlgos[i].nom;
       // algostrack.push(algos);
     
        $scope.listAlgos[i].track=[];
        
        Recommandations.query({iduser:Auth.getUser().id, algorithm : algos},function(mess){
        mess[0][0].color={};
        mess[0][0].color.code=$scope.listAlgos[j].color;
        mess[0][0].color.name=$scope.listAlgos[j].label;

        $scope.listAlgos[j].track=mess[0][0];  
        j++;
      
        
    });
      }
        //return algostrack;
    }
    else{
      var algo = $rootScope.currentUserTest[0].idgroup[0].idalgorithm[0].nom

      Recommandations.query({iduser:Auth.getUser().id, algorithm : algo},function(mess){
        //console.log(mess);
        mess[0][0].color={};
        mess[0][0].color.code=$rootScope.currentUserTest[0].idgroup[0].idalgorithm[0].color;
        mess[0][0].color.name=$rootScope.currentUserTest[0].idgroup[0].idalgorithm[0].label;
      });
    }
  }


  $scope.sortAlgorithms=function(algo){
    for(var i in $scope.listAlgos){
      $scope.listAlgos[i].selected = false;
      if($scope.listAlgos[i].nom == algo){
        $scope.listAlgos[i].selected = true;
        $rootScope.playlist[$rootScope.playlist.length]=$scope.listAlgos[i].track;
      }
    }

    console.log($scope.listAlgos);
  }

  $scope.$on('creationEcoute', function(event){ 
          $scope.getRecommandation();
       });
  
	






}]);
