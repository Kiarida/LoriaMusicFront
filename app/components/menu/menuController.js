app.controller('menuController',function ($scope, $log) {
  

// Playlists to get

var playlists = [

    {
      id : 1,
      name : "Playlist 1"
    },

    {
      id : 2,
      name : "Playlist 2"
    },
    {
      id : 3,
      name : "Playlist 3"
    }

  ];

  $scope.newPlaylist = false;     //when user click on add 

  $scope.changeNewPlaylist = function(){
    $scope.newPlaylist = !$scope.newPlaylist;
  }

  
   $scope.getPlaylists = function(){ 
    return playlists;
  }








});