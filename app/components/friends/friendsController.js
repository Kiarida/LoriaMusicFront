app.controller('FriendsCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$cookies',
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $cookies){
	

 	var controller = this;
	$scope.user = Auth.getUser();
	$scope.search ="";
	$scope.error = "";
	$scope.success ="";
	controller.friends=[];
	
	function Friend(id, username){
		this.id = id;
		this.username = username;
		this.liked = [];
	};
	

	var Friends = $resource(routeRessource.Friends,{},
	{
        'query': {
            method: 'GET',
            isArray: true,
            headers: { 
              "Authorization" : 'WSSE profile="UsernameToken"',
              "X-wsse" : Auth.getUser().wsse
            },
            params:{iduser: "@id"}
        },
        'save': {
        	method:'POST',
        	isArray : true,
        	headers: { 
              "Authorization" : 'WSSE profile="UsernameToken"',
              "X-wsse" : Auth.getUser().wsse
            },
            params:{iduser: "@iduser"}
        },
        'delete': {
        	method:'DELETE',
        	isArray : true,
        	headers: { 
              "Authorization" : 'WSSE profile="UsernameToken"',
              "X-wsse" : Auth.getUser().wsse
            },
            params:{iduser: "@iduser", idfriend:"@idfriend"}
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
		$scope.error = "";
		$scope.success ="";
        Friends.save({iduser:$scope.user.id, userFriend:$scope.user.search}, function(){
			
			$scope.success = "You are now friends with "+$scope.user.search;
			controller.friends=[];
			$scope.getFriends();

		},
		function(error){
			$scope.error = "User not found";
		});

	}

	$scope.remove=function(idfriend){
		Friends.delete({iduser:$scope.user.id, idfriend:idfriend}, function(){
			$scope.success = "Friend deleted";
			controller.friends=[];
			$scope.getFriends();

		});
		
	}

	$scope.getFriends=function(){
		Friends.query({iduser:$scope.user.id}, function(mess){

			for(var i = 0; i< mess.length; i++){
				var newfriend = new Friend(mess[i].id, mess[i].username);
				
				controller.friends.push(newfriend);
			
				var id = mess[i].id;
				Items.query({iduser:id, idaction:2}, function(messTracks){
					console.log(messTracks);
					for(var j = 0; j < controller.friends.length; j++){
						if(controller.friends[j].id == messTracks[0].idUtilisateur){

							controller.friends[j].liked = messTracks;

						}
					}
					
				});
			}
		});
		
	}


	
	$scope.getFriends();
	
	
		


}]);