app.controller('menuController',function ($scope, $log) {
  
$scope.playlists = [

    {
      id : 1,
      name : "Playlist 1"
    },

    {
      id : 2,
      name : "Playlist 2"
    },
    {
      id : 3,
      name : "Playlist 3"
    }

  ];

   $scope.tags = [
    { text: 'Tag1' }
  ];


  $scope.isCollapsed = true;
  $scope.isFocused = false;

  $scope.styleIconTag = {
    color : 'white'
  };

  $scope.changeColor = function(){
    if($scope.styleIconTag.color == 'white'){
      $scope.isFocused = true;
      $scope.styleIconTag.color = '#7B9EDF';
    }
    else{
      $scope.styleIconTag.color = 'white';
    }
  }

});