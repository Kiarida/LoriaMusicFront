app.controller('PlayerCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$cookies', '$sce',
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $cookies, $sce){
	var controller = this;
	controller.state = null;
	controller.API = null;
	controller.currentVideo = 0;
	controller.loop = false;
	controller.random = false;
	controller.like = false;
	controller.hover = false;

	this.videos = $rootScope.playlist;

	this.configPlaylist = {
		addToPlaylist : true,
		remove : true,
		tags : true,
		more : false,
	};

	this.config = {
		preload: "none",
		autoHide: false,
		autoHideTime: 3000,
		autoPlay: true,
		sources: $rootScope.playlist[0].sources,
		theme: {
			url: "http://www.videogular.com/styles/themes/default/videogular.css"
		},
		plugins: {
			poster: $rootScope.playlist[0].poster
		},
		small: false
	};

	this.onPlayerReady = function(API) {
		controller.API = API;
		controller.API.autoPlay = true;

		if (controller.API.currentState == 'play' || controller.isCompleted) controller.API.play();
		controller.isCompleted = false;
		console.log($scope);
	};

	this.onCompleteVideo = function() {
		controller.isCompleted = true;
		if(!controller.loop){
			if(controller.random){
				var random = controller.currentVideo;
				while(random == controller.currentVideo){
					random = Math.floor(Math.random()*($rootScope.playlist.length));
				}
				controller.currentVideo = random;
			}
			else{
				if(controller.currentVideo == $rootScope.playlist.length-1)
						controller.currentVideo = 0
				else
					controller.currentVideo++;
			}
			controller.like = false;
		}
		controller.config.sources = $rootScope.playlist[controller.currentVideo].sources;
		controller.API.autoPlay = true;
		controller.API.play();

	};

	this.setVideo = function(index) {
		if(controller.API.currentState == "play" && controller.currentVideo == index){
			controller.API.pause();
		}
		else {
			controller.currentVideo = index;
			controller.config.sources = $rootScope.playlist[index].sources;
			controller.API.play();
		}
		
	};

	

	

}]);