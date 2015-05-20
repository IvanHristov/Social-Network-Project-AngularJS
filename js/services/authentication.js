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

    service.isLogged = function(logged){
        if(!localStorage.username){
            logged(false);
            return;
        }

        $http.get(BASE_URL_SERVICE + 'me',{
            headers: service.getHeaders()
        })
            .success(function(serverData){
                if(serverData.username == localStorage.username){
                    logged(true);
                }else{
                    logged(false);
                }
            })
            .error(function(){
                logged(false);
            });
    };

    return service;
});