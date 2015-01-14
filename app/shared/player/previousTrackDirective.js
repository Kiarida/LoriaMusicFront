app.directive("previousTrack",
	function() {
		return {
			restrict: "E",
			require: "^videogular",
			template : '<button class="iconButton" type="button" aria-label="previous track" ng-click="previousTrack()"><i class="icon-backward"></i></button>'
		}
	}
);