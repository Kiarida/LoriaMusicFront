app.controller('HomeCtrl', ['$scope', 'PaysFactory', '$resource', '$rootScope', function ($scope, PaysFactory, $resource, $rootScope){
	$rootScope.connected = false;
	$scope.countries = PaysFactory.getCountries().then(function(countries){
		$scope.countries = countries;
	}, function(msg){
		console.log(msg);
	});

	//var Signup = $resource("urlADefinir/signup");
	var CreateToken = $resource("http://loriamusic.loc:8888/api/app.php/security/token/create.json");
	$scope.user = {};
	$scope.confpwd ="";

	$scope.newUser = function(){
		console.log($scope.user);
		//Signup.save(null,$scope.user);
	}

	$scope.connectUser = function(){
		var post = CreateToken.save(null, $scope.user, function(){
			//$rootScope.connected = true;
		});
		console.log(post);
		//scope.$apply(function() { $location.path("/route"); });
	}


}]);