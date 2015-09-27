'use strict';

/**
 * @ngdoc function
 * @name propTypeMapApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the propTypeMapApp
 */
angular.module('propTypeMapApp')
  .controller('MainCtrl', function ($scope, $resource) {

    var src = $resource('https:/kenmorewa.data.socrata.com/resource/9uti-pxct.json/?id=:id',
              {id: "@id"}, //parameters default
              {
                ListSales: { method: "GET", params: {} },
                GetSale: { method: "GET", params: { id: '720319-0520' }, isArray:true },                            
              });

    src.GetSale({id: '720319-0520'}).$promise.then(function(sale) {
      // success
      $scope.sale = sale[0];
      if ($scope.sale.principal_use == 6) {
        $scope.sale.use == "single family residential";
      }
      if ($scope.sale.principal_use == 0) {
        $scope.sale.use == "single family residential";
      }
    }, function(errResponse) {
      // fail
      $scope.error = errResponse;
    });

    src.query().$promise.then(function(sales) {
      // success
      $scope.sales = sales;
    }, function(errResponse) {
      // fail
      $scope.error = errResponse;
    });

    
  });
