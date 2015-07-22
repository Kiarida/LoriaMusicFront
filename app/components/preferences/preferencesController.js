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
	$scope.success ="";


	var Pref = $resource(routeRessource.PrefUser,{},
	{
        'query': {
            method: 'GET',
            isArray: true,
            headers: { 
              "Authorization" : 'WSSE profile="UsernameToken"',
              "X-wsse" : Auth.getUser().wsse
            }
        },
        'update': {
        	method:'PUT',
        	isArray : true,
        	headers: { 
              "Authorization" : 'WSSE profile="UsernameToken"',
              "X-wsse" : Auth.getUser().wsse
            },
            params:{id: "@id"}
        },
    });

      var Items = $resource(routeRessource.ItemsByAction, {}, {
    	'query': {
            method: 'GET',
            isArray: true,
            headers: {
              "Authorization" : 'WSSE profile="UsernameToken"',
              "X-wsse" : Auth.getUser().wsse
            },
            params:{iduser: "@iduser", idaction: "@idaction"}
        },
    });

	$scope.send = function(){
        Pref.update({id:$scope.user.id},$scope.user, function(){
			Auth.setUser($scope.user);
			Auth.getUser().checked = false;
			$scope.success = "Your modification has been applied"
		},
		function(error){
			$scope.error = "Wrong password";
		});
	}

	$scope.blockedItems = Items.query({iduser:Auth.getUser().id, idaction:1}, function(messTracks){
		console.log(messTracks);
		return messTracks;
	});

	$scope.unblock = function(index){
		$scope.blockedItems.splice(index);
		console.log("hii");
	}
 

}]);