app.controller('HomeConnectedCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$cookies',
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $cookies){
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

	$scope.toto = "toto";

	$scope.itemgenres = [
    	{id: 'p1', 'title': 'classic', src: "http://lorempixel.com/200/200/"},
	    {id: 'p2', 'title': 'Pop', src: "http://lorempixel.com/200/200/sports"},
	    {id: 'p3', 'title': 'rock', src: "http://lorempixel.com/200/200/nightlife"},
	    {id: 'p1', 'title': 'classic', src: "http://lorempixel.com/200/200/"},
	    {id: 'p2', 'title': 'Pop', src: "http://lorempixel.com/200/200/sports"},
	    {id: 'p3', 'title': 'rock', src: "http://lorempixel.com/200/200/nightlife"},
	    {id: 'p1', 'title': 'classic', src: "http://lorempixel.com/200/200/"},
	    {id: 'p2', 'title': 'Pop', src: "http://lorempixel.com/200/200/sports"},
	    {id: 'p3', 'title': 'rock', src: "http://lorempixel.com/200/200/nightlife"},
	];


	$scope.itemartistes = [
    	{id: 'p1', 'title': 'Acdc', src: "http://lorempixel.com/200/200/"},
	    {id: 'p2', 'title': 'Alain Souchon', src: "http://lorempixel.com/200/200/sports"},
	    {id: 'p3', 'title': 'Assassin', src: "http://lorempixel.com/200/200/nightlife"},
	    {id: 'p1', 'title': 'IAM', src: "http://lorempixel.com/200/200/"},
	    {id: 'p2', 'title': 'The Hives', src: "http://lorempixel.com/200/200/sports"},
	    {id: 'p3', 'title': 'Queen', src: "http://lorempixel.com/200/200/nightlife"},
	    {id: 'p1', 'title': 'led zepelin', src: "http://lorempixel.com/200/200/"},
	    {id: 'p2', 'title': 'Tryo', src: "http://lorempixel.com/200/200/sports"},
	    {id: 'p3', 'title': 'David Guetta', src: "http://lorempixel.com/200/200/nightlife"},
	];

}]);