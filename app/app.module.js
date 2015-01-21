
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
    total = 1900 + parseInt(total);
    for (var i=1900; i<total; i++)
      input.push(i);
    return input;
  };
});

//check on each redirection if the user is logged if he is not, we redirect him to the login page
app.run(['$rootScope', '$location', 'Auth', '$resource','routeRessource', '$cookieStore', '$routeParams', '$route','$sce',
 function ($rootScope, $location, Auth, $resource, routeRessource, $cookieStore,$routeParams,$route,$sce) {
    $rootScope.$on('$routeChangeStart', function (event) {


      if($rootScope.playing == true && $location.url()!='/home')
        $rootScope.small = true;
      else
        $rootScope.small = false;


      $(".centre,.droit,#menu-left").height($(document).height());

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
            console.log($location.url() == "");
            if($location.url() == "/" || $location.url() == ""){
              $location.path("/home");
            }
        }
      }
      else{
        $location.path("/");
      }

    });

    $rootScope.launchPlay = function(track){
      if(Array.isArray(track)){
        $rootScope.playing = true;
        $rootScope.playlist = [];
        for(var i=0;i<track.length;i++){
          $rootScope.playlist.push(track[i]);

        }

      }
      else if($.inArray(track, $rootScope.playlist)==-1){
        $rootScope.playing = true;
        $rootScope.playlist = [];
        $rootScope.playlist.push(track);

        //$route.reload();
      }
      $rootScope.small = false;

    }

    $rootScope.playlist = [];
    $rootScope.userPlaylist = [
      {
        id : 1,
        name : "Playlist 1",
        playlist: [
          {
            id : 1,
            sources: [
              {src: $sce.trustAsResourceUrl("http://b.rdb.so/d/JJXPDZ46WULAO/La%20Vie%20En%20Rose%20lyrics%20-%20Cristin%20Milioti.mp3"), type: "audio/mp3"}
            ],
            name: "La vie en rose",
            artiste : "Cristin Milioti",
            rate: 3,
            poster: "http://i.ytimg.com/vi/S8gL_7HjLGU/maxresdefault.jpg",
            tags:["test","rap"],
            cover: "http://lorempixel.com/200/200/",
          },
          {
            id : 12,
            sources: [
              {src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/audios/videogular.ogg"), type: "audio/ogg"}
            ],
            name: "Dangerous",
            artiste : "David Guetta",
            rate: 3,
            poster: "http://www.videogular.com/assets/images/videogular.png",
            tags:["test","rap"],
            cover: "http://lorempixel.com/200/200/",
          },
          {
            id : 1,
            sources: [
              {src: $sce.trustAsResourceUrl("http://a.rdb.so/d/7YLYC3ZUMW6XY/Justin%20Timberlake%20-%20Cry%20Me%20A%20River%20%28Official%29.mp3"), type: "audio/mp3"}
            ],
            name: "Cry me a river",
            artiste : "Justin Timberlake",
            rate: 3,
            poster: "http://horrordisco.com/wp-content/uploads/2012/08/Justin-Timberlake.jpg",
            tags:["test","rap"],
            cover: "http://lorempixel.com/200/200/",
          },
        ]
      },

      {
        id : 2,
        name : "Playlist 2"
      },
      {
        id : 3,
        name : "Playlist 3"
      }

    ];;
    $rootScope.playing = false;
    $rootScope.location = $location.url();
    $rootScope.small = false;
    $(".contain").height($(document).height());


}]);

app.constant("routeRessource", {
  "CreateToken" : "http://LoriaMusic.local/api/app.php/security/tokens/creates.json",
  "CreateUser"  : "http://LoriaMusic.local/api/app.php/users",
  "IsConnected" : "http://LoriaMusic.local/api/app.php/api/connected",
  "PrefUser" : "http://LoriaMusic.local/api/app.php/user/:id",
  "Genre" : "http://LoriaMusic.local/api/app.php/genres",
  "ItemGenre" : "http://LoriaMusic.local/api/app.php/item/genre/:id",
  "Artistes" : "http://LoriaMusic.local/api/app.php/artistes/",
  "ItemArtiste" : "http://LoriaMusic.local/api/app.php/item/artiste/:id",
  "ItemPopular" : "http://LoriaMusic.local/api/app.php/items/get/popular.json"
})
