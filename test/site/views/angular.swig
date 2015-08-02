{% raw %}
<!DOCTYPE html>
<html lang="en" ng-app="cucumberApp">
<head>
  <title>My Angular App</title>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
  <script>
    var cucumberApp = angular.module('cucumberApp', []);

    cucumberApp.controller('TestCtrl', function ($scope, $http) {
      $scope.items = [
        'First',
        'Items'
      ];
      $scope.addItem = function() {
        $http.get('angular/data').success(function(data) {
          $scope.items.push(data);
        });
      };
    });
  </script>
</head>
<body ng-controller="TestCtrl">

<button ng-click="addItem()">Click me</button>
<ul>
  <li ng-repeat="item in items track by $index">
    <span>{{ item }}</span>
  </li>
</ul>

</body>
</html>
{% endraw %}
