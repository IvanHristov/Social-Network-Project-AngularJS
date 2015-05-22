var app = angular.module('SocialNetwork', ['ngRoute']);

app.constant('BASE_URL_SERVICE', 'http://softuni-social-network.azurewebsites.net/api/');
app.constant('DEFAULT_USER_AVATAR', 'img/user-3995d1ed5f9b6ea6ef9c7bc9ead47415.jpg');
app.constant('DEFAULT_USER_COVER_PHOTO', 'img/default-cover-image.jpg');

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partial/homeScreen.html',
            controller: 'userController'
        }).when('/home', {
            redirectTo: '/'
        }).when('/user/:username',{
            templateUrl: 'partial/userWall.html',
            controller: 'mainController'
        })
});

