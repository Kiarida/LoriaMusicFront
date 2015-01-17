app.directive('playlistPlayer', function() {
  return {
    restrict: 'A',
    templateUrl: "app/components/player/playlistTemplate.html?t=000",
    scope : {
    	content:"=",
    	controller:"="
    },
    link: function(scope, sce){
    	scope.playlistUser = ["rap","rock", "pop"];
		scope.rate = 2;

		scope.ratingStates = [
			{stateOn: 'icon-star3', stateOff: 'icon-star'}
		];

		scope.hoveringOver = function(value) {
			scope.overStar = value;
			scope.percent = 100 * (value / scope.max);
		};

		scope.setVideo = function(index) {
			if(scope.controller.API.currentState == "play" && scope.controller.currentVideo == index){
				scope.controller.API.pause();
			}
			else {
				scope.controller.currentVideo = index;
				scope.controller.config.sources = scope.content[index].sources;
				scope.controller.API.play();
			}
			
		};

    	scope.isCollapsed = true;
		scope.hover = false;
		scope.addTrackToPlaylist = function(id){

		}

    },
    
  }
}) 