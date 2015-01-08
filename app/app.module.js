var app= angular.module('PlayerApp',['ngRoute', 'ngResource', 'ngCookies','akoenig.deckgrid']);
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
app.run(['$rootScope', '$location', 'Auth', '$resource','routeRessource', '$cookieStore', function ($rootScope, $location, Auth, $resource, routeRessource, $cookieStore) {
    $rootScope.$on('$routeChangeStart', function (event) {
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
            if($location.url() == "/"){
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
        }
      }
      else{
        $location.path("/");
      }

    });
}]);

app.constant("routeRessource", {
  "CreateToken" : "http://loriamusic.loc:8888/api/app.php/security/tokens/creates.json",
  "CreateUser"  : "http://loriamusic.loc:8888/api/app.php/users",
  "IsConnected" : "http://loriamusic.loc:8888/api/app.php/api/connected",
  "PrefUser" : "http://loriamusic.loc:8888/api/app.php/user/:id",
  "Genre" : "http://loriamusic.loc:8888/api/app.php/genres",
  "ItemGenre" : "http://loriamusic.loc:8888/api/app.php/item/genre/:id",
  "Artistes" : "http://loriamusic.loc:8888/api/app.php/artistes/",
  "ItemArtiste" : "http://loriamusic.loc:8888/api/app.php/item/artiste/:id"
})