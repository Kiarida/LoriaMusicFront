app.controller('HomeConnectedCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$cookies','$sce',
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $cookies,$sce){

 // 	$scope.itemgenres = [
	// 	{
	// 		id : 1,
	// 		sources: [
	// 			{src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/audios/videogular.ogg"), type: "audio/ogg"}
	// 		],
	// 		name: "Classic",
	// 		artiste : "Angular",
	// 		rate: 3,
	// 		poster: "http://www.videogular.com/assets/images/videogular.png",
	// 		tags:["test","rap"],
	// 		cover: "http://lorempixel.com/200/200/",
	// 	},
	// ];

	// $rootScope.itemartistes = [
	// 	{
	// 		id : 2,
	// 		sources: [
	// 			{src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/audios/videogular.ogg"), type: "audio/ogg"}
	// 		],
	// 		name: "Videogular",
	// 		artiste : "Angular",
	// 		rate: 3,
	// 		poster: "http://www.videogular.com/assets/images/videogular.png",
	// 		tags:["test","rap"],
	// 		cover: "http://lorempixel.com/200/200/",
	// 	},
	// ];

	/*
	var Genres = $resource(routeRessource.Genre,{},
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

	var ItemGenres = $resource(routeRessource.ItemGenre,{},
		{
	        'query': {
	            method: 'GET',
	            isArray: true,
	            headers: { 
	              "Authorization" : 'WSSE profile="UsernameToken"',
	              "X-wsse" : Auth.getUser().wsse
	            },
	            params:{id: "@id"}, 
	        },
        });

	var Artistes = $resource(routeRessource.Artistes,{},
		{
	        'query': {
	            method: 'GET',
	            isArray: true,
	            headers: { 
	              "Authorization" : 'WSSE profile="UsernameToken"',
	              "X-wsse" : Auth.getUser().wsse
	            }
	        },
        });

	var ItemArtiste = $resource(routeRessource.ItemArtiste,{},
		{
	        'query': {
	            method: 'GET',
	            isArray: true,
	            headers: { 
	              "Authorization" : 'WSSE profile="UsernameToken"',
	              "X-wsse" : Auth.getUser().wsse
	            },
	            params:{id: "@id"},
	        },
        });
	var i;
	var tmp;
	var genres = Genres.query(null,function(mess){ $scope.genres = mess; },function(error){ console.log(error.data); });
	var artistes = Artistes.query(null,function(mess){ $scope.artistes = mess; },function(error){ console.log(error.data); });
	for(i=0;i<genres.length;i++){
		ItemGenre.query({id: genres[i].id},function(mess){$scope.itemgenres.push(mess)},function(error){ console.log(error.data); }));
	}
	for(i=0;i<artistes.length;i++){
		ItemArtiste.query({id: artistes[i].id},function(mess){$scope.itemartistes.push(mess)},function(error){ console.log(error.data); }));
	}
	*/

var controller = this;

$scope.lienGenres = routeRessource.Genres;
$scope.lienArtistes = routeRessource.Artistes;

$scope.itemgenres = getGenres();
$rootScope.itemartistes = getArtistes();

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
		
				Res.query(null,function(mess){ $rootScope.itemartistes = mess; },function(error){ $rootSscope.itemartistes = error.data; });
				
	}


	

}]);