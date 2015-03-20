app.controller('ArtistCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$cookies', '$routeParams',
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $cookies, $routeParams){
	
 	$scope.artist_id=$routeParams.idartiste;
 	var controller = this;
	controller.currentVideo = -1;
	controller.hover = false;
	
	$scope.user = Auth.getUser();
	$scope.error = "";

	controller.artist={
		id : "",
		nom : "",
		score :"",
		albums : [],
		userScore:"",
		cover:"",
	};
	this.configPlaylist = {
		addToPlaylist : true,
		remove : false,
		tags : true,
		more : false,
	};

	controller.artist.id=$scope.artist_id;
	

	var Albums = $resource(routeRessource.Albums,{},
	{
        'query': {
            method: 'GET',
            isArray: true,
            headers: { 
              "Authorization" : 'WSSE profile="UsernameToken"',
              "X-wsse" : Auth.getUser().wsse
            },
            params:{idartiste: "@idartiste"}
        },
        
    });

    var Score=$resource(routeRessource.ArtistScore,{},
    {
    	'query': {
            method: 'GET',
            isArray: false,
            headers: { 
              "Authorization" : 'WSSE profile="UsernameToken"',
              "X-wsse" : Auth.getUser().wsse
            },
            params:{iduser:"@iduser", idartiste: "@idartiste"}
        },
        update: {
	        method: 'PUT',
	        isArray: true,
	        headers: { 
	          "Authorization" : 'WSSE profile="UsernameToken"',
	          "X-wsse" : Auth.getUser().wsse
	        },
	        params : {iduser:"@iduser", idartiste:"@idartiste"}
	      }
    });

    var Artist=$resource(routeRessource.Artist,{}, {
    	'query': {
            method: 'GET',
            isArray: true,
            headers: { 
              "Authorization" : 'WSSE profile="UsernameToken"',
              "X-wsse" : Auth.getUser().wsse
            },
            params:{iduser:"@iduser", idartiste: "@idartiste"}
        },
    })



		$scope.ratingStates = [
			{stateOn: 'icon-star3', stateOff: 'icon-star'}
		];

		$scope.hoveringOver = function(value) {
			$scope.overStar = value;
			$scope.percent = 100 * (value / $scope.max);
		};


	$scope.getScore=function(){
		controller.artist.userScore=null;
		Score.query({iduser:Auth.getUser().id, idartiste:$scope.artist_id}, function(mess){
			if(mess[0]){
				controller.artist.userScore = mess[0].note;
				controller.artist.score=mess.noteMoyenne[0].note;
			}
			else{	
				controller.artist.score=mess.noteMoyenne[0].note;
			}
			
		},function(error){
		controller.artist.score = 5;
	});
	}

	$scope.getArtist=function(){
		Artist.query({idartiste:$scope.artist_id}, function(mess){
			console.log(mess);
			controller.artist.nom=mess[0].nom;
			controller.artist.cover=mess[0].urlCover;
		});
	}

	$scope.getAlbums= function(){
		
		Albums.query({idartiste:$scope.artist_id}, function(mess){
			controller.artist.albums=mess;
		},
		function(error){
			$scope.error= "No album found (yet)"
		});
	}

	$scope.editScoreArtist = function(artist){
			Score.update({iduser: Auth.getUser().id, idartiste : $scope.artist_id},{note: $scope.overStar});
			controller.artist.userScore = controller.artist.userScore ? controller.artist.userScore : controller.artist.note;
		}

	$scope.getArtist();
	$scope.getAlbums();
	$scope.getScore();
	
	


	
}]);