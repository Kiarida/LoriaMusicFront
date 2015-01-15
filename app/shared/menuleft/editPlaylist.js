app.directive('ngEditPlaylist', function($timeout) {
  return {
    scope: { editPlaylist: '=ngEditPlaylist',
              showTag: "=showTag" 
           },
    link: function(scope, element) {
      element.bind('click', function() {
      scope.$watchGroup(['editPlaylist', 'showTag'], function(newValues, oldValues, scope) {
        if(newValues[0] == true){
      			
      			element.parent().parent().parent().css( "background-color", "#374051" );
      			element.children().css("color", "#7B9EDF");
            element.parent().removeClass('playlist-hover');
      	    scope.editPlaylist = true;

            
      		}
      		else{

            element.children().css("color", "#FFF");
            scope.editPlaylist = false;

              if(newValues[1] == true){
                  element.parent().parent().parent().css( "background-color", "" );
                  element.parent().addClass('playlist-hover');
              }
      			
      			
            
      			
      		}

          console.log(scope);
      });
  });
    }
  };
});