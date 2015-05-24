app.controller("userController", function ($scope, $location, $route,
                                           authentication, notifyService) {
    var ClearData = function () {
        $scope.loginData = "";
        $scope.registerData = "";
        $scope.passwordData = "";
    };

    $scope.login = function () {
        authentication.login($scope.loginData)
            .success(function (serverData) {
                notifyService.showInfo("Successful Login!");
                authentication.setCredentials(serverData);
                ClearData();
                $route.reload();
            }).error(function (serverError) {
                notifyService.showError('Unsuccessful Login!',serverError)
            });
    };

    $scope.register = function () {
        authentication.register($scope.registerData)
            .success(function (serverData) {
                notifyService.showInfo("Successful Register!");
                authentication.setCredentials(serverData);
                ClearData();
                $route.reload();
            }).error(function (serverError) {
                notifyService.showError('Unsuccessful Register!',serverError)
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

    $scope.editProfile = function () {
        var data = {
            name: $scope.userInfo.name,
            email: $scope.userInfo.email,
            gender: $scope.userInfo.gender
        };
        if($scope.userInfo.currentCoverImg && $scope.userInfo.currentCoverImg.size > 1024000 ){
            notifyService.showError("Max Cover Image Size Is 1024kb!")
        }
        if($scope.userInfo.currentAvatarImg && $scope.userInfo.currentAvatarImg.size > 128000){
            notifyService.showError("Max Cover Image Size Is 128kb!")
        }
        if($scope.userInfo.currentAvatarImg){
            data.profileImageData = $scope.userInfo.currentAvatarImg.data;
        }else{
            data.profileImageData = $scope.userInfo.profileImageData
        }
        if($scope.userInfo.currentCoverImg){
            data.coverImageData = $scope.userInfo.currentCoverImg.data;
        }else{
            data.coverImageData = $scope.userInfo.coverImageData
        }
        console.log(data);
        authentication.editProfile(data)
            .success(function () {
                notifyService.showInfo("Successful Update Profile!");
                ClearData();
                $location.path('/');
            }).error(function (serverError) {
                notifyService.showError("Unsuccessful Change Your Profile!", serverError)
            })
    };

    $scope.logout = function () {
        authentication.logout()
            .success(function (serverInfo) {
                console.log(serverInfo);
                notifyService.showInfo("Successful Logout!");
                ClearData();
                authentication.clearCredentials();
                $location.path('/home')
            }).error(function (error) {
                notifyService.showError("Unsuccessful Logout!", error);
            })

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