
var app= angular.module('PlayerApp',
  [
    'ngRoute',
    'ngResource',
    'ngCookies',
    'akoenig.deckgrid',
    "ngSanitize",
    "com.2fdevs.videogular",
    "com.2fdevs.videogular.plugins.controls",
    "com.2fdevs.videogular.plugins.overlayplay",
    "com.2fdevs.videogular.plugins.poster",
    "com.2fdevs.videogular.plugins.buffering",
    "ui.bootstrap",
    'ngTagsInput',
  ]);



app.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=0; i<total; i++)
      input.push(i);
    return input;
  };
});
app.filter('yearRange', function() {
  return function(input, total) {
    var date = new Date().getFullYear();
    console.log(date);
    total = date - parseInt(total);
    for (var i=date; i>total; i--)
      input.push(i);
    return input;
  };
});

//check on each redirection if the user is logged if he is not, we redirect him to the login page
app.run(['$rootScope', '$location', 'Auth', '$resource','routeRessource', '$cookieStore', '$routeParams', '$route','$sce','$q',
 function ($rootScope, $location, Auth, $resource, routeRessource, $cookieStore,$routeParams,$route,$sce,$q) {
    $rootScope.$on('$routeChangeStart', function (event) {


      if($rootScope.playing == true && $location.url()!='/home'){
        $rootScope.small = true;
        var content = document.getElementsByClassName('content');
        var wrappedResult = content[0];

        wrappedResult.style.height="80%";


      }
      else{
        $rootScope.small = false;

      }



      //check if the user has the cookie user, in this case we load the user in the cookie in the Auth factory
      if(typeof $cookieStore.get('user') != 'undefined'){
        Auth.setUser($cookieStore.get('user'));
      }
      //if the Auth factory doesn't have a user's instance we redirect the user to the login page
      if(Auth.getUser()){
        //we create custom GET method including authorization and X-wsse header
        var Connected = $resource(routeRessource.IsConnected,{},
        {
          query: {
            method: 'GET',
            isArray: true,
            headers: {
              "Authorization" : 'WSSE profile="UsernameToken"',
              "X-wsse" : Auth.getUser().wsse
            }
          }
        });
        // if the user hasn't been checked via the IsConnected resource we do it in order to check if the x-wsse for the user is valid
        if(!Auth.getUser().checked){
          var post = Connected.query(null, function(){
            var user = Auth.getUser();
            $cookieStore.put('user',user);
            Auth.getUser().checked = true;
            $rootScope.connected = true;
            if($location.url() == "/" || $location.url() == ""){
              $location.path("/home");
            }
          },
          function(error){
            Auth.setUser(false);
            $location.path("/");
          });
        }
        else{
            $rootScope.connected = true;
            if($location.url() == "/" || $location.url() == ""){
              $location.path("/home");
            }
        }
      }
      else{
        $location.path("/");
      }

    });



    $rootScope.launchPlay = function(track, radio){
      if(!radio){
        console.log("pas radio");
        $rootScope.lienRandomItemByGenre ="";
      }
      $location.path('/home');

      if(Array.isArray(track)){
        $rootScope.playing = true;
        $rootScope.playlist = [];
        for(var i=0;i<track.length;i++){

          $rootScope.playlist.push(track[i]);

        }

         $rootScope.$broadcast('someEvent', track);
      }
      else if($.inArray(track, $rootScope.playlist)==-1){

        $rootScope.playing = true;
        $rootScope.playlist = [];
        newtrack = track;
        newtrack.sources = [{src: $sce.trustAsResourceUrl(track.url), type:"audio/mp3"}];
        $rootScope.playlist.push(newtrack);

        $rootScope.$broadcast('someEvent', newtrack);

        //$route.reload();
      }
      $rootScope.small = false;
      $rootScope.createEcoute({"idItem" : $rootScope.playlist[0].id, "typeEcoute" : $rootScope.typeEcoute});
      $rootScope.getLast5Ecoutes();

    }

    $rootScope.playlist = [];
    $rootScope.playing = false;
    $rootScope.location = $location.url();
    $rootScope.small = false;
    $rootScope.wordSearched = {search : null};
    $rootScope.resItem = [];
    $rootScope.resArtiste = [];
    $rootScope.resAlbum = [];
    $rootScope.typeEcoute = -1;
    $rootScope.historyTracks = [];

    //check if the user has the cookie user, in this case we load the user in the cookie in the Auth factory
    if(typeof $cookieStore.get('user') != 'undefined'){
      Auth.setUser($cookieStore.get('user'));
    }

    $rootScope.search = function(){
      if($location.url() != "search")
        $location.path('/search');
      $rootScope.initSearch();
      $rootScope.resArtiste =[];
      $rootScope.resItem = [];
      $rootScope.resAlbum = [];
      if($rootScope.wordSearched.search!= null && $rootScope.wordSearched.search.length >= 3){
        var item = $rootScope.Search.query({key:$rootScope.wordSearched.search},
          function(){
            for(var i=0; i<item.length; i++){

              if(item[i].typeitem == 1){

                $rootScope.resItem[i] = item[i];
              }
              else{
                $rootScope.resAlbum[i] = item[i];
              }
            }

          },
          function(error){
            $rootScope.resItem = error.data;
          }
        );
        var artisteItem = $rootScope.SearchArtiste.query({key:$rootScope.wordSearched.search},
            function(){
              $rootScope.resArtiste = artisteItem;
            },
            function(error){
              $rootScope.resArtiste = error.data;
            }
        );
      }
    };

    $rootScope.initSearch = function(){
      if(Auth.getUser() && $rootScope.Search == null){
        $rootScope.Search = $resource(routeRessource.ItemSearch,{},
        {
          'query': {
              method: 'GET',
              isArray: true,
              headers: {
                "Authorization" : 'WSSE profile="UsernameToken"',
                "X-wsse" : Auth.getUser().wsse
              },
              params:{key: "@key"}
          }
        });

        $rootScope.SearchArtiste = $resource(routeRessource.ArtisteSearch,{},
        {
          'query': {
              method: 'GET',
              isArray: true,
              headers: {
                "Authorization" : 'WSSE profile="UsernameToken"',
                "X-wsse" : Auth.getUser().wsse
              },
              params:{key: "@key"}
          }
        });
      }
    };
    $rootScope.createEcoute = function(params){
      var Ecoute = $resource(routeRessource.AddEcoute,{},
      {
        'save': {
            method: 'POST',
            headers: {
              "Authorization" : 'WSSE profile="UsernameToken"',
              "X-wsse" : Auth.getUser().wsse
            },
            params:{iduser: "@iduser"}
        },
      });

      Ecoute.save({iduser:Auth.getUser().id},params,
      function(mess){
        $rootScope.currentEcoute = mess.id;
      },
      function(error){
        console.log(error);
      });
    }

    $rootScope.convertTime=function (secondes){
      var min = Math.floor(secondes / 60);
      var sec = secondes - min * 60;
      return min+":"+sec;
    }

    $rootScope.stockArtist=function(nomArtiste){
      $rootScope.currentArtist=nomArtiste;
    }

    $rootScope.getLast5Ecoutes = function(){

    var deferred = $q.defer();

    $rootScope.toTimestamp = function(date) {
      var dateSplitted = date.split('-'); // date must be in DD-MM-YYYY format
      var dateSplitted2 = dateSplitted[2].split("T");
      var formattedDate = dateSplitted2[0]+'/'+dateSplitted[1]+'/'+dateSplitted[0];
      return(formattedDate);
    };

    var Res = $resource(routeRessource.LastEcoutes,{},
    {
          'query': {
              method: 'GET',
              isArray: true,
              headers: {
                "Authorization" : 'WSSE profile="UsernameToken"',
                "X-wsse" : Auth.getUser().wsse
              },
              params:{id:"@id"}
          }
        });

        Res.query(
          {id: Auth.getUser().id},
          function(mess){

                deferred.resolve(mess);

          },
          function(error){

          });

                deferred.promise.then(function(ecoutes) {

                  $rootScope.historyTracks = [];

                for(var k = 0; k < ecoutes.length; k++){
                  if($rootScope.historyTracks.length < 5){

                    ecoutePushed = ecoutes[k].iditem;
                    ecoutePushed.sources = [{src: $sce.trustAsResourceUrl(ecoutePushed.url), type:"audio/mp3"}];
                    $rootScope.historyTracks.push(ecoutePushed);
                    $rootScope.historyTracks[k]

                  }
                  else
                    break;
                }

                }, function(error) {

                }, function() {

                });

  }

    $(".contain").height(window.innerHeight-71);
    $(".centre,.droit,#menu-left").height(window.innerHeight-71);



}]);

