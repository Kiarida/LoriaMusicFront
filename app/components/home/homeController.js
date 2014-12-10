app.controller('HomeCtrl', ['$scope', 'PaysFactory', '$resource', function ($scope, PaysFactory, $resource){
	$scope.countries = PaysFactory.getCountries().then(function(countries){
		$scope.countries = countries;
	}, function(msg){
		console.log(msg);
	});

	//var Signup = $resource("urlADefinir/signup");
	$scope.user = {};

	$scope.newUser = function(){
		console.log($scope.user);
		//Signup.save(null,$scope);
	}


}]);