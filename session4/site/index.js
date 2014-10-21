var myApp = angular.module('myApp', []);

myApp.controller('myCtrl', function($scope, $http) {
	$scope.greeting = 'Hello from Angular';

	var getPromise = $http.get('/api')
		.then(function(response) {
			$scope.model = response.data;
		})
		.catch(function() {
			alert('oops!');
		});

	$scope.click = function() {
		getPromise.then(function() {
			$scope.model.students.push($scope.newStudent);
			$scope.newStudent = '';
		});
	};

	$scope.save = function() {
		getPromise.then(function() {
			$http.post('/api', $scope.model)
				.then(function() {
					alert('success');
				})
				.catch(function() {
					alert('bummer');
				});
		});
	};
});



