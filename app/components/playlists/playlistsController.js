app.controller('PlaylistsCtrl', ['$scope', '$resource', '$rootScope', 'Auth','routeRessource', '$location', '$cookies',
 function ($scope, $resource, $rootScope, Auth, routeRessource, $location, $cookies, $log){
	$scope.$log = $log;
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
        this.tags="";
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


    var PlaylistTags = $resource(routeRessource.TagsByPlaylist,{},{
    'save': {
      method: 'POST',
      isArray: false,
      headers: { 
        "Authorization" : 'WSSE profile="UsernameToken"',
        "X-wsse" : Auth.getUser().wsse
      },
      params:{iduser: "@iduser", idplaylist:"@idplaylist"}
    },
    'query': {
        method: 'GET',
        isArray: true,
        headers: { 
        "Authorization" : 'WSSE profile="UsernameToken"',
        "X-wsse" : Auth.getUser().wsse
         },
         params:{iduser:"@iduser", idplaylist:"@idplaylist"}
     },
    'delete': {
      method: 'DELETE',
      isArray: false,
      headers: { 
        "Authorization" : 'WSSE profile="UsernameToken"',
        "X-wsse" : Auth.getUser().wsse
      },
      params:{iduser: "@iduser", idplaylist:"@idplaylist", idtag:"@idtag"}
    }

  });

	$scope.getPlaylists = function(){
        Playlists.query({iduser:$scope.user.id}, function(mess){
        	for(var i = 0; i < mess.length; i++){
        		var newplay = new Playlist(mess[i].id,mess[i].nom, $scope.toTimestamp(mess[i].datecreation));
        		controller.playlists.push(newplay);
        	}
        });
        
	}

    $scope.getTracks=function(indexPlay){
        console.log("index "+indexPlay);
        PlaylistTracks.query({iduser:$scope.user.id, idplaylist:controller.playlists[indexPlay].id}, function(mess){
            //console.log(mess);
            controller.playlists[indexPlay].tracks=mess[0].iditem;
            for(var i=0; i<controller.playlists.length;i++){

                $scope.getTagsByPlaylist(controller.playlists[i].id);
            }
            

        });

    }

    $scope.toTimestamp = function(date) {
      var dateSplitted = date.split('-'); // date must be in DD-MM-YYYY format
      var dateSplitted2 = dateSplitted[2].split("T");
      var formattedDate = dateSplitted2[0]+'/'+dateSplitted[1]+'/'+dateSplitted[0];
      return(formattedDate);
    };


    $scope.getTagsByPlaylist = function(idPlaylist){
        console.log(idPlaylist);
        console.log($scope.user.id);
                PlaylistTags.query({iduser: $scope.user.id, idplaylist:idPlaylist},function(mess){ 
                    for(var i = 0; i < controller.playlists.length; i++){
                        

                            if(controller.playlists[i].id == idPlaylist){
                                controller.playlists[i].tags = mess;
                    
                            }
                        }
                    },
                    function(error){        
                        
                    });
    }


    $scope.addTagPlaylist = function(playlist){
        var tag = { libelle : playlist.tags[playlist.tags.length-1].libelle };
          
        PlaylistTags.save({iduser : $scope.user.id, idplaylist : playlist.id },tag, function(mess){
            playlist.tags[playlist.tags.length-1].id=mess.id;
        });
        
        /*for(var i=0;i<playlist.tags.length;i++){
          var tag = { libelle : playlist.tags[i].libelle };
          
          var res = PlaylistTags.save({iduser : $scope.user.id, idplaylist : playlist.id },tag);
        }*/
    }

    $scope.deleteTagPlaylist=function(playlist,tag){
        PlaylistTags.delete({iduser : $scope.user.id, idplaylist : playlist.id, idtag : tag.id});
    } 


	$scope.getPlaylists();
    
			


}]);