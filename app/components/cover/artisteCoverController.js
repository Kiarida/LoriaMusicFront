app.controller('ArtisteCoverCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$cookies','$sce',
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $cookies,$sce){



var controller = this;

$scope.resultsartist =[];
$scope.artistSearched="";
$rootScope.searchingA=false;

$rootScope.randomItem;
$rootScope.idRadio;



$scope.search=function(){
	if($scope.artistSearched!= null && $scope.artistSearched.length >= 3){
		$scope.initSearch();
		$rootScope.searchingA=true;
		//$rootScope.$apply();
		$scope.ResultsArtist.query({key : $scope.artistSearched}, function(mess){
			$scope.resultsartist=mess;
		});
		
	}
}


$scope.initSearch = function(){
      if(Auth.getUser() && $scope.ResultsArtist == null){

        $scope.ResultsArtist = $resource(routeRessource.SearchArtists,{},
		{
	        'query': {
	            method: 'GET',
	            isArray: true,
	            headers: {
	              "Authorization" : 'WSSE profile="UsernameToken"',
	              "X-wsse" : Auth.getUser().wsse
	            },
	            params:{key:"@key"}
	        }
        });
    }
   };

 $scope.launchRandomTrack = function(idArtiste){

   $rootScope.lienRandomItemByGenre = routeRessource.RandomItemByArtiste;

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
					{id:idArtiste},
					function(mess){
						$rootScope.randomItem = mess;
						$rootScope.idRadio=idArtiste;
						$rootScope.randomItem.sources = [{src: $sce.trustAsResourceUrl($rootScope.randomItem[0].url), type:"audio/mp4"}];

						$rootScope.typeEcoute = 1;
						$rootScope.launchPlay($rootScope.randomItem[0], "radio");

					},
					function(error){ $rootScope.randomItem = error.data; });

	}




}]);
