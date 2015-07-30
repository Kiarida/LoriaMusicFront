app.controller('GenreCoverCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$cookies','$sce',
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $cookies,$sce){



var controller = this;
$scope.resultsgenre =[];
$scope.genreSearched="";


$rootScope.randomItem;
$rootScope.idRadio;


$scope.search=function(){
	if($scope.genreSearched!= null && $scope.genreSearched.length >= 3){
		$scope.initSearch();
		$rootScope.searchingG=true;

		//$rootScope.$apply();
		$scope.ResultsGenre.query({key : $scope.genreSearched}, function(mess){
			$scope.resultsgenre=mess;
		});
		
	}
}


$scope.initSearch = function(){
      if(Auth.getUser() && $scope.ResultsGenre == null){

        $scope.ResultsGenre = $resource(routeRessource.SearchGenres,{},
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

 $scope.launchRandomTrack = function(idGenre){
 	if($rootScope.currentUserTest[0].mode=="Same"){
		$rootScope.radioMode=true;	
	}
	else if($rootScope.currentUserTest[0].mode=="A_B"){
		$rootScope.recomMode=true;
	}

   $rootScope.lienRandomItemByGenre = routeRessource.RandomItemByGenre;

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
						$rootScope.idRadio=idGenre;

						$rootScope.randomItem.sources = [{src: $sce.trustAsResourceUrl($rootScope.randomItem[0].url), type:"audio/mp3"}];

						$rootScope.typeEcoute = 1;
						if($rootScope.radioMode){
							$location.path("/radios/recommandations");
						}
						$rootScope.launchPlay($rootScope.randomItem[0], "radio");
						$rootScope.recomPlaylist=[];
						$rootScope.recomPlaylist[0]=$rootScope.playlist[0];
						

					},
					function(error){ $rootScope.randomItem = error.data; });

	}




}]);
