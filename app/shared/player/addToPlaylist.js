app.controller('ModalFormCtrl', function ($rootScope, $scope, $modal, $log, $resource, routeRessource, Auth) {
  $scope.open = function (size, track) {

    var modalInstance = $modal.open({
      templateUrl: 'app/components/player/addToPLaylistView.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        track :function(){
          return track;
        }
      }
    });

    modalInstance.result.then(function () {
    }, function () {
      
    });
  };
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

app.controller('ModalInstanceCtrl', function ($rootScope, $scope, $modalInstance, $resource, routeRessource,Auth, track) {


	var AddItemPlaylist = $resource(routeRessource.AddItemPlaylist,{},
	    {
	      save: {
	        method: 'POST',
	        isArray: false,
	        headers: {
	          "Authorization" : 'WSSE profile="UsernameToken"',
	          "X-wsse" : Auth.getUser().wsse
	        },
	        params : {iduser:"@iduser", idplaylist:"@idplaylist"}
	      }
	    });



	$scope.addTrackToPlaylist = function(idPlaylist){

	
			if(idPlaylist=="")
				return;
			AddItemPlaylist.save({iduser:Auth.getUser().id, idplaylist:idPlaylist},{iditem:track.id},
				function(){
					/*$(".addtoplaylist .alert-success.hide").removeClass("hide");
					if($scope.$root.playlist.id == idPlaylist){
						$scope.$root.playlist.push(track);
					}*/
				 },
				function(){ $(".addtoplaylist .alert-info.hide").removeClass("hide"); });
		}

  $scope.ok = function () {
    
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});






