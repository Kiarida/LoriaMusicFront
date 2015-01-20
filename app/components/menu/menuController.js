app.controller('menuController',['$scope','$rootScope',"$sce",function ($scope, $rootScope,$sce) {
  

// Playlists to get

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



}]);