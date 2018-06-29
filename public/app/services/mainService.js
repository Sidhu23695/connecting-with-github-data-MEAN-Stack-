angular.module('mainService', [])

    .factory('mainAjax', ['$http', function ($http) {
        return {
            requestResolver: (reqUrl, reqData) => {
                return fetch(reqUrl, reqData);
            },
        };
    }]);