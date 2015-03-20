app.controller('PlaylistsCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$cookies',
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $cookies){
	
    $scope.user = Auth.getUser();
 	var controller = this;
	controller.currentVideo = -1;
	controller.hover = false;

	this.configPlaylist = { 
		addToPlaylist : true,
		remove : true,
		tags : true,
		more : false,
	};

	controller.playlists=[];

	function Playlist(id, nom, dateCreation){
		this.id = id;
		this.nom = nom;
		this.dateCreation = dateCreation;
		this.tracks=[];
	};

	var Playlists = $resource(routeRessource.Playlists,{},
	{
        'query': {
            method: 'GET',
            isArray: true,
            headers: { 
              "Authorization" : 'WSSE profile="UsernameToken"',
              "X-wsse" : Auth.getUser().wsse
            },
            params:{iduser: "@iduser"}
        }
    });

    var PlaylistTracks = $resource(routeRessource.PlaylistTracks, {}, {
    	'query': {
            method: 'GET',
            isArray: true,
            headers: { 
              "Authorization" : 'WSSE profile="UsernameToken"',
              "X-wsse" : Auth.getUser().wsse
            },
            params:{iduser: "@iduser", idplaylist: "@idplaylist"}
        },
    });

	$scope.getPlaylists = function(){
        Playlists.query({iduser:$scope.user.id}, function(mess){
        	for(var i = 0; i < mess.length; i++){
        		var newplay = new Playlist(mess[i].id,mess[i].nom, $scope.toTimestamp(mess[i].datecreation));
        		controller.playlists.push(newplay);
        	}
            console.log(controller.playlists);
        });
        
	}

    $scope.getTracks=function(indexPlay){
        console.log("index "+indexPlay);
        PlaylistTracks.query({iduser:$scope.user.id, idplaylist:controller.playlists[indexPlay].id}, function(mess){
            //console.log(mess);
            controller.playlists[indexPlay].tracks=mess[0].iditem;

        });
        
    }

      $scope.toTimestamp = function(date) {
      var dateSplitted = date.split('-'); // date must be in DD-MM-YYYY format
      var dateSplitted2 = dateSplitted[2].split("T");
      var formattedDate = dateSplitted2[0]+'/'+dateSplitted[1]+'/'+dateSplitted[0];
      return(formattedDate);
    };

	$scope.getPlaylists();
			


}]);