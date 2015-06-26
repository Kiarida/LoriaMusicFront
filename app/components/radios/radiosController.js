app.controller('RadioCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$cookies', '$sce',
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $cookies, $sce){

 	$scope.artistsL=false;
 	$scope.genresL=false;
 	$rootScope.radioMode=true;

	// var ItemGenres = $resource(routeRessource.ItemGenre,{},
	// 	{
	//         'query': {
	//             method: 'GET',
	//             isArray: true,
	//             headers: { 
	//               "Authorization" : 'WSSE profile="UsernameToken"',
	//               "X-wsse" : Auth.getUser().wsse
	//             },
	//             params:{id: "@id"}, 
	//         },
 //        });

	// var Artistes = $resource(routeRessource.Artistes,{},
	// 	{
	//         'query': {
	//             method: 'GET',
	//             isArray: true,
	//             headers: { 
	//               "Authorization" : 'WSSE profile="UsernameToken"',
	//               "X-wsse" : Auth.getUser().wsse
	//             }
	//         },
 //        });

	// var ItemArtiste = $resource(routeRessource.ItemArtiste,{},
	// 	{
	//         'query': {
	//             method: 'GET',
	//             isArray: true,
	//             headers: { 
	//               "Authorization" : 'WSSE profile="UsernameToken"',
	//               "X-wsse" : Auth.getUser().wsse
	//             },
	//             params:{id: "@id"},
	//         },
 //        });
	

	var Genres = $resource(routeRessource.Genres,{},
	{
	    get: {
	      method: 'GET',
	      isArray: true,
	      headers: { 
	        "Authorization" : 'WSSE profile="UsernameToken"',
	        "X-wsse" : Auth.getUser().wsse
      		},
		}
	});

	var Artistes = $resource(routeRessource.Artistes,{},
	{
	    get: {
	      method: 'GET',
	      isArray: true,
	      headers: { 
	        "Authorization" : 'WSSE profile="UsernameToken"',
	        "X-wsse" : Auth.getUser().wsse
      		},
		}
	});

	var ItemGenres = $resource(routeRessource.ItemGenre,{},
	{
	    get: {
	      method: 'GET',
	      isArray: true,
	      headers: { 
	        "Authorization" : 'WSSE profile="UsernameToken"',
	        "X-wsse" : Auth.getUser().wsse
      		},
	       params:{id: "@id"},
		}
	});

	var ItemArtiste = $resource(routeRessource.ItemArtiste,{},
	{
	    get: {
	      method: 'GET',
	      isArray: true,
	      headers: { 
	        "Authorization" : 'WSSE profile="UsernameToken"',
	        "X-wsse" : Auth.getUser().wsse
      		},
	       params:{id: "@id"},

		}
	});

	$scope.items = [];
	$scope.genres = Genres.query({},
		function(mess){
			for(var i =0; i<mess.length;i++){
				if(!mess[i].urlCover){
					mess[i].urlCover="assets/img/placeholder.png";
				}
			}
			$scope.genresLight=mess.slice(0, 6);
			// for(var i=0;i<genres.length;i++){
			// 	ItemGenres.query({id: genres[i].id},function(mess){$scope.items.push(mess); },function(error){ console.log(error.data); });
			// }
		},
		function(){  }
	);
	$scope.artistes = Artistes.query({},
		function(mess){ 
			for(var i =0; i<mess.length;i++){
				if(!mess[i].urlCover){
					mess[i].urlCover="assets/img/placeholder.png";
				}
			}
			$scope.artistsLight=mess.slice(0, 6);
			// for(var j=0;j<artistes.length;j++){
			// 	ItemArtiste.query({id: artistes[j].id},function(mess){$scope.items.push(mess); },function(error){ console.log(error.data); });
			// }
	 	},
		function(error){ 
			console.log(error.data);
		}
	);
	
	$scope.moreResults=function(type){
		if(type=="artist"){
			$scope.artistsL=true;
			$scope.artistsLight=$scope.artistes;
		}
		if(type="genres"){
			$scope.genresL=true;
			$scope.genresLight=$scope.genres;
		}
	}

	$(".genre-fading-search").on("click", function(event){
      $rootScope.searchingA=false;
      $rootScope.searchingG=false;
      $rootScope.$apply();
    })


}]);