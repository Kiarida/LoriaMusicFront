var app= angular.module('PlayerApp',['ngRoute', 'ngResource', 'ngCookies']);
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
      //check if the user has the cookie user, in this case we authenticate him
      if(typeof $cookieStore.get('user') != 'undefined'){
        Auth.setUser($cookieStore.get('user'));
      }
      if(Auth.getUser()){
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
        if(!Auth.getUser().checked){
          var post = Connected.query(null, function(){
            var user = Auth.getUser();
            $cookieStore.put('user',user);
            Auth.getUser().checked = true;
            $rootScope.connected = true;
          },
          function(error){
            Auth.setUser(false);
            $location.path("/");
          });
        }
      }
    });
}]);

app.constant("routeRessource", {
  "CreateToken" : "http://loriamusic.loc:8888/api/app.php/security/token/create.json",
  "CreateUser"  : "http://loriamusic.loc:8888/api/app.php/users.json",
  "IsConnected" : "http://loriamusic.loc:8888/api/app.php/api/users/connected.json"
})