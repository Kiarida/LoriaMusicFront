app.controller('playlistController',function ($scope, $log) {
  



  var PlaylistTags = $resource(routeRessource.PlaylistTags,{},
    {
      query: {
        method: 'GET',
        isArray: true,
        headers: { 
          "Authorization" : 'WSSE profile="UsernameToken"',
          "X-wsse" : Auth.getUser().wsse
        },
        params:{iduser: "@iduser", id:"@id"}
      }
    });



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








});