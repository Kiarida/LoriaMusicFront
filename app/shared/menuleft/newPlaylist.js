app.directive('ngNewPlaylist', function($timeout) {
  return {
    
    scope: false,
    
    link: function(scope, element) {

      element.bind("keypress", function(event) {

                if(event.keyCode == 13) {

                    scope.$apply(function () {
                      if(scope.changeNewPlaylist)
                        scope.changeNewPlaylist();
                      scope.$root.addPlaylist(scope.titleNewPlaylist);

                    });

                }

                if(event.keyCode == 27) {

                    scope.$apply(function () {
                      if(scope.changeNewPlaylist)
                        scope.changeNewPlaylist();
                    });
       
                }
    });
               
    }
  };
});