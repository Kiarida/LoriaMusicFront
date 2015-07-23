app.controller('RecomCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$cookies', '$q',
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $cookies, $q){


var controller = this;
	$scope.user = Auth.getUser();
	$scope.search ="";
	$scope.error = "";
	$scope.success ="";
  $scope.listAlgos=null;
  $rootScope.radioMode=true;
  //$scope.currentAlgorithm=;
  $scope.currentSong = $rootScope.playlist[0];
  //$rootScope.recomPlaylist = $rootScope.playlist;

var Recommandations = $resource(routeRessource.Recommandations,{},
      {
            'query': {
                method: 'GET',
                isArray: false,
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
    $scope.listAlgos[0].angle=-30;
    $scope.listAlgos[1].angle=0;
    $scope.listAlgos[2].angle=30;
    if($rootScope.radioMode){
      var j=0;


      Recommandations.query({iduser:Auth.getUser().id, item : $rootScope.currentVideo.id},function(mess){
    
      for(var i in $scope.listAlgos){

        var algos = $scope.listAlgos[i].nom;
        $scope.listAlgos[i].track=[];
        $scope.listAlgos[i].track=mess[algos][0];
        $scope.listAlgos[i].track.color={};
          $scope.listAlgos[i].track.color.code=$scope.listAlgos[i].color;
          $scope.listAlgos[i].track.color.name=$scope.listAlgos[i].label;
          if(!$scope.listAlgos[i].track.urlCover){
          $scope.listAlgos[i].track.urlCover="assets/img/placeholder.png";
        }

        
      }

      
      
      
      //Si on vient d'arriver dans le mode radio, on n'a pas encore de "route" choisie
      if(!$scope.currentAlgorithm){

            $scope.currentAlgorithm=$scope.listAlgos[1];
            $scope.listAlgos[1].selected=true;
            $rootScope.playlist[$rootScope.playlist.length]=$scope.listAlgos[1].track;
            //$rootScope.recomPlaylist[0]=$rootScope.playlist[0];

          }
      else{
            for(var i in $scope.listAlgos){
                 if($scope.listAlgos[i].nom == $scope.currentAlgorithm.nom){
                $rootScope.playlist[$rootScope.playlist.length]=$scope.listAlgos[i].track;

              }
            }
          }
          /*if($rootScope.playlist.length != $rootScope.recomPlaylist.length){
            var index = $rootScope.playlist.indexOf($rootScope.currentVideo);
            var playtemp = $rootScope.playlist.slice(index+1, $rootScope.playlist.length);
            for(var j in playtemp){
              $rootScope.recomPlaylist.push(playtemp[j]);

            }
          }*/
          $(".reco-song .index, .reco-song .artiste").animate({
              opacity: "1"
            //height: "110%"
          }, "slow", function() {
          
          });
          
      });
        
    }
        //return algostrack;
    
    
  }


  $scope.sortAlgorithms=function(algo){
    for(var i in $scope.listAlgos){
      $scope.listAlgos[i].selected = false;
      if($scope.listAlgos[i].nom == algo){
        $scope.currentAlgorithm=$scope.listAlgos[i];
        $scope.listAlgos[i].selected = true;
        var index = $rootScope.playlist.indexOf($rootScope.currentVideo);
        $rootScope.playlist[index+1]=$scope.listAlgos[i].track;
        $rootScope.recomPlaylist[1]=$scope.listAlgos[i].track;
      }
    }

  }

$scope.blockReco=function(id){
      if($rootScope.recomPlaylist.length == 1){
        $scope.getRecommandation();
      }
        var index = $rootScope.recomPlaylist.indexOf(id);

        
        $rootScope.recomPlaylist.splice(index);
        

        $rootScope.block(id);
}

  $scope.$on('creationEcoute', function(event){ 
          $scope.getRecommandation();
       });
  
	






}]);
