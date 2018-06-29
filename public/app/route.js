const routing = angular.module('routing', ['ui.router']);
routing.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state(" ", {
      url: "/",
      templateUrl: "./views/user.html",
      controller: "userController"
    })
});
