app.controller('PlayerCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$cookies', '$sce', '$timeout',
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $cookies, $sce, $timeout){
	var controller = this;
	controller.state = null;
	controller.API = null;
	controller.currentVideo = 0;
	controller.loop = false;
	controller.random = false;
	controller.like = false;
	controller.hover = false;
	controller.block = false;
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
		//sources: "https://www.youtube.com/watch?v=gi-wl43o3gc",
		theme: {
			url: "assets/css/videogular.css"
		},
		plugins: {
			poster: $rootScope.playlist[0].poster
		},
		small: false
	};

	this.onPlayerReady = function(API) {
		controller.API = API;
		controller.API.autoPlay = true;
		//console.log($scope.launchRandomTrack(1));
		if (controller.API.currentState == 'play' || controller.isCompleted) controller.API.play();
		controller.isCompleted = false;


	};



	this.onCompleteVideo = function() {
		var Mark = $resource(routeRessource.markComplete, {},{
        'query': {
            method: 'GET',
            isArray: false,
            headers: {
              "Authorization" : 'WSSE profile="UsernameToken"',
              "X-wsse" : Auth.getUser().wsse
            },
        }
      });

		Mark.query(null,function(){});

		controller.isCompleted = true;
		if(!controller.loop){
			if(controller.random){
				var random = controller.currentVideo;
				while(random == controller.currentVideo){
					random = Math.floor(Math.random()*($rootScope.playlist.length));
				}
				controller.currentVideo = random;
			}
      else if($rootScope.lienRandomItemByGenre){
  			if(($rootScope.lienRandomItemByGenre).indexOf("artiste") > 0 ){
  				$scope.launchRandomTrack($rootScope.idRadio);
  			}
  			else if(($rootScope.lienRandomItemByGenre).indexOf("genre") > 0 ){
  				$scope.launchRandomTrack($rootScope.idRadio);
  			}
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
      	$rootScope.createEcoute({"idItem" : $rootScope.playlist[controller.currentVideo].id, "typeEcoute" : 0});


	};

	this.setVideo = function(index) {

		if(controller.API.currentState == "play" && controller.currentVideo == index){
			controller.API.pause();
		}
		else {
			controller.currentVideo = index;
			
			console.log("SET VIDEO");
			console.log($scope);
			
			controller.config.sources = $rootScope.playlist[index].sources;
			controller.API.play();
      		$rootScope.createEcoute({"idItem" : $rootScope.playlist[controller.currentVideo].id, "typeEcoute" : 0});

		}


	};



	 $scope.launchRandomTrack = function(idArtiste){
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
					{id:idArtiste},
					function(mess){
						$rootScope.randomItem = mess;

						$rootScope.randomItem[0].sources = [{src: $sce.trustAsResourceUrl($rootScope.randomItem[0].url), type:"audio/mp3"}];

						$rootScope.typeEcoute = 1;
						$rootScope.launchPlay($rootScope.randomItem, "radio");

					},
					function(error){ $rootScope.randomItem = error.data; });

	};


  var Mark = $resource(routeRessource.mark30seconds, {},{
        'query': {
            method: 'GET',
            isArray: false,
            headers: {
              "Authorization" : 'WSSE profile="UsernameToken"',
              "X-wsse" : Auth.getUser().wsse
            },
        }
      });

   var Stream = $resource(routeRessource.getStreaming, {},{
        'query': {
            method: 'GET',
            isArray: false,
            headers: {
              "Authorization" : 'WSSE profile="UsernameToken"',
              "X-wsse" : Auth.getUser().wsse
            },
            params:{iditem:"@iditem"}
        }
      });



	$scope.$watchGroup(['controller.videos', 'controller.currentVideo'], function(){
		Stream.query({iditem:$rootScope.playlist[controller.currentVideo].id}, function(mess){ 
        $rootScope.playlist[controller.currentVideo].sources = [{src: $sce.trustAsResourceUrl(mess.url), type:"audio/mp3"}];
    	});
    	$timeout(function(){Mark.query(null, function(){
        })}, 30000);
        
	});

	

}]);
