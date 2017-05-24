angular.module('instructions', [])
    .directive('instructions', function() {
    return {

        scope: {
            instructionsToggle: '&',
        },
        template: [
            '<div ng-hide="$parent.instructionsToggle" style="font-family: Arial, sans-serif; font-size: 14px;">',
                '<p style="font-weight: bold;">The <span style="color:red;">{{ $parent.addPatch[0].date }} {{ $parent.addPatch[0].patch }} Lookbook</span> has been posted online at:</p>',
                '<p ng-repeat="item in $parent.lkbkCatId">',
                    '<a href="{{$scope.finalURL}}/i/{{item.item}}/c.cat?cacheCheckSeconds=1" style="margin-bottom:20px;">{{ finalURL }}/i/{{ item.item }}/c.cat?cacheCheckSeconds=1</a>',
                '</p>',
                '<br/>',
                '<p style="line-height: 175%;">Please proof it and <span style="color:red;">respond</span> with changes or your approval by <span style="color:red;">{{ approvals() }}, {{ today }}<span></p>',
                '<br/>',
            '</div>',
            '<div ng-hide="!$parent.instructionsToggle" style="font-family: Arial, sans-serif; font-size: 10px;">',
                '<p>Producers, could you please schedule the following {{$scope.addPatch[0].patchName }} Lookbook for deployment <span style="font-weight:bold; color: red;">{{ addPatch[0].date }}</span> at <span style="font-weight:bold; color: red;">{{ addPatch[0].time }}</span>.</p>',
                '<p>Thank you!</p>',
                '<br/>',
            '</div>' 
        ].join(''),
        controller: 'emailController',
    };
});






