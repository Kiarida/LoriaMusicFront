app.directive('playlistPlayer', function(Auth, routeRessource, $resource) {
  return {
    restrict: 'A',
    templateUrl: "app/components/player/playlistTemplate.html?t=000",
    scope : {
    	content:"=",
    	controller:"=",
    	withPlayer:"="
    },
    link: function(scope, sce, rootScope){
    	scope.playlistUser = "";
    	scope.newPlaylistUser = "";
		scope.rate = 2;

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

	    var AddItemPlaylist = $resource(routeRessource.AddItemPlaylist,{},
	    {
	      delete: {
	        method: 'DELETE',
	        isArray: false,
	        headers: { 
	          "Authorization" : 'WSSE profile="UsernameToken"',
	          "X-wsse" : Auth.getUser().wsse
	        },
	        params : {iduser:"@iduser", idplaylist:"@idplaylist", iditem:"@iditem"}
	      },
	      save: {
	        method: 'POST',
	        isArray: false,
	        headers: { 
	          "Authorization" : 'WSSE profile="UsernameToken"',
	          "X-wsse" : Auth.getUser().wsse
	        },
	        params : {iduser:"@iduser", idplaylist:"@idplaylist"}
	      }
	    });


		for(var i=0;i<scope.content.length;i++){
			var usernote = RateItem.query({iduser: Auth.getUser().id, iditem : scope.content[i].id},
				function(res){
					for(var i=0;i<scope.content.length;i++){
						if(scope.content[i].id == res.idItem)
							scope.content[i].userRate = res[0].note;
							
					}
				},
				function(error){
					console.log("error");
				}
			)
		}


		scope.ratingStates = [
			{stateOn: 'icon-star3', stateOff: 'icon-star'}
		];

		scope.hoveringOver = function(value) {
			scope.overStar = value;
			scope.percent = 100 * (value / scope.max);
		};

    	scope.isCollapsed = true;
    	scope.hideTags = true;
		scope.hover = false;
		scope.successAdd = function(){
			$(".addtoplaylist .alert").addClass("hide");
		};


		scope.addTrackToPlaylist = function(track,idPlaylist){
			AddItemPlaylist.save({iduser:Auth.getUser().id, idplaylist:idPlaylist},{iditem:track.id},
				function(){ $(".addtoplaylist .alert-success.hide").removeClass("hide"); },
				function(){ $(".addtoplaylist .alert-info.hide").removeClass("hide"); });
		}

		scope.removeItem = function(idPlaylist,idItem,index){
			console.log(scope.$root);
			AddItemPlaylist.delete({iduser:Auth.getUser().id, idplaylist:idPlaylist, iditem:idItem},
				function(){ 
					scope.$root.playlist.splice(index,1);
					if(scope.$root.playlist.length == 0)
						scope.$root.playing = false;

				 },
				function(){});
		}

		scope.agree = function(){
			console.log("plussoyer");
		}
		scope.disagree = function(){
			console.log("moinssoyer");
		}

		scope.editRate = function(video){
			RateItem.update({iduser: Auth.getUser().id, iditem : video.id},{note: video.userRate ? video.userRate : video.note});
			video.userRate = video.userRate ? video.userRate : video.note;
		}


    },
    
  }
}) 