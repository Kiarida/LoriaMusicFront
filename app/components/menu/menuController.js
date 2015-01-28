app.controller('menuController',['$scope','$rootScope',"$sce",'routeRessource','Auth','$resource',
  function ($scope, $rootScope,$sce, routeRessource, Auth, $resource) {
  

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

  $rootScope.launchPlaylist = function(idplaylist){

    var PlaylistDetail = $resource(routeRessource.PlaylistDetail,{},
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

    var playlist = PlaylistDetail.query({iduser: Auth.getUser().id, id: idplaylist},
      function(){
        var track = playlist[0].iditem;
        if(track.length==0)
          return;
        $rootScope.playlist = [];
        if(Array.isArray(track)){
          for(var i=0;i<track.length;i++){
            $rootScope.playlist.push(track[i]);
            track[i].sources = [{src: $sce.trustAsResourceUrl(track[i].url), type:"audio/mp3"}];
          }
        }
        else if($.inArray(track, $rootScope.playlist)==-1){
          $rootScope.playlist.push(track);
          track.sources = [{src: $sce.trustAsResourceUrl(track.url), type:"audio/mp3"}];
        }
        $rootScope.playing = true;
        $rootScope.small = false;
        console.log($rootScope.playlist);
        
      },
      function(error){
        console.log("error");
      }
    );
    
  }



}]);