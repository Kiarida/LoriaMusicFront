app.controller('ArtisteCoverCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$cookies','$sce',
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $cookies,$sce){



var controller = this;


$rootScope.randomItem;
$rootScope.idRadio;


 $scope.launchRandomTrack = function(idArtiste){

   $rootScope.lienRandomItemByGenre = routeRessource.RandomItemByArtiste;

		var Res = $resource($scope.lienRandomItemByGenre,{},
		{
	        'query': {
	            method: 'GET',
	            isArray: false,
	            headers: {
	              "Authorization" : 'WSSE profile="UsernameToken"',
	              "X-wsse" : Auth.getUser().wsse
	            },
	            params:{id:"@id"}
	        }
        });

				Res.query(
					{id:idArtiste},
					function(mess){
						$rootScope.randomItem = mess;
						$rootScope.idRadio=idArtiste;
						$rootScope.randomItem.sources = [{src: $sce.trustAsResourceUrl($rootScope.randomItem.url), type:"audio/mp4"}];

						$rootScope.typeEcoute = 1;
						$rootScope.launchPlay($rootScope.randomItem, 1);

					},
					function(error){ $rootScope.randomItem = error.data; });

	}




}]);
