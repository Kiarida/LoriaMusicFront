app.controller('PlayerCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$cookies', '$sce', '$interval', '$cookieStore',
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $cookies, $sce, $interval, $cookieStore){
 	
	var controller = this;
	var promise;
	var created = false;
	var marked=false;
	var ended=false;
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


	var GetToken = $resource(routeRessource.RhapsodyToken, {},
        {
          'query': {
              method: 'GET',
              isArray: false,
              headers: {
                "Authorization" : 'WSSE profile="UsernameToken"',
                "X-wsse" : Auth.getUser().wsse
              },
              params:{iduser:"@iduser"}
            }
        });
        var RefreshToken = $resource(routeRessource.RhapsodyRefreshToken, {},
        {
          'update': {
              method: 'PUT',
              isArray: false,
              headers: {
                "Authorization" : 'WSSE profile="UsernameToken"',
                "X-wsse" : Auth.getUser().wsse
              },
              params:{iduser:"@iduser"}
            }
        });

	this.onPlayerReady = function(API) {
		if(typeof $cookieStore.get('rhapsody') === "undefined"){
			//Creation cookie
			GetToken.query({iduser:Auth.getUser().id}, function(mess){
				$cookieStore.put('rhapsody', mess);

				 Rhapsody.member.set({
				        accessToken:$cookieStore.get("rhapsody").access_token,
				        refreshToken:$cookieStore.get("rhapsody").refresh_token
				      });
			});


        	
      	}
      	else{
      		
      		//$cookieStore.remove("rhapsody");

      		//console.log($cookieStore.get('rhapsody').refresh_token);
 			//Rafraîchissement cookie
      		var cookie = RefreshToken.update({iduser:Auth.getUser().id, refreshToken:$cookieStore.get("rhapsody").refresh_token}, function(mess){
      			//console.log(mess);
      			$cookieStore.put("rhapsody",mess);
      			Rhapsody.member.set({
				    accessToken:$cookieStore.get("rhapsody").access_token,
				    refreshToken:$cookieStore.get("rhapsody").refresh_token
				});
      		});
      		
      		//console.log($cookieStore.get("rhapsody"));
      		
      	}
		controller.API = API;
		controller.API.autoPlay = true;
		//console.log($scope.launchRandomTrack(1));
		if (controller.API.currentState == 'play' || controller.isCompleted) controller.API.play();
		controller.isCompleted = false;


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
      /*else if($rootScope.lienRandomItemByGenre){
  			if(($rootScope.lienRandomItemByGenre).indexOf("artiste") > 0 ){
  				//$scope.getRecommandation();
  				//console.log($scope);
  				//$scope.launchRandomTrack($rootScope.idRadio);
  			}
  			else if(($rootScope.lienRandomItemByGenre).indexOf("genre") > 0 ){
  				//console.log("reco");
  				//$scope.getRecommandation();
  				//$rootScope.getRecommandation();
  				//console.log($scope);
  				//$scope.launchRandomTrack($rootScope.idRadio);
  			}
      }*/
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
      	//$rootScope.createEcoute({"idItem" : $rootScope.playlist[controller.currentVideo].id, "typeEcoute" : 0});


	};

	Rhapsody.player.on("playtimer", function(e){
		$scope.$apply(function(){
		$rootScope.currentTime=$rootScope.convertTime(e.data.currentTime);
		if($rootScope.currentTime.split(":")[1] == 5 && created == false){
			$rootScope.createEcoute({"idItem" : $rootScope.playlist[0].id, "typeEcoute" : $rootScope.typeEcoute}, function(){
				
			});
			$rootScope.$broadcast('creationEcoute');
			console.log("broadcast");
			created=true;
		}
		$rootScope.totalTime=$rootScope.convertTime(e.data.totalTime);
		$rootScope.percent=(e.data.currentTime*100)/e.data.totalTime;
		$("vg-scrubbarcurrenttime").css("width", $rootScope.percent+"%");

		//Tweak pour déclencher l'event onCompleteVideo
		if($rootScope.currentTime.split(':')[1]==29 && ended ==false){
			$scope.controller.onCompleteVideo();
			ended=true;
		}

		});

		//console.log($rootScope.totalTime);

	})


	Rhapsody.player.on('playevent', function(e) {
		console.log("rhapsod");
  		if(e.code == "PlayComplete"){
  			//controller.isCompleted = true;
  			this.onCompleteVideo();
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
  				controller.currentVideo++;
  			}
  			else if(($rootScope.lienRandomItemByGenre).indexOf("genre") > 0 ){
  				$scope.launchRandomTrack($rootScope.idRadio);
  				controller.currentVideo++;
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
  		}
	});


	this.setVideo = function(index) {
		if(controller.API.currentState == "play" && controller.currentVideo == index){
			controller.API.pause();
		}
		else {
			controller.currentVideo = index;
			controller.config.sources = $rootScope.playlist[index].sources;
			controller.API.play();
      		//$rootScope.createEcoute({"idItem" : $rootScope.playlist[controller.currentVideo].id, "typeEcoute" : 0});

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




 
   $scope.start=function(){
   	$scope.stop();

   	promise=$interval(function(){minuteur(stop);},1000);
   }

   $scope.stop=function(){
   	$interval.cancel(promise);
   }

   	function minuteur(stop){
		var time = $scope.API.currentTime;
		var seconds = time.getSeconds();
		if(seconds==10 && created == false){
			$rootScope.createEcoute({"idItem" : $rootScope.playlist[0].id, "typeEcoute" : $rootScope.typeEcoute});
			created=true;
			
		}

	}

$scope.$watchGroup(['controller.videos', 'controller.currentVideo', 'controller.videos[controller.currentVideo]'], function(){
        console.log("blabla");
        $rootScope.playlist[controller.currentVideo].sources = [{src: $sce.trustAsResourceUrl("url"), type:"audio/mp3"}];
    	if($cookieStore.get("rhapsody")){
    		var cookie = RefreshToken.update({iduser:Auth.getUser().id, refreshToken:$cookieStore.get("rhapsody").refresh_token}, function(mess){
      			if(mess.code){
      				var cookieCreate=GetToken.query({iduser:Auth.getUser().id}, function(mess2){
      					$cookieStore.put("rhapsody",mess2);
      				});
      			}
      			else{
					$cookieStore.put("rhapsody",mess);
      			}
      			Rhapsody.member.set({
				    accessToken:$cookieStore.get("rhapsody").access_token,
				    refreshToken:$cookieStore.get("rhapsody").refresh_token
				});
				Rhapsody.player.play($rootScope.playlist[controller.currentVideo].url);
				marked=false;
    			created=false;
      		});
    	}
    	else{
    		var cookieCreate=GetToken.query({iduser:Auth.getUser().id}, function(mess2){
      					$cookieStore.put("rhapsody",mess2);
      					Rhapsody.member.set({
						    accessToken:$cookieStore.get("rhapsody").access_token,
						    refreshToken:$cookieStore.get("rhapsody").refresh_token
						});
						Rhapsody.player.play($rootScope.playlist[controller.currentVideo].url);
						marked=false;
		    			created=false;
      				});

    	}
    	
    	
    	//$scope.start();
		
    	
    	
        
	});


	$scope.$on('someEvent', function(event, mass){ 
		controller.videos=$rootScope.playlist;
        controller.currentVideo=0;
        controller.API.play();


			
		});

	

	

}]);
