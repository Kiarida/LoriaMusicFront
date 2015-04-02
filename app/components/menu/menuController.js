app.controller('menuController',['$scope','$rootScope',"$sce",'routeRessource','Auth','$resource',
  function ($scope, $rootScope,$sce, routeRessource, Auth, $resource) {

  var PlaylistUser = $resource(routeRessource.PlaylistUser,{},
  {
    get: {
      method: 'GET',
      isArray: true,
      headers: {
        "Authorization" : 'WSSE profile="UsernameToken"',
        "X-wsse" : Auth.getUser().wsse
      },
      params:{iduser: "@iduser", idplaylist : "@idplaylist"}
    },
    query: {
      method: 'GET',
      isArray: true,
      headers: {
        "Authorization" : 'WSSE profile="UsernameToken"',
        "X-wsse" : Auth.getUser().wsse
      },
      params:{iduser: "@iduser"}
    },
    delete: {
      method: 'DELETE',
      isArray: true,
      headers: {
        "Authorization" : 'WSSE profile="UsernameToken"',
        "X-wsse" : Auth.getUser().wsse
      },
      params:{iduser: "@iduser", idplaylist:"@idplaylist"}
    },
    save: {
      method: 'POST',
      headers: {
        "Authorization" : 'WSSE profile="UsernameToken"',
        "X-wsse" : Auth.getUser().wsse
      },
      params:{iduser: "@iduser"}
    },
    update: {
      method: 'PUT',
      isArray: false,
      headers: {
        "Authorization" : 'WSSE profile="UsernameToken"',
        "X-wsse" : Auth.getUser().wsse
      },
      params:{iduser: "@iduser",idplaylist:"@idplaylist"}
    },
  });

  // Playlists to get

  $scope.titleNewPlaylist = "";

  $scope.newPlaylist = false;     //when user click on add

  $scope.changeNewPlaylist = function(){
    $scope.newPlaylist = !$scope.newPlaylist;
  }

  $rootScope.addPlaylist = function(playlistName){

    var playlist = {id : 0, nom : playlistName }
    var userPlaylist = PlaylistUser.save({iduser: Auth.getUser().id},{nomPlaylist : playlistName},
      function(){
        $rootScope.userPlaylist.push({id : userPlaylist.id, nom : playlistName});
      },
      function(error){

      });

  }

  $scope.deletePlaylist = function(playlist){
    var userPlaylist = PlaylistUser.delete({iduser: Auth.getUser().id, idplaylist: playlist.id});
    $rootScope.userPlaylist.splice($rootScope.userPlaylist.indexOf(playlist),1);
  }

  $scope.editPlaylistName = function(playlist){
    var userPlaylist = PlaylistUser.update({iduser: Auth.getUser().id, idplaylist : playlist.id},{nomPlaylist : playlist.nom},
      function(){

        console.log(userPlaylist);
      },
      function(error){

      });
  }

  $rootScope.launchPlaylist = function(idplaylist, radio){
    $location.path('/home');

      $rootScope.lienRandomItemByGenre ="";

    var playlist = PlaylistUser.get({iduser: Auth.getUser().id, idplaylist: idplaylist},
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
        $rootScope.playlist.id = playlist[0].id;
        $rootScope.playlist.nom = playlist[0].nom;
        $rootScope.playing = true;
        $rootScope.small = false;
        $rootScope.createEcoute({"idItem" : $rootScope.playlist[0].id, "typeEcoute" : $rootScope.typeEcoute});


      },
      function(error){
        console.log("error");
      }
    );
  }

  var userPlaylist = PlaylistUser.query({iduser: Auth.getUser().id},
    function(){
      $rootScope.userPlaylist = userPlaylist;

    },
    function(error){
      console.log("error");
    }
  );



}]);
