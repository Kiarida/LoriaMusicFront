app.directive("nextTrack",
	function() {
		return {
			restrict: "E",
			require: "^videogular",
			template : '<button class="iconButton" type="button" aria-label="next track" ng-click="nextTrack()"><i class="icon-forward2"></i></button>'
		}
	}
);