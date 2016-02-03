app.controller('ArtistCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$cookies', '$routeParams', "$sce",
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $cookies, $routeParams, $sce){

 	$scope.artist_id=$routeParams.idartiste;
 	var controller = this;
	
	controller.hover = false;
	controller.isCollapsed = true;
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
    });

    var RateItem = $resource(routeRessource.RateItem,{},
	    {
	      query: {
	        method: 'GET',
	        isArray: false,
	        headers: {
	          "Authorization" : 'WSSE profile="UsernameToken"',
	          "X-wsse" : Auth.getUser().wsse
	        },
	        params : {iduser:"@iduser", iditem:"@iditem"}
	      },
	      update: {
	        method: 'PUT',
	        isArray: true,
	        headers: {
	          "Authorization" : 'WSSE profile="UsernameToken"',
	          "X-wsse" : Auth.getUser().wsse
	        },
	        params : {iduser:"@iduser", iditem:"@iditem"}
	      }
	    });



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

  //Récupère les notes des albums
  $scope.getAlbumScore=function(){
    for(var i=0;i<controller.artist.albums.length;i++){

      var usernote = RateItem.query({iduser: Auth.getUser().id, iditem : controller.artist.albums[i].id},
        function(res){
          for(var i=0;i<controller.artist.albums.length;i++){
          	
            if(controller.artist.albums[i].id == res.idItem && res[0])
            	controller.artist.albums[i].userRate = res[0].note;
          }
        },
        function(error){
          console.log("error");
        }
      )
    }
  }

  //Récupère le nom et la cover de l'artiste courant
	$scope.getArtist=function(){
		Artist.query({idartiste:$scope.artist_id}, function(mess){
			controller.artist.nom=mess[0].nom;
			if(mess[0].urlCover){
				controller.artist.cover=mess[0].urlCover;
			}
			else{
				controller.artist.cover="assets/img/placeholder.png";
			}
		});
	}

	$scope.getAlbums= function(){

		Albums.query({idartiste:$scope.artist_id}, function(mess){
			controller.artist.albums=mess;
			if(!controller.artist.albums.urlCover){
				controller.artist.albums.urlCover="assets/img/placeholder.png";
			}
      $scope.getAlbumScore();
		},
		function(error){
			$scope.error= "No album found (yet)"
		});
	}

	$scope.editScoreArtist = function(artist){
			Score.update({iduser: Auth.getUser().id, idartiste : $scope.artist_id},{note: $scope.overStar});
			controller.artist.userScore = controller.artist.userScore ? controller.artist.userScore : controller.artist.note;
		}

    $scope.editScoreAlbum = function(album){
      RateItem.update({iduser: Auth.getUser().id, iditem : album.id},{note: album.userRate ? album.userRate : album.note});
      album.userRate = album.userRate ? album.userRate : album.note;
    }


    $scope.launchAlbum=function(album){
    $location.path('/home');
      var track = album["tracks"];
      $rootScope.playlist = [];
      $rootScope.launchPlay(track, "album");

    /*  for(var i=0;i<track.length;i++){
        $rootScope.playlist.push(track[i]);
        track[i].sources = [{src: $sce.trustAsResourceUrl(track[i].url), type:"audio/mp3"}];
      }
      

      $rootScope.playing = true;
      $rootScope.small = false;
      $rootScope.createEcoute({"idItem" : $rootScope.playlist[0].id, "typeEcoute" : $rootScope.typeEcoute});
      */
    }

	$scope.getArtist();
	$scope.getAlbums();
	$scope.getScore();


}]);
