app.controller('playlistController',['$scope','$resource', 'routeRessource','Auth',function ($scope, $resource, routeRessource, Auth){
  



  var PlaylistTags = $resource(routeRessource.PlaylistTags,{},
  {
    save: {
      method: 'POST',
      isArray: false,
      headers: { 
        "Authorization" : 'WSSE profile="UsernameToken"',
        "X-wsse" : Auth.getUser().wsse
      },
      params:{iduser: "@iduser", id:"@id"}
    },
    query: {
      method: 'GET',
      isArray: true,
      headers: { 
        "Authorization" : 'WSSE profile="UsernameToken"',
        "X-wsse" : Auth.getUser().wsse
      },
      params:{iduser: "@iduser", id:"@id"}
    },
    delete: {
      method: 'DELETE',
      isArray: false,
      headers: { 
        "Authorization" : 'WSSE profile="UsernameToken"',
        "X-wsse" : Auth.getUser().wsse
      },
      params:{iduser: "@iduser", id:"@id", idtag:"@idtag"}
    }

  });
  
  $scope.addTagPlaylist= function(playlist){
    for(var i=0;i<playlist.tags.length;i++){
      var tag = { libelle : playlist.tags[i].text }
      var res = PlaylistTags.save({iduser : Auth.getUser().id, id : playlist.id },tag);
    }
  }

  $scope.getPlaylistTag = function(playlist){
    var tags = PlaylistTags.query({iduser : Auth.getUser().id, id : playlist.id },
      function(){
        console.log(tags);
        playlist.tags = tags;
        playlist.tagLoaded = true;
      },
      function(){
        playlist.tagLoaded = true;
      }
    )
  }

  $scope.deleteTagPlaylist=function(playlist,tag){
    PlaylistTags.delete({iduser : Auth.getUser().id, id : playlist.id, idtag : tag.id});
  }  



  // return playlists

 

  $scope.changeEditPlaylistTrue = function(){

      $scope.editPlaylist = true;
  }

  $scope.changeEditPlaylistFalse = function(){

      $scope.editPlaylist = false;
  }

  $scope.changeEditPlaylist = function(playlist){
    $scope.editPlaylist = !$scope.editPlaylist;
    $scope.playlistEdited = playlist;

  }


  $scope.getEditPlaylist = function(){
    return $scope.editPlaylist;
  }

  



  $scope.isCollapsed = true;  // true if the tag div is collapsed
  $scope.editPlaylist = false; // true if user click on the editPlaylist icon
  $scope.ctrl = "playlistController";
  $scope.playlistHover = false;   // true if hover on the playlist

  $scope.playlistEdited = false;



  $scope.styleIconTag = {
    color : 'white'
  };


 //$scope.tagPattern = "\w{3,10}";








}]);