app.factory('authentication', function adsData($http, BASE_URL_SERVICE) {
    var service = {};

    var serviceUrl = BASE_URL_SERVICE + 'users/';

    service.login = function(loginData){
        return $http.post(serviceUrl + 'Login', loginData);
    };

    service.register = function(registerData){
        return $http.post(serviceUrl + 'Register', registerData);
    };

    service.logout = function(){
        return $http.post(serviceUrl + 'Logout', null);
    };

    service.setCredentials = function (serverData) {
        localStorage['accessToken'] = serverData.access_token;
        localStorage['username'] = serverData.userName;
    };

    service.getUsername = function () {
        return localStorage['username'];
    };

    service.clearCredentials = function () {
        localStorage.clear();
    };

    service.getHeaders = function() {
        return {
            Authorization: "Bearer " + localStorage['accessToken']
        };
    };

    service.isLoggedIn = function () {
        return localStorage['accessToken'];
    };

    return service;
});