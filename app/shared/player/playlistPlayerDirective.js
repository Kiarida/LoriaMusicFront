app.directive('playlistPlayer', function(Auth, routeRessource, $resource, $log) {
  return {
    restrict: 'A',
    templateUrl: function(tElement, tAttrs){
    	if (tAttrs.type) {
            if (tAttrs.type === 'playlist') {
               return "app/components/player/playlistTemplate.html?t=000";
            }
            if (tAttrs.type === 'artist') {
               return "app/components/artist/artistTemplate.html";
            }
        }
        else{
        	return "app/components/player/playlistTemplate.html?t=000";
        }
    },
    scope : {
    	content:"=",
    	controller:"=",
    	withPlayer:"=",
    	playlist:"="
    },
    link: function(scope, sce, rootScope, log){
    	scope.$log = $log;
    	scope.playlistUser = "";
    	scope.titleNewPlaylist = "";
		scope.rate = 2;
		var sources;

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

	    var TagsItem = $resource(routeRessource.TagsItem,{},
	    {
	      query: {
	        method: 'GET',
	        isArray: true,
	        headers: {
	          "Authorization" : 'WSSE profile="UsernameToken"',
	          "X-wsse" : Auth.getUser().wsse
	        },
	        params : {id:"@id"}
	      },

	    });

      var NoteTagsItem=$resource(routeRessource.NoteTagsItem,{},
      {
        query:{
          mathod:'GET',
          isArray:true,
          headers:{
            "Authorization" : 'WSSE profile="UsernameToken"',
	          "X-wsse" : Auth.getUser().wsse
	        },
	        params : {iduser:"@iduser",id:"@id"}
        },
        save:{
          method: 'PUT',
	        isArray: false,
	        headers: {
	          "Authorization" : 'WSSE profile="UsernameToken"',
	          "X-wsse" : Auth.getUser().wsse
	        },
	        params : {iduser:"@iduser", id:"@id", idtag:"@idtag"}
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
					//console.log("error");
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

		scope.getItemTags = function(item){
			if(!item.tags){
				var tags = TagsItem.query({id:item.id},
					function(){
						item.tags = tags;
            scope.getNoteTags(item);
					},
					function(){
						console.log("errorTagItem");
					}
				);
			}
		}

    scope.getNoteTags = function(item){
      for(var i=0; i<item.tags.length; i++){
        item.tags[i].noteUser="";
        NoteTagsItem.query({iduser:Auth.getUser().id, id:item.id, idtag:item.tags[i].id}, function(mess){
          if(mess.note){
            item.tags[i].noteUser=mess.note;
          }
        }, function(){
          console.log("error");
        });
      }


    }


		scope.addTrackToPlaylist = function(track,idPlaylist){
			if(idPlaylist=="")
				return;
			AddItemPlaylist.save({iduser:Auth.getUser().id, idplaylist:idPlaylist},{iditem:track.id},
				function(){
					$(".addtoplaylist .alert-success.hide").removeClass("hide");
					if(scope.$root.playlist.id == idPlaylist){
						scope.$root.playlist.push(track);
					}
				 },
				function(){ $(".addtoplaylist .alert-info.hide").removeClass("hide"); });
		}

		scope.removeItem = function(idPlaylist,idItem,index){
			AddItemPlaylist.delete({iduser:Auth.getUser().id, idplaylist:idPlaylist, iditem:idItem},
				function(){
					if(scope.playlist){
						scope.playlist.tracks.splice(index,1);
					}
					else{
						scope.$root.playlist.splice(index,1);
						if(scope.$root.playlist.length == 0)
							scope.$root.playing = false;
						}

				 },
				function(){});
		}

    //Note positivement un tag
		scope.agree = function(iditem, idtag){
      NoteTagsItem.save({iduser:Auth.getUser.id, id: iditem, idtag:idtag, param:"add"});

		}

    //Note négativement un tag
		scope.disagree = function(iditem, idtag){
      NoteTagsItem.save({iduser:Auth.getUser.id,id: iditem, idtag:idtag, param:"sub"});
		}

    //Update la note d'un item
		scope.editRate = function(video){
			RateItem.update({iduser: Auth.getUser().id, iditem : video.id},{note: video.userRate ? video.userRate : video.note});
			video.userRate = video.userRate ? video.userRate : video.note;
		}

    },

  }
})
