app.controller('MainController', function ($scope, $location, authentication, notifyService) {
    var path = $location.path();
    if ((path.indexOf("user") != -1) && !authentication.isLoggedIn()) {
        $location.path('/');
    }
});