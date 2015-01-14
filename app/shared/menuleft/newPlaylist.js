app.directive('ngNewPlaylist', function($timeout) {
  return {
    
    scope: false,
    
    link: function(scope, element) {
      element.bind("keypress", function(event) {

console.log(scope);

                if(event.keyCode == 13) {

                    scope.$apply(function () {
                      scope.changeNewPlaylist();
                      scope.addPlaylist(scope.titleNewPlaylist);

                    });

                    console.log(scope.getPlaylists());
       
                }

                if(event.keyCode == 27) {

                    scope.$apply(function () {
                      scope.changeNewPlaylist();
                    });
       
                }
    });
               
    }
  };
});