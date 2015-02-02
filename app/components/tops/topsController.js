app.controller('TopsCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$sce',
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $sce){

	var controller = this;
	controller.currentVideo = -1;
	controller.hover = false;

	var Popular = $resource(routeRessource.Popular,{},
    {
      query: {
        method: 'GET',
        isArray: true,
        headers: { 
          "Authorization" : 'WSSE profile="UsernameToken"',
          "X-wsse" : Auth.getUser().wsse
        }
      }
    });

	this.configPlaylist = {
		addToPlaylist : true,
		remove : false,
		tags : true,
		more : false,
	};

	var items = Popular.query(null, 
		function(){
			$scope.videos = items;
		},
		function(error){
			console.log(error);
		}
	);
}]);