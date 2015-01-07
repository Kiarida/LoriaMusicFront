app.directive('ngShowTagPlaylist', function($timeout) {
  return {
    scope: { showTag: '=ngShowTagPlaylist',
    		 editPlaylist: '=editPlaylist'
    	   },
    link: function(scope, element) {
      element.bind('click', function() {

      scope.$watchGroup(['showTag', 'editPlaylist'], function(newValues, oldValues, scope) {


        if(newValues[0] == false){

        	element.children().css("color", "#7B9EDF");
        	element.parent().removeClass('playlist-hover');
      		element.parent().parent().parent().css( "background-color", "#374051" );
      		
      	}
      	else{
      		element.children().css("color", "#FFF");

      		if(newValues[1] == false){
      			
      			element.parent().parent().parent().css( "background-color", "" );
      			element.parent().addClass('playlist-hover');

      		}
      			
      	}
      });
  });
    }
  };
});






      			
      			