app.directive('controlPlayer', function() {
  return {
    restrict: 'E',
    templateUrl: "app/components/player/playerTemplate.html?t=000",
    link: function(scope, sce){

		scope.nextTrack = function(){
			if(scope.controller.random){
				var random = scope.controller.currentVideo;
				while(random == scope.controller.currentVideo){
					random = Math.floor(Math.random()*(scope.controller.videos.length));
				}
				scope.controller.currentVideo = random;
			}
			else{
				if(scope.controller.currentVideo == scope.controller.videos.length-1)
					scope.controller.currentVideo = 0
				else
					scope.controller.currentVideo++;
			}
			scope.controller.config.sources = scope.controller.videos[scope.controller.currentVideo].sources;
			scope.controller.like = false;

			scope.controller.API.play();

		};

		scope.previousTrack = function(){
			scope.controller.API.stop();
			if(scope.controller.random){
				var random = scope.controller.currentVideo;
				while(random == scope.controller.currentVideo){
					random = Math.floor(Math.random()*(scope.controller.videos.length));
				}
				scope.controller.currentVideo = random;
			}
			else{
				if(scope.controller.currentVideo == 0)
					scope.controller.currentVideo = scope.controller.videos.length-1;
				else
					scope.controller.currentVideo--;
			}
			scope.controller.config.sources = scope.controller.videos[scope.controller.currentVideo].sources;
			scope.controller.like = false;
			scope.controller.API.play();

		}; 

		scope.loop = function(){
			if(scope.controller.loop)
				scope.controller.loop = false;
			else
				scope.controller.loop = true;
		};

		scope.random = function(){
			if(scope.controller.random)
				scope.controller.random = false;
			else
				scope.controller.random = true;
		};

		scope.block = function(){
			if(scope.controller.random){
				var random = scope.controller.currentVideo;
				while(random == scope.controller.currentVideo){
					random = Math.floor(Math.random()*(scope.controller.videos.length));
				}
				scope.controller.currentVideo = random;
			}
			else{
				if(scope.controller.currentVideo == scope.controller.videos.length-1)
					scope.controller.currentVideo = 0
				else
					scope.controller.currentVideo++;
			}
			scope.controller.config.sources = scope.controller.videos[scope.controller.currentVideo].sources;
			scope.controller.API.play();

			//TODO CALL API TO RECORD THE BLOCK

		};

		scope.like = function(){
			if(scope.controller.like)
				scope.controller.like = false;
			else
				scope.controller.like = true;
			//TODO CALL API TO RECORD THE LIKE

		};		

    },
    
  }
}) 