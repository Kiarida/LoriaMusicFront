app.directive('ngEditPlaylistName', function($timeout) {
  return {
    
    scope: { changeEditPlaylistFalse: '&ngEditPlaylistName'
           },
    link: function(scope, element) {
      element.bind("keypress", function(event) {
                if(event.which == 13) {

                  
                        
                        scope.$apply(function () {
                      scope.changeEditPlaylistFalse();
                    });
                        console.log(scope);
                        


                }
            });
    }
  };
});