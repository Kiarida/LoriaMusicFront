app.directive('playlistPlayer', function() {
  return {
    restrict: 'A',
    templateUrl: "app/components/player/playlistTemplate.html?t=000",
    scope : {
    	content:"=",
    	controller:"=",
    	withPlayer:"="
    },
    link: function(scope, sce, rootScope){
    	scope.playlistUser = "";
    	scope.newPlaylistUser = "";

		scope.rate = 2;

		scope.ratingStates = [
			{stateOn: 'icon-star3', stateOff: 'icon-star'}
		];

		scope.hoveringOver = function(value) {
			scope.overStar = value;
			scope.percent = 100 * (value / scope.max);
		};

    	scope.isCollapsed = true;
    	scope.hideTags = true;
		scope.hover = false;
		scope.test = function(){
			console.log("ukiiuy");
		}
		scope.addTrackToPlaylist = function(track,indexPlaylist){
			scope.$root.userPlaylist[indexPlaylist].playlist.push(track);
			console.log("ok");
		}
		scope.agree = function(){
			console.log("plussoyer");
		}
		scope.disagree = function(){
			console.log("moinssoyer");
		}


    },
    
  }
}) 