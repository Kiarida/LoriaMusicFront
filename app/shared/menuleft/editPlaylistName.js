app.directive('ngEditPlaylistName', function($timeout) {
  return {
    
    // scope: { changeEditPlaylistFalse: '&ngEditPlaylistName'
    //        },
    scope : false,
    link: function(scope, element) {
      element.bind("keypress", function(event) {
                if(event.which == 13) {

                    scope.$apply(function () {
                      scope.changeEditPlaylistFalse();
                      console.log(scope);
                      scope.editPlaylistName(scope.playlistEdited);
                      //scope.editPlaylistName(scope.playlistNameEdit);
                    });
                   

                }

                if(event.keyCode == 27) {

                    scope.$apply(function () {
                      scope.changeEditPlaylistFalse();
                    });
       
                }
            });
    }
  };
});