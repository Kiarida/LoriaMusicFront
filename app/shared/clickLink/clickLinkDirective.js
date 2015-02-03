app.directive('clickLink', ['$location', function ($location) {

    return {
    	template: '<a href=""><i tooltip="Back to home or playlist" tooltip-placement="bottom" class="icon-cancel-circle"></i></a>',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                scope.$apply(function () {
                    $location.path(attrs.clickLink);
                });
            });
        }
    }

}]);
