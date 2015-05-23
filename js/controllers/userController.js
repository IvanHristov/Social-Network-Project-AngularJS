app.controller("userController", function ($scope, $location, $route,
                                           authentication, notifyService) {
    var ClearData = function () {
        $scope.loginData = "";
        $scope.registerData = "";
        //$scope.userData = "";
        //$scope.passwordData = "";
    };

    $scope.login = function () {
        authentication.login($scope.loginData)
            .success(function (serverData) {
                notifyService.showInfo("Successful Login!");
                authentication.setCredentials(serverData);
                ClearData();
                $location.path('/home')
            }).error(function (serverError) {
                notifyService.showError('',serverError)
            });
    };

    $scope.register = function () {
        authentication.register($scope.registerData)
            .success(function (serverData) {
                notifyService.showInfo("Successful Register!");
                authentication.setCredentials(serverData);
                ClearData();
                $location.path('/home')
            }).error(function (serverError) {
                notifyService.showError('',serverError)
            });
    };

    authentication.isLogged(function (isLogged) {
        $scope.isLoggedIn = isLogged;
    });


    $scope.changePassword = function () {
        authentication.changePassword($scope.passwordData)
            .success(function () {
                notifyService.showInfo("Successful Password Change!");
                ClearData();
                $location.path('/');
            }).error(function (serverError) {
                notifyService.showError("Unsuccessful Password Change!", serverError)
            })
    };

    $scope.logout = function () {
        notifyService.showInfo("Successful Logout!");
        ClearData();
        authentication.clearCredentials();
        $location.path('/')
    };
    //
    //$scope.showLogin = function() {
    //    $("#login-form").delay(100).fadeIn(100);
    //    $("#register-form").fadeOut(100);
    //    $('#register-form-link').removeClass('active');
    //    $('#login-form-link').addClass('active');
    //    //e.preventDefault();
    //};
    //
    //$scope.showRegister = function(){
    //    $("#register-form").delay(100).fadeIn(100);
    //    $("#login-form").fadeOut(100);
    //    $('#login-form-link').removeClass('active');
    //    $('#register-form-link').addClass('active');
    //    e.preventDefault();
    //};

    $('#login-form-link').click(function(e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function(e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
});