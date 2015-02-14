app.controller('GenreCoverCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$cookies','$sce',
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $cookies,$sce){

 

var controller = this;

$rootScope.lienRandomItemByGenre = routeRessource.RandomItemByGenre;


$rootScope.randomItem;


 $scope.launchRandomTrack = function(idGenre){

		var Res = $resource($scope.lienRandomItemByGenre,{},
		{
	        'query': {
	            method: 'GET',
	            isArray: true,
	            headers: { 
	              "Authorization" : 'WSSE profile="UsernameToken"',
	              "X-wsse" : Auth.getUser().wsse
	            },
	            params:{id:"@id"}
	        }
        });
		
				Res.query(
					{id:idGenre},
					function(mess){ 
						$rootScope.randomItem = mess;

						$rootScope.randomItem[0].sources = [{src: $sce.trustAsResourceUrl($rootScope.randomItem[0].url), type:"audio/mp3"}];
						
						$rootScope.typeEcoute = 1;
						$rootScope.launchPlay($rootScope.randomItem);
						
					},
					function(error){ $rootScope.randomItem = error.data; });
		
	}

	


}]);