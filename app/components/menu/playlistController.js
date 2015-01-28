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
    }
  });
  
  $scope.addTagPlaylist= function(playlist){
    for(var i=0;i<playlist.tags.length;i++){
      var tag = { libelle : playlist.tags[i].text }
      var res = PlaylistTags.save({iduser : Auth.getUser().id, id : playlist.id },tag);
    }
  }

  $scope.getPlaylistTag = function(playlist.id){
    
  }  



  // return playlists

 

  $scope.changeEditPlaylistTrue = function(){

      $scope.editPlaylist = true;
  }

  $scope.changeEditPlaylistFalse = function(){

      $scope.editPlaylist = false;
  }

  $scope.changeEditPlaylist = function(){
    $scope.editPlaylist = !$scope.editPlaylist;
  }


  $scope.getEditPlaylist = function(){
    return $scope.editPlaylist;
  }

  $scope.editPlaylistName = function(playlistName){

    $scope.playlist.name = playlistName;

    /*
      To do with backend
    */

  }



  $scope.isCollapsed = true;  // true if the tag div is collapsed
  $scope.editPlaylist = false; // true if user click on the editPlaylist icon
  $scope.ctrl = "playlistController";
  $scope.playlistHover = false;   // true if hover on the playlist

  $scope.playlistNameEdit = $scope.playlist.name;



  $scope.styleIconTag = {
    color : 'white'
  };


 //$scope.tagPattern = "\w{3,10}";








}]);