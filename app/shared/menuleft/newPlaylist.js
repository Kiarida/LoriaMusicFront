app.directive('ngNewPlaylist', function($timeout) {
  return {
    
    scope: { newPlaylist: '&ngNewPlaylist'
           },
    link: function(scope, element) {
      element.bind("keypress", function(event) {


                if(event.keyCode == 13) {

                    scope.$apply(function () {
                      scope.newPlaylist();
                    });
       
                }

                if(event.keyCode == 27) {

                    scope.$apply(function () {
                      scope.newPlaylist();
                    });
       
                }
    });
               
    }
  };
});