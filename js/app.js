var app = angular.module('SocialNetwork', ['ngRoute']);

app.constant('BASE_URL_SERVICE', 'http://softuni-social-network.azurewebsites.net/api/');

app.config(function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'partial/login.html',
            controller: 'userController'
        })
        .when('/register', {
            templateUrl: 'partial/register.html',
            controller: 'userController'
        })
        .when('/', {
            templateUrl: 'partial/default-home.html',
            controller: 'MainController'
        });
    });
