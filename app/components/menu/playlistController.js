app.controller('playlistController',function ($scope, $log) {
  



  // tags to get

   $scope.tags = [
    { text: 'Tag1' }
  ];



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


  $scope.isCollapsed = true;  // true if the tag div is collapsed
  $scope.editPlaylist = false; // true if user click on the editPlaylist icon
  $scope.ctrl = "playlistController";
  $scope.playlistHover = false;   // true if hover on the playlist



  $scope.styleIconTag = {
    color : 'white'
  };









});