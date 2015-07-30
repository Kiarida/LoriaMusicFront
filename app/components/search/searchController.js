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
	

}]);