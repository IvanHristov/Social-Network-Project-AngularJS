app.controller("userController", function ($scope, $location, $route,
                                           authentication, notifyService) {
    var ClearData = function () {
        $scope.loginData = "";
        $scope.registerData = "";
        $scope.userData = "";
        $scope.passwordData = "";
    };

    $scope.login = function () {
        authentication.login($scope.loginData)
            .success(function (serverData) {
                notifyService.showInfo("Successful Login!");
                authentication.setCredentials(serverData);
                ClearData();
                $location.path('/user/home');
            }).error(function (serverError) {
                notifyService.showError('Fail to login',serverError)
            });
    };

    $scope.register = function () {
        authentication.register($scope.registerData)
            .success(function (serverData) {
                notifyService.showInfo("Successful Register!");
                authentication.setCredentials(serverData);
                ClearData();
                $location.path('/user/home');
            }).error(function (serverError) {
                notifyService.showError('',serverError)
            });
    };
    //
    //$scope.changePassword = function () {
    //    authentication.ChangePassword($scope.passwordData,
    //        function () {
    //            notifyService.showInfo("Successful Password Change!");
    //            ClearData();
    //            $location.path('/user/home');
    //        },
    //        function (serverError) {
    //            notifyService.showError("Unsuccessful Password Change!", serverError)
    //        });
    //};

    $scope.logout = function () {
        notifyService.showInfo("Successful Logout!");
        ClearData();
        authentication.ClearCredentials();
        mainData.clearParams();
        $route.reload();
    };
});