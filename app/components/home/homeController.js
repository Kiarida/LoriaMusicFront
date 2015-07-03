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
			user.email = post.email;
			user.country = post.country;
			user.username= post.username;
			user.id = post.id;
			Auth.setUser(user);
			if(post.role[0]== "ROLE_SUPER_ADMIN"){
				user.role="admin_user";
				$rootScope.isAdmin=true;
				//$window.location.href="app/components/admin/adminView.html";
				$location.path("/admin");
			}
			else{
				user.role="simple_user"
				$rootScope.isAdmin=false;
				$location.path("/home");
				 var CurrentTest = $resource(routeRessource.CurrentTest, {},
					  {
					    'query': {
					            method: 'GET',
					            isArray: true,
					            headers: {
					              "Authorization" : 'WSSE profile="UsernameToken"',
					              "X-wsse" : Auth.getUser().wsse
					            },
					            params:{iduser:"@iduser"},
					        },
					  });
				CurrentTest.query({iduser:Auth.getUser().id}, function(mess){
					$rootScope.currentUserTest=mess;
					console.log("on récupère le test courant");
					console.log($rootScope);
				});

			}

		},
		function(error){
			$scope.errorSignIn = error.data.message;

		});
	}


}]);
