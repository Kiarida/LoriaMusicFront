app.controller('menuController',['$scope','$rootScope',function ($scope, $rootScope) {
  

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

  $scope.titleNewPlaylist = "";

  $scope.newPlaylist = false;     //when user click on add 

  $scope.changeNewPlaylist = function(){
    $scope.newPlaylist = !$scope.newPlaylist;
  }

  
   $scope.getPlaylists = function(){ 
    return playlists;
  }

  $scope.addPlaylist = function(playlistName){

    var count = playlists.length+1;
    var playlist = {id : count, name : playlistName }
    playlists.push(playlist);

    /*
      to do with backend
    */

  }

  $scope.deletePlaylist = function(id){

    //TO DO
  }

  

console.log($scope.titleNewPlaylist);


}]);