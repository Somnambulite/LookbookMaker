describe('emailController', function() {

  beforeEach(module('emailApp'));

  it('should create a PATCH model', inject(function($controller) {
    var scope = {};
    var ctrl = $controller('emailController', {$scope: scope});

    expect(scope.addPatch.length).toBe(0);
  }));

});