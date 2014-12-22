app.controller('HomeCtrl', ['$scope', 'PaysFactory', '$resource', '$rootScope', '$location', 'Auth', '$cookies', 'routeRessource',
 function ($scope, PaysFactory, $resource, $rootScope, $location, Auth, $cookies, routeRessource){

 	

	$rootScope.connected = false;
	//use for the select containing the countries
	$scope.countries = PaysFactory.getCountries().then(function(countries){
		$scope.countries = countries;
	}, function(msg){
		console.log(msg);
	});

	$scope.user = {};
	$scope.userConn = {};
	$scope.confpwd ="";
	$scope.errorSignIn =false;
	$scope.errorSignUp =false;


	$scope.newUser = function(){
		var Signup = $resource(routeRessource.CreateUser);
		Signup.save(null,$scope.user, function(){
			$scope.userConn._username = $scope.user.username;
			$scope.userConn._password = $scope.user.plainPassword;
			$scope.connectUser();
		},
		function(error){
			$scope.errorSignUp = "";
			if(typeof error.data.message != "undefined")
				$scope.errorSignUp = error.data.message+"   ";
			if(typeof error.data.email != "undefined")
				$scope.errorSignUp += error.data.email[0]+"   ";
			if(typeof error.data.username != "undefined")
				$scope.errorSignUp += error.data.username[0]+"   ";
		});
	}

	//Connect user : create token
	$scope.connectUser = function(){
		var CreateToken = $resource(routeRessource.CreateToken);
		var post = CreateToken.save(null, $scope.userConn, function(){
			$rootScope.connected = true;
			var user = {};
			user.wsse = post.WSSE;
			Auth.setUser(user);
			$location.path("/home");
		},
		function(error){
			$scope.errorSignIn = error.data.message;

		});
	}


}]);