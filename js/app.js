var app = angular.module('SocialNetwork', ['ngRoute']);

app.constant('BASE_URL_SERVICE', 'http://softuni-social-network.azurewebsites.net/api/');
app.constant('DEFAULT_USER_AVATAR', 'img/user-3995d1ed5f9b6ea6ef9c7bc9ead47415.jpg');
app.constant('DEFAULT_USER_COVER_PHOTO', 'img/default-cover-image.jpg');

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partial/homeScreen.html',
            controller: 'userController'
        }).when('/user/:username',{
            templateUrl: 'partial/userWall.html',
            controller: 'mainController'
        }).when('/user/:username/friends',{
            templateUrl: 'partial/userFriendWall.html',
            controller: 'mainController'
        }).when('/user/:username/myFriends',{
            templateUrl: 'partial/myFriendWall.html',
            controller: 'mainController'
        }).when('/profile',{
            templateUrl: 'partial/editProfile.html',
            controller: 'mainController'
        }).when('/profile/password',{
            templateUrl: 'partial/changePassword.html',
            controller: 'mainController'
        }).otherwise({
            redirectTo: '/'
        })
});
app.run(function($rootScope, $location, authentication) {
    $rootScope.$on("$locationChangeStart", function (event, next, current) {
        authentication.isLogged(function(isLogged){

            if(($location.path().indexOf('user') != -1 || $location.path().indexOf('/profile') != -1) && !isLogged){
                $location.path('/');
            }
        });
    });
});
