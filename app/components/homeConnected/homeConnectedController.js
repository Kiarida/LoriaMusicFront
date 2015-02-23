app.controller('HomeConnectedCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$cookies','$sce',
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $cookies,$sce){



var controller = this;

$scope.lienGenres = routeRessource.Genres;
$scope.lienArtistes = routeRessource.Artistes;

$scope.itemgenres = getGenres();
$rootScope.itemartistes = getArtistes();
$rootScope.getLast5Ecoutes();


function getGenres(){

		var Res = $resource($scope.lienGenres,{},
		{
	        'query': {
	            method: 'GET',
	            isArray: true,
	            headers: { 
	              "Authorization" : 'WSSE profile="UsernameToken"',
	              "X-wsse" : Auth.getUser().wsse
	            }
	        }
        });
		
				Res.query(null,function(mess){ $scope.itemgenres = mess; },function(error){ $scope.itemgenres = error.data; });
				
	}

	function getArtistes(){

		var Res = $resource($scope.lienArtistes,{},
		{
	        'query': {
	            method: 'GET',
	            isArray: true,
	            headers: { 
	              "Authorization" : 'WSSE profile="UsernameToken"',
	              "X-wsse" : Auth.getUser().wsse
	            }
	        }
        });
		
				Res.query(null,function(mess){ $rootScope.itemartistes = mess; },function(error){ $rootScope.itemartistes = error.data; });
				
	}


	

}]);