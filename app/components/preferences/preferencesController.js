app.controller('PreferencesCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$cookies', 'PaysFactory',
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $cookies, PaysFactory){
	
	$scope.countries = PaysFactory.getCountries().then(function(countries){
		$scope.countries = countries;
	}, function(msg){
		console.log(msg);
	});

	$scope.user = Auth.getUser();
	$scope.confpwd ="";
	$scope.error = "";


	$scope.send = function(){
	
		// var Pref = $resource(routeRessource.PrefUser,{},
		// {
	 //        'query': {
	 //            method: 'GET',
	 //            isArray: true,
	 //            headers: { 
	 //              "Authorization" : 'WSSE profile="UsernameToken"',
	 //              "X-wsse" : Auth.getUser().wsse
	 //            }
	 //        },
	 //        'update': {
	 //        	methode:'PUT',
	 //        	headers: { 
	 //              "Authorization" : 'WSSE profile="UsernameToken"',
	 //              "X-wsse" : Auth.getUser().wsse
	 //            },
	 //            params:{id: "@id"}
	 //        },
	 //        'save': {
	 //        	methode:'POST',
	 //        	headers: { 
	 //              "Authorization" : 'WSSE profile="UsernameToken"',
	 //              "X-wsse" : Auth.getUser().wsse
	 //            }
	 //        },
	 //        'delete': {
	 //        	methode:'DELETE',
	 //        	headers: { 
	 //              "Authorization" : 'WSSE profile="UsernameToken"',
	 //              "X-wsse" : Auth.getUser().wsse
	 //            },
	 //        },
  //       });

  //       Pref.update({id:$scope.user.id},$scope.user, function(){
		// 	Auth.setUser($scope.user);
		// 	Auth.getUser().checked = false;
		// },
		// function(error){
		// 	$scope.error = error.data.message;
		// });


		
	}

}]);