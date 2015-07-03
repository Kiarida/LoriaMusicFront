app.controller('RecomCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$cookies',
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $cookies){
  /*window.onbeforeunload =function(event){
     var message = 'If you leave this page you are going to lose all unsaved changes, are you sure you want to leave?';
      if (typeof event == 'undefined') {
        event = window.event;
      }
      if (event) {
        event.returnValue = message;
      }
      return message;

    };*/


var controller = this;
  console.log(controller);
    controller.accessor = {};
    controller.callDirective = function(){
        if (controller.accessor.getData) {
            var data = controller.accessor.getData();
            alert('Data from directive:' + JSON.stringify(data));
        }
    };
  $scope.radioMode=true;
	$scope.user = Auth.getUser();
	$scope.search ="";
	$scope.error = "";
	$scope.success ="";
  $scope.listAlgos=$rootScope.currentUserTest[0].idgroup[0].idalgorithm;
  $rootScope.radioMode=true;

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
    if($rootScope.radioMode){
      for(var i in $scope.listAlgos){
        var algos = $scope.listAlgos[i].nom;
       // algostrack.push(algos);
     
        $scope.listAlgos[i].track=[];
        Recommandations.query({iduser:Auth.getUser().id, algorithm : algos},function(mess){
        
        mess[0][0].color={};
        mess[0][0].color.code=$scope.listAlgos[i].color;
        mess[0][0].color.name=$scope.listAlgos[i].label;
        $scope.listAlgos[i].track=mess[0][0];  
        console.log($scope.listAlgos);

        
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
        //$rootScope.playlist.push(mess[0][0]);
        console.log("Recommandations");
      });
    }
  }

  $scope.$on('creationEcoute', function(event){ 
          $scope.getRecommandation();
          


       });
  
	






}]);
