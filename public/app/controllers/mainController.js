const controllerModule = angular.module('controllerModule', []);

controllerModule.controller('userController', ['$scope', '$interval', '$http', '$state', 'mainAjax', function ($scope, $interval, $http, $state, mainAjax) {

    $scope.username = '';
    $scope.publicRepo = '';
    $scope.search = async () => {
        try {
            let reqUrl = `/user/getInfo/${$scope.formData.username}`;
            let reqData = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application / json'
                },
            };
            let result = await mainAjax.requestResolver(reqUrl, reqData);
            let data = await result.json();
            $scope.repository = data;
            $scope.username = $scope.repository.data.gitHubUsername;
            $scope.publicRepo = $scope.repository.data.publicRepositories;
            $scope.$apply()
        } catch (e) {
            console.log(e);
        }
    }
}]);