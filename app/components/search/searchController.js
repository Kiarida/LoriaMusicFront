app.controller('SearchCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$cookies', '$sce',
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $cookies,$sce){
	//TODO : créer la fonction qui renvoi les résultats

	var controller = this;
	controller.currentVideo = -1;
	controller.hover = false;
	this.config = {small : false};
	this.configPlaylist = {
		addToPlaylist : true,
		remove : false,
		tags : true,
		more : false,
	};
	
	$scope.itemartistes = [
		{
			id : 1,
			sources: [
				{src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/audios/videogular.ogg"), type: "audio/ogg"}
			],
			name: "Angular",
			artiste : "Angular",
			rate: 3,
			poster: "http://www.videogular.com/assets/images/videogular.png",
			tags:["test","rap"],
			cover: "http://lorempixel.com/200/200/",
		},
	];

}]);