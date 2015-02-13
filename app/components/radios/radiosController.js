app.controller('RadioCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$cookies', '$sce',
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $cookies, $sce){

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
			// for(var i=0;i<genres.length;i++){
			// 	ItemGenres.query({id: genres[i].id},function(mess){$scope.items.push(mess); },function(error){ console.log(error.data); });
			// }
		},
		function(){  }
	);
	$scope.artistes = Artistes.query({},
		function(mess){ 
			// for(var j=0;j<artistes.length;j++){
			// 	ItemArtiste.query({id: artistes[j].id},function(mess){$scope.items.push(mess); },function(error){ console.log(error.data); });
			// }
	 	},
		function(error){ 
			console.log(error.data);
		}
	);
	


}]);