app.controller('CoverCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$cookies','$sce',
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $cookies,$sce){

 

var controller = this;

$rootScope.lienRandomItemByGenre = routeRessource.RandomItemByGenre;


$scope.randomItem;


 $scope.getRandomItemByGenre = function(idGenre){

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
		
				Res.query({id:idGenre},function(mess){ $scope.randomItem = mess; },function(error){ $scope.randomItem = error.data; });

				console.log($scope.randomItem);
				
	}

	$scope.launchRandomTrack = function(idGenre){

		$scope.randomItem = $scope.getRandomItemByGenre(idGenre);

		$rootScope.launchPlay($scope.randomItem);
	}


}]);