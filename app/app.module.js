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
    'colorpicker.module',
    'ngDraggable',
    'info.vietnamcode.nampnq.videogular.plugins.flash'
    
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
    
    total = date - parseInt(total);
    for (var i=date; i>total; i--)
      input.push(i);
    return input;
  };
});


app.filter('ecouteRange', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=0; i<total; i++)
      input.push(i);
    return input;
  };
});

//check on each redirection if the user is logged if he is not, we redirect him to the login page
app.run(['$rootScope', '$location', 'Auth', '$resource','routeRessource', '$cookieStore', '$routeParams', '$route','$sce','$q', '$timeout', '$window', '$http',
 function ($rootScope, $location, Auth, $resource, routeRessource, $cookieStore,$routeParams,$route,$sce,$q, $timeout, $window, $http) {
  var params = $location.$$path.split("&");
  var codeUrl = $location.$$absUrl.split("/");
  console.log(codeUrl);
  var code = codeUrl[3].split("?code=")[1];
  var access_token = params[0].split("/access_token=")[1];
  console.log(code);

  // initialisation du player Rhapsody
  Rhapsody.init({
     consumerKey: "Yzc0YmI1YzUtY2IzNi00NjY1LTgyMTQtMTUyZGQ1OTczMjFj",
     version: 'v1',
     catalog: 'FR'
  });



    $rootScope.$on('$routeChangeStart', function (event) {
      $rootScope.searchingG=false;
      $rootScope.searchingA=false;

      $rootScope.radioMode=false;
      $rootScope.recomMode=false;
      if($location.url() != "/radios/recommandations"){
      	$rootScope.wideRadio=false;
      }
      
     
      if($rootScope.recomPlaylist && $rootScope.recomPlaylist.length > 1 && !$rootScope.radioMode && !$rootScope.recomMode){
        $rootScope.playlist=[];
      }
      $window.onbeforeunload=function(event){
          var EndSession = $resource(routeRessource.EndSession,{},
          {
            update: {
              method: 'PUT',
              isArray: false,
              headers: {
                "Authorization" : 'WSSE profile="UsernameToken"',
                "X-wsse" : Auth.getUser().wsse
              },
              params: {iduser:"@iduser"},
            }
          });
          EndSession.update({iduser:Auth.getUser().id});
        
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
        if(!Auth.getUser().username){
          var post = Connected.query(null, function(){
            var user = Auth.getUser();
            if(user.role!="admin_user"){
               $cookieStore.put('user',user);
            }
           
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

    function getColor(track, param){
      if(!param && !$rootScope.radioMode && !$rootScope.recomMode){
        param="other";
      }
      if(param){
        track.color={
         }

        track.color.name=param;
        switch(param){
          case "radio":
          track.color.code="#319570"
          break;
          case "playlist":
          track.color.code="#3A353C"
          break;
          case "album":
          track.color.code="#5F342F"
          break;
          case "other":
          track.color.name="other"
          track.color.code="#4C433A"
          break;
          default:
          track.color.name="other"
          track.color.code="#4C433A"
          break;
        }
      }
    }

    $rootScope.playByYouTube = function(videoId) {
      if(!$rootScope.youtubePlayer) {
          angular.element(document.body).append('<div id="youtube_player"></div>');

          $rootScope.youtubePlayer = new YT.Player('youtube_player', {
              height: 0,
              width: 0,
              videoId: videoId,
              events: {
                'onReady': function(e) { e.target.playVideo(); }
              }
            });
      } else {
        $rootScope.youtubePlayer.loadVideoById(videoId).playVideo();
      }
    };

    var GetItemGrooveshark = null;

    $rootScope.launchPlay = function(track, param){

      if(!track.idartiste) {
        track.titre = track.name;
        track.idartiste = [{ nom : track.artist }];
      }

      if(!$rootScope.radioMode && $rootScope.wideRadio){
        $rootScope.radioMode=false;
        $rootScope.recomMode=false;
        $rootScope.wideRadio=false;
      }

      console.log(">>>>>>>>>>>>>>", track);

      if(!GetItemGrooveshark) {
        GetItemGrooveshark = $resource(routeRessource.getSearchGrooveshark, {},
        {
          'save': {
              method: 'POST',
              headers: {
                "Authorization" : 'WSSE profile="UsernameToken"',
                "X-wsse" : Auth.getUser().wsse
              },
              params:{}
          }
        });
      }
      
      $rootScope.Search.query({ titre: track.titre, nomArtiste: track.idartiste[0].nom }).$promise.then(function(items) {
          var item = items[0];

          $rootScope.playByYouTube(item.YouTubeVideoId);
          $rootScope.createEcoute({"idItem" : item.id, "typeEcoute" : $rootScope.typeEcoute});
      }).catch(function(error) {
        GetItemGrooveshark.save({
            url: track.url, 
            titre: track.name, 
            nom: track.artist,
            nomAlbum: '',
            duration: 0,
            urlCover: (track.image.length > 0) ? track.image[0]['#text'] : null,
          }).$promise.then(function(item) {
            console.log(item);

            $rootScope.playByYouTube(item.YouTubeVideoId);
            $rootScope.createEcoute({"idItem" : item.id, "typeEcoute" : $rootScope.typeEcoute});
          });
      });
     
      /*var Stream = $resource(routeRessource.GetStreaming, {},{
        'query': {
            method: 'GET',
            isArray: true,
            headers: {
              "Authorization" : 'WSSE profile="UsernameToken"',
              "X-wsse" : Auth.getUser().wsse
            },
            params:{iditem:"@iditem"}
        }
      });
*/
      
      $rootScope.smallSearch=false;
      if(track.gs){
        if(!track.urlCover){
          track.urlCover="assets/img/placeholder.png";
        }


        //$location.path('/home');

        // Rhapsody.player.play(track.url);
        $rootScope.playing = true;
        $rootScope.playlist = [];
        getColor(track, param);
        newtrack = track;
        newtrack.sources = [{src: $sce.trustAsResourceUrl(String(track.url)), type:"audio/mp3"}];
        $rootScope.playlist.push(newtrack);

        $rootScope.$broadcast('someEvent', newtrack);

        if($rootScope.$$childTail.$$childHead.API){
          $rootScope.$$childTail.$$childHead.controller.videos=$rootScope.playlist;
          $rootScope.$$childTail.$$childHead.controller.currentVideo=0;
          $rootScope.$$childTail.$$childHead.API.play();

        }

        $rootScope.small = true;
        //$rootScope.createEcoute({"idItem" : $rootScope.playlist[0].id, "typeEcoute" : $rootScope.typeEcoute});
        $rootScope.getLast5Ecoutes();

      }
      else{

        if(param != "radio"){
          $rootScope.lienRandomItemByGenre ="";
        }
        //$location.path('/home');

        //Stream.query({iditem:track.id, uhs:$rootScope.uhs, xtoken:$rootScope.xtoken}, function(mess){
          //console.log(mess);
        //track.url=mess[0];

        if(Array.isArray(track)){
          $rootScope.playing = true;
          $rootScope.playlist = [];

          for(var i=0;i<track.length;i++){
            getColor(track[i], param);
            if(!track.urlCover){
              track.urlCover="assets/img/placeholder.png";
            }
            track[i].sources=[{src: $sce.trustAsResourceUrl(track[i].url), type:"audio/mp3"}];
            //track[i].sources=[{src: $sce.trustAsResourceUrl(track[i].url), type:"application/x-mpegurl"}];
            //track[i].sources=[{src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/videos/videogular.mp4"), type: "video/mp4"}];
            console.log(track[i].sources);
            $rootScope.playlist.push(track[i]);
          }
           $rootScope.$broadcast('someEvent', track);
        }
        else if($.inArray(track, $rootScope.playlist)==-1){
          $rootScope.playing = true;
          $rootScope.playlist = [];
          getColor(track, param);
          if(!track.urlCover){
              track.urlCover="assets/img/placeholder.png";
            }
          newtrack = track;
          newtrack.sources = [{src: $sce.trustAsResourceUrl(track.url), type:"audio/mp3"}];
          
          //newtrack.sources = [{src: $sce.trustAsResourceUrl(track.url), type:"application/x-mpegurl"}];
          //newtrack.sources=[{src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/videos/videogular.mp4"), type: "video/mp4"}]
          $rootScope.playlist.push(newtrack);
          $rootScope.$broadcast('someEvent', newtrack);

          //$route.reload();
        }

        if($rootScope.$$childTail.$$childHead && $rootScope.$$childTail.$$childHead.API){
          $rootScope.$$childTail.$$childHead.controller.videos=$rootScope.playlist;
          $rootScope.$$childTail.$$childHead.controller.currentVideo=0;
          $rootScope.$$childTail.$$childHead.API.play();
        }
        //});
        $rootScope.small = true;
        //$rootScope.createEcoute({"idItem" : $rootScope.playlist[0].id, "typeEcoute" : $rootScope.typeEcoute});
        $rootScope.getLast5Ecoutes();
      }
    

    }

    $rootScope.playlist = [];
    $rootScope.playing = false;
    $rootScope.location = $location.url();
    $rootScope.small = true;
    $rootScope.wordSearched = {search : null};
    $rootScope.resItem = [];
    $rootScope.resArtiste = [];
    $rootScope.resAlbum = [];
    $rootScope.smallResItem = [];
    $rootScope.smallResArtiste = [];
    $rootScope.smallResAlbum = [];
    $rootScope.typeEcoute = -1;
    $rootScope.historyTracks = [];
    $rootScope.searchingG=false;
    $rootScope.searchingA=false;
    //$rootScope.recomPlaylist=[];
    $rootScope.smallSearch=false;


    //check if the user has the cookie user, in this case we load the user in the cookie in the Auth factory
    if(typeof $cookieStore.get('user') != 'undefined'){
      Auth.setUser($cookieStore.get('user'));
    }

    var trackItem = $resource(routeRessource.LastFM_Track, {
      track: "@trackName",
      format: 'json',
      limit: 20
    });

    var artisteItem = $resource(routeRessource.LastFM_Artiste, { 
        artist: "@artistName",
        format: 'json',
        limit: 20
    });



    $rootScope.search = function(){
      $rootScope.smallSearch=true;
      //  $location.path('/search');
      $rootScope.initSearch();
      $rootScope.resArtiste =[];
      $rootScope.resItem = [];
      $rootScope.resAlbum = [];
      if($rootScope.wordSearched.search!= null && $rootScope.wordSearched.search.length >= 3){
       $rootScope.resArtiste =[];
        $rootScope.resItem = [];
        $rootScope.resAlbum = [];
        
        trackItem.get({track: $rootScope.wordSearched.search}).$promise.then(function(data) {
          $rootScope.smallResItem = data.results.trackmatches.track;

          console.info("Résultats pour Titres", $rootScope.smallResItem);
        }).catch(function(error) {
          //$rootScope.resItem = error.data;
        });

        artisteItem.get({artist: $rootScope.wordSearched.search}).$promise.then(function(data) {
          $rootScope.smallResArtiste = data.results.artistmatches.artist;

          console.info("Résultats pour Artiste", $rootScope.smallResArtiste);
        }).catch(function(error) {
            //$rootScope.resArtiste = error.data;
        });



        // var item = $rootScope.Search.query({key:$rootScope.wordSearched.search},
        //   function(){
        //     $rootScope.resItem = [];
        //     for(var i=0; i<item.length; i++){
              
        //       if(item[i].typeitem == 1){
        //             $rootScope.resItem.push(item[i]);
        //       }
        //       else{
        //         $rootScope.resAlbum.push(item[i]);
        //       }
        //     }
        //     if($rootScope.smallSearch==true){
        //       $rootScope.smallResItem=$rootScope.resItem.slice(0,9);
        //       $rootScope.smallResAlbum=$rootScope.resAlbum.slice(0,9);
        //     }
            
           
        //   },
        //   function(error){
        //     $rootScope.resItem = error.data;
        //   }
        // );
        // var artisteItem = $rootScope.SearchArtiste.query({key:$rootScope.wordSearched.search},
        //     function(){
        //       $rootScope.resArtiste = artisteItem;
        //       if($rootScope.smallSearch==true){
        //         //$rootScope.smallResArtiste=$rootScope.resArtiste.slice(0,9);
        //         $rootScope.smallResArtiste=$rootScope.resArtiste;
        //       }
        //     },
        //     function(error){
        //       $rootScope.resArtiste = error.data;
        //     }
        // );
      }
    };

    $rootScope.dismiss=function(){
      $rootScope.smallSearch=false;
    }

    $rootScope.searchGrooveshark=function(){
      $rootScope.resArtiste=[];
      $rootScope.resAlbum=[];
      $rootScope.resItem=[];
      var SearchGrooveshark = $resource(routeRessource.searchItemGrooveshark, {},
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
      $rootScope.query=true;
      SearchGrooveshark.query({key:$rootScope.wordSearched.search}, function(mess){
        
        for(var i=0; i<mess.length; i++){
          //if(mess[i].name.toLowerCase().indexOf($rootScope.wordSearched.search.toLowerCase()) != -1 || mess[i].artist.name.toLowerCase().indexOf($rootScope.wordSearched.search.toLowerCase()) != -1){
             
             track = {
              "titre" : mess[i].name,
              "url" : mess[i].id,
              "nom" : mess[i].artist.name,
              "nomAlbum" : mess[i].album.name,
              "idArtiste" : mess[i].artist.id,
              "gs" : true,
              "duration" : mess[i].duration,
            }
            track["idalbum"]=new Array({"titre":mess[i].album.name});
            track["idartiste"]=new Array({"nom":mess[i].artist.name});
            $rootScope.resItem.push(track);

               
          //}
          /*else if(mess[i].ArtistName.indexOf($rootScope.wordSearched.search) != -1){
            $rootScope.resArtiste.push(mess[i]);
          }
          else if(mess[i].AlbumName.indexOf($rootScope.wordSearched.search) != -1){
            $rootScope.resAlbum.push(mess[i]);
          }*/
        }
        $rootScope.query=false;
      }, function(error){
        $rootScope.query=false;
      });
    }

    $rootScope.Search = $resource(routeRessource.ItemSearch, {}, {
        'query': {
            method: 'GET',
            isArray: true,
            params: {
              titre: "@titre",
              nomArtiste: "@nomArtiste"
            }
        }
    });

    $rootScope.initSearch = function(){
      if(Auth.getUser() && $rootScope.SearchArtiste == null){

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
        $rootScope.getLast5Ecoutes();
      },
      function(error){
        console.log(error);
      });
    }

    $rootScope.convertTime=function (secondes){
      var min = Math.floor(secondes / 60);

      var sec = secondes - min * 60;
      sec=parseInt(sec);
      if(sec < 10){
        sec = "0"+sec;
      }
      return parseInt(min)+":"+sec;
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

        Res.query({id: Auth.getUser().id},
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




    //$(".contain").height(window.innerHeight-71);
    //$(".centre,.droit,#menu-left").height(window.innerHeight-71);
    $(".fading-search").on("click", function(event){
      $rootScope.smallSearch=false;
      $rootScope.$apply();
    })
    $(".genre-fading-search").on("click", function(event){
      $rootScope.searching=false;
      $rootScope.$apply();
    })





}]);

var config = {
  baseURL: "http://develop.api/api/",
  development: true
};

function getUrl(url) {
  var baseURL = config.baseURL;
  baseURL += (config.development) ? "app_dev.php" : "app.php";
  baseURL += url;

  return baseURL;
}

app.constant("routeRessource", {
  "CreateToken" : getUrl("/security/tokens/creates.json"),
  "CreateUser"  : getUrl("/users"),
  "IsConnected" : getUrl("/api/connected"),
  "PrefUser" : getUrl("/api/users/:id"),
  "Genres" : getUrl("/genres"),
  "ItemGenre" : getUrl("/items/genre/:id"),
  "Artistes" : getUrl("/artistes.json"),
  "SearchArtists" : getUrl("/artistes/search/:key"),
  "ItemArtiste" : getUrl("/items/artiste/:id"),
  "ItemPopular" : getUrl("/items/get/popular.json"),
  "ItemSearch" : getUrl("/items/search/:titre/:nomArtiste"),
  "ArtisteSearch" : getUrl("/artistes/search/:key"),
  "PlaylistDetail" : getUrl("/users/:iduser/playl)ists/:id"),
  "RandomItemByGenre" : getUrl("/items/genre/:id"),
  "RandomItemByArtiste" : getUrl("/items/artiste/:id"),
  "Sessions" : getUrl("/users/:id/sessions"),
  "EcoutesBySession" : getUrl("/users/:id/sessions/:id_session"),
  "TagsBySession" : getUrl("/users/:id/sessions/:id_session/tags/:idtag"),
  "PlaylistTags" : getUrl("/users/:iduser/playlists/:id/tags/:idtag"),
  "PlaylistUser" : getUrl("/users/:iduser/playlist/:idplaylist"),
  "Friends" : getUrl("/users/:iduser/friends/:idfriend"),
  "Albums" : getUrl("/items/albums/:idartiste"),
  "ItemsByAction" : getUrl("/users/:iduser/action/:idaction/items"),
  "RateItem" : getUrl("/users/:iduser/note/item/:iditem"),
  "AddItemPlaylist" : getUrl("/users/:iduser/playlist/:idplaylist/items/:iditem"),
  "AddInteraction" : getUrl("/users/:iduser/interaction"),
  "AddAction" : getUrl("/users/:iduser/action"),
  "AddEcoute" : getUrl("/users/:iduser/ecoute"),
  "GetTypes" : getUrl("/users/:iduser/actions/:iditem"),
  "ArtistScore" : getUrl("/users/:iduser/note/artiste/:idartiste"),
  "Artist" : getUrl("/artistes/:idartiste"),
  "Playlists" : getUrl("/users/:iduser/playlist"),
  "PlaylistTracks" : getUrl("/users/:iduser/playlist/:idplaylist"),
  "TagsByPlaylist" : getUrl("/users/:iduser/playlists/:idplaylist/tags/:idtag"),
  //"getStreaming" : getUrl("/items/grooveshark/:iditem",
  "mark30seconds" : getUrl("/items/grooveshark/mark30secondes"),
  "markComplete" : getUrl("/items/grooveshark/markComplete"),
  "getSearchGrooveshark" : getUrl("/items/"),
  "searchItemGrooveshark" : getUrl("/items/grooveshark/search/:key"),
  "nextInteraction" : 1,
  "previousInteraction" : 2,
  "stopInteraction" : 3,
  "playInteraction" : 4,
  "muteInteraction" : 5,
  "loopInteraction" : 6,
  "blockInteraction" : 7,
  "randomInteraction" : 8,
  "likeInteraction" : 9,
  "launchInteraction" : 10,
  "blockAction" : 1,
  "likeAction" : 2,
  "shareAction" : 3,
  "LastEcoutes" : getUrl("/users/:id/ecoute.json"),
  "TagsItem" : getUrl("/items/:id/tags/:idtag"),
  "NoteTagsItem" : getUrl("/users/:iduser/items/:id/tags/:idtag"),
  "RhapsodyToken": getUrl("/users/:iduser/rhapsody/new"),
  "RhapsodyRefreshToken": getUrl("/users/:iduser/rhapsody/refresh"),
  "EndSession":getUrl("/users/:iduser/session/end"),
  "Algos" : getUrl("/algorithms"),
  "Tests" : getUrl("/tests"),
  "CurrentTest" : getUrl("/tests/current/:iduser"),
  "EndTest" : getUrl("/tests/:idtest/end"),
  "Groups" : getUrl("/groups/verify"),
  "Recommandations" : getUrl("/users/:iduser/recommandations"),
  "SearchGenres" : getUrl("/genres/:key"),
  "GetStreaming" : getUrl("/items/xbox/streaming/:iditem"),
  "LastFM_Artiste": "http://ws.audioscrobbler.com/2.0/?method=artist.search&api_key=30c3c9603ff7e5fba386bf8348abdb46",
  "LastFM_Track": "http://ws.audioscrobbler.com/2.0/?method=track.search&api_key=30c3c9603ff7e5fba386bf8348abdb46"
});
