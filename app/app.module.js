var app= angular.module('PlayerApp',['ngRoute', 'ngResource', 'ui.bootstrap', 'ngTagsInput']);
app.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=0; i<total; i++)
      input.push(i);
    return input;
  };
});
app.filter('yearRange', function() {
  return function(input, total) {
    total = 1900 + parseInt(total);
    for (var i=1900; i<total; i++)
      input.push(i);
    return input;
  };
});