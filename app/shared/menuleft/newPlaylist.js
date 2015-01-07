app.directive('ngNewPlaylist', function($timeout) {
  return {
    
    scope: { newPlaylist: '&ngNewPlaylist'
           },
    link: function(scope, element) {
      element.bind("keypress", function(event) {
                if(event.which == 13) {

                    scope.$apply(function () {
                      scope.newPlaylist();
                    });
                        
                        console.log(scope);
                        


                }
            });
    }
  };
});