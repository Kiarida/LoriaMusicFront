app.controller('ModalDemoCtrl', function ($rootScope, $scope, $modal, $log, $resource, routeRessource, Auth) {
  $scope.open = function (size, playlist) {

    var modalInstance = $modal.open({
      template: '<div class="modal-header"><h3 class="modal-title">Confirmation</h3></div><div class="modal-body">Are you sure you want to delete this playlist ?<br>The deletion will be permanent.</div><div class="modal-footer"><button class="btn btn-warning primary" ng-click="ok()">Delete</button><button class="btn btn-warning" ng-click="cancel()">Cancel</button></div>',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        playlist :function(){
          return playlist;
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

app.controller('ModalInstanceCtrl', function ($rootScope, $scope, $modalInstance, $resource, routeRessource,Auth, playlist) {



    var PlaylistUser = $resource(routeRessource.PlaylistUser,{},
  {
    delete: {
      method: 'DELETE',
      isArray: true,
      headers: {
        "Authorization" : 'WSSE profile="UsernameToken"',
        "X-wsse" : Auth.getUser().wsse
      },
      params:{iduser: "@iduser", idplaylist:"@idplaylist"}
    },
  });
  $scope.deletePlaylist = function(){
    var userPlaylist = PlaylistUser.delete({iduser: Auth.getUser().id, idplaylist: playlist.id});
    $rootScope.userPlaylist.splice($rootScope.userPlaylist.indexOf(playlist),1);
  }

  $scope.ok = function () {
    $scope.deletePlaylist(playlist)
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});