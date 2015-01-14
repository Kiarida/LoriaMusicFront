app.controller('PlayerCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$cookies', '$sce',
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $cookies, $sce){
	/* this.config = {
		sources: [
			{src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/audios/videogular.ogg"), type: "audio/ogg"}
		],
		tracks: [
			{
				src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
				kind: "subtitles",
				srclang: "en",
				label: "English",
				default: ""
			}
		],
		theme: "assets/libs/bower_components/videogular-themes-default/videogular.css",
		plugins: {
			poster: "http://www.videogular.com/assets/images/videogular.png"
		}
	};*/

	var controller = this;
	controller.state = null;
	controller.API = null;
	controller.currentVideo = 0;
	controller.loop = false;
	controller.random = false;
	controller.like = false;
	controller.hover = false;

	this.videos = [
		{
			id : 1,
			sources: [
				{src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/audios/videogular.ogg"), type: "audio/ogg"}
			],
			name: "Videogular",
			artiste : "Angular",
			rate: 3,
			poster: "http://www.videogular.com/assets/images/videogular.png"
		},
		{
			id : 1,
			sources: [
				{src: $sce.trustAsResourceUrl("http://incompetech.com/music/royalty-free/mp3-royaltyfree/Gonna%20Start%20v2.mp3"), type: "audio/mp3"}
			],
			name: "Gonna start",
			artiste : "RoyalityFree",
			rate: 2,
			poster: "http://www.kvalitat.com/wp-content/uploads/2013/03/bandlogogic2-700x414.png"

		},
		{
			id : 1,
			sources: [
				{src: $sce.trustAsResourceUrl("http://incompetech.com/music/royalty-free/mp3-royaltyfree/On%20the%20Ground.mp3"), type: "audio/mp3"}
			],
			name: "On the ground",
			artiste : "RoyalityFree",
			rate: 1,
			poster: "http://sensiblereason.com/wp-content/uploads/2012/01/on-the-ground.jpg"
		},
		{
			id : 1,
			sources: [
				{src: $sce.trustAsResourceUrl("https://api.soundcloud.com/tracks/185445543/download?client_id=b45b1aa10f1ac2941910a7f0d10f8e28"), type: "audio/mp3"}
			],
			name: "Charlie",
			artiste : "Tryo",
			rate: 5,
			poster: "http://img.gala.fr/fit/http.3A.2F.2Fwww.2Egala.2Efr.2Fvar.2Fgal.2Fstorage.2Fimages.2Fmedia.2Fmultiupload_du_12_janvier_2015.2Ftryo.2F3206121-1-fre-FR.2Ftryo.2Ejpg/1140x499/crop-from/top/quality/80/tryo.jpg"
		}

	];

	this.config = {
		preload: "none",
		autoHide: false,
		autoHideTime: 3000,
		autoPlay: true,
		sources: controller.videos[0].sources,
		theme: {
			url: "http://www.videogular.com/styles/themes/default/videogular.css"
		},
		plugins: {
			poster: "http://www.videogular.com/assets/images/videogular.png"
		},
		small: false
	};

	this.onPlayerReady = function(API) {
		controller.API = API;

		if (controller.API.currentState == 'play' || controller.isCompleted) controller.API.play();

		controller.isCompleted = false;
	};

	this.onCompleteVideo = function() {
		controller.isCompleted = true;
		if(!controller.loop){
			if(controller.random){
				var random = controller.currentVideo;
				while(random == controller.currentVideo){
					random = Math.floor(Math.random()*(controller.videos.length));
				}
				controller.currentVideo = random;
			}
			else{
				if(controller.currentVideo == controller.videos.length-1)
						controller.currentVideo = 0
				else
					controller.currentVideo++;
			}
			controller.like = false;
		}
		controller.config.sources = controller.videos[controller.currentVideo].sources;
		controller.API.autoPlay = true;
		controller.API.play();

	};

	

	

}]);