app.constant("routeRessource", {
  "CreateToken" : "http://develop.api/api/app.php/security/tokens/creates.json",
  "CreateUser"  : "http://develop.api/api/app.php/users",
  "IsConnected" : "http://develop.api/api/app.php/api/connected",
  "PrefUser" : "http://develop.api/api/app.php/api/users/:id",
  "Genres" : "http://develop.api/api/app.php/genres",
  "ItemGenre" : "http://develop.api/api/items/genre/:id",
  "Artistes" : "http://develop.api/api/artistes.json",
  "ItemArtiste" : "http://develop.api/api/items/artiste/:id",
  "ItemPopular" : "http://develop.api/api/items/get/popular.json",
  "ItemSearch" : "http://develop.api/api/app.php/items/search/:key",
  "ArtisteSearch" : "http://develop.api/api/app.php/artistes/search/:key",
  "PlaylistDetail" : "http://develop.api/api/app.php/users/:iduser/playlists/:id",
  "RandomItemByGenre" : "http://develop.api/api/app.php/items/genre/:id",
  "RandomItemByArtiste" : "http://develop.api/api/app.php/items/artiste/:id",
  "Sessions" : "http://develop.api/api/app.php/users/:id/sessions",
  "EcoutesBySession" : "http://develop.api/api/app.php/users/:id/sessions/:id_session",
  "TagsBySession" : "http://develop.api/api/app.php/users/:id/sessions/:id_session/tags/:idtag",
  "PlaylistTags" : "http://develop.api/api/app.php/users/:iduser/playlists/:id/tags/:idtag",
  "PlaylistUser" : "http://develop.api/api/app.php/users/:iduser/playlist/:idplaylist",
  "Friends" : "http://develop.api/api/app.php/users/:iduser/friends/:idfriend",
  "Albums" : "http://develop.api/api/app.php/items/albums/:idartiste",
  "ItemsByAction" : "http://develop.api/api/app.php/users/:iduser/action/:idaction/items",
  "RateItem" : "http://develop.api/api/app.php/users/:iduser/note/item/:iditem",
  "AddItemPlaylist" : "http://develop.api/api/app.php/users/:iduser/playlist/:idplaylist/items/:iditem",
  "AddInteraction" : "http://develop.api/api/app.php/users/:iduser/interaction",
  "AddAction" : "http://develop.api/api/app.php/users/:iduser/action",
  "AddEcoute" : "http://develop.api/api/app.php/users/:iduser/ecoute",
  "GetTypes" : "http://develop.api/api/app.php/users/:iduser/actions/:iditem",
  "ArtistScore" : "http://develop.api/api/app.php/users/:iduser/note/artiste/:idartiste",
  "Artist" : "http://develop.api/api/app.php/artistes/:idartiste",
  "Playlists" : "http://develop.api/api/app.php/users/:iduser/playlist",
  "PlaylistTracks" : "http://develop.api/api/app.php/users/:iduser/playlist/:idplaylist",
  "TagsByPlaylist" : "http://develop.api/api/app.php/users/:iduser/playlists/:idplaylist/tags/:idtag",
  "nextInteraction" : 1,
  "previousInteraction" : 2,
  "stopInteraction" : 3,
  "playInteraction" : 4,
  "muteInteraction" : 5,
  "loopInteraction" : 6,
  "blockInteraction" : 7,
  "randomInteraction" : 8,
  "likeInteraction" : 9,
  "blockAction" : 1,
  "likeAction" : 2,
  "shareAction" : 3,
  "LastEcoutes" : "http://develop.api/api/app.php/users/:id/ecoute.json",
  "TagsItem" : "http://develop.api/api/app.php/items/:id/tags/:idtag",
  "NoteTagsItem" : "http://develop.api/api/app.php/users/:iduser/items/:id/tags/:idtag"
});
