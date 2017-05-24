angular.module('emailApp', ['instructions'])
    .controller('emailController', emailController)
    .filter('trust', ['$sce',function($sce) {
        return function(value, type) {
        return $sce.trustAs(type || 'html', value);
    }
}]);

emailController.$inject = ['$filter', '$scope'];

function emailController($filter, $scope) {
        $scope.today = $filter('date')(new Date(), 'MM/dd/yy');
        $scope.lkbkCatId = [];
        $scope.ghCatId = [];
        $scope.sbCatId = [];
        $scope.ptCatId = [];
        $scope.addPatch = [];
        $scope.URI = "http://wn.ref1.nmg";
        $scope.finalURL = "http://www.neimanmarcus.com";
        $scope.instructionsToggle = false;


        $scope.createPatch = function() {
            $scope.addPatch.push({
                patch: $scope.patchName,
                date: $scope.patchDate,
                time: $scope.patchTime,
                folder: $scope.patchFolder,
                merchant: $scope.patchMerchant
            });         
            $scope.addPatch[0].date = $filter('date')($scope.addPatch[0].date, 'MM/dd/yy');  
            $scope.addPatch[0].time = $filter('date')($scope.addPatch[0].time, 'shortTime'); 
        }

        $scope.approvals = function() {
            d = new Date();
            d.setHours(d.getHours() + 2);
            d = $filter('date')(d, 'shortTime');
            if (d > '5:00 PM') {
                d = 'ASAP';
            }
            return d;
        } 

        $scope.addLookbook = function() {
            console.log('addLookbook(); activated');
            $scope.lkbkCatId.push({
                item: $scope.lkbkCatIdModel
            });
            console.log('lkbkCatId.item ' + $scope.lkbkCatId.item)
            $scope.lkbkCatIdModel = "";
        }
        $scope.addGHCat = function() {
            $scope.ghCatId.push({
                item: $scope.ghCatIdModel
            });
            $scope.ghCatIdModel = "";
        };
        $scope.addSBCat = function() {
            $scope.sbCatId.push({
                item: $scope.sbCatIdModel
            });
            $scope.sbCatIdModel = "";
        };
        $scope.addPTCat = function() {
            $scope.ptCatId.push({
                item: $scope.ptCatIdModel
            });
            $scope.ptCatIdModel = "";
        };
};





