app.controller('SandboxCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$cookies',
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $cookies){
	$scope.lien ="";
	$scope.param="";
	$scope.result="";
	$scope.methode=0;
	$scope.send = function(){

		var Res = $resource($scope.lien,{},
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
	        	methode:'PUT',
	        	headers: { 
	              "Authorization" : 'WSSE profile="UsernameToken"',
	              "X-wsse" : Auth.getUser().wsse
	            },
	        },
	        'save': {
	        	methode:'POST',
	        	headers: { 
	              "Authorization" : 'WSSE profile="UsernameToken"',
	              "X-wsse" : Auth.getUser().wsse
	            }
	        },
	        'delete': {
	        	methode:'DELETE',
	        	headers: { 
	              "Authorization" : 'WSSE profile="UsernameToken"',
	              "X-wsse" : Auth.getUser().wsse
	            },
	        },
        });
		switch($scope.methode){
			case 0:
				Res.query(null,function(mess){ $scope.result = mess; },function(error){ $scope.result = error.data; });
				break;
			case 1:
				Res.query(null,function(mess){ $scope.result = mess; },function(error){ $scope.result = error.data; });
				break;
			case 2:
				break;
			case 3:
				break;
		}
	}

}]);