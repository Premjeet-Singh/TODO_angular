var app = angular.module('myapp', ["ngStorage"]);
app.controller('TodoController', function($scope) {
	// function TodoController ($scope) {
	$scope.appTitle = "Todo List Using Angular";
	$scope.appHeadline = "All added list will save to local storage";
	$scope.saved = localStorage.getItem('todos');
	$scope.todos = (localStorage.getItem('todos')!==null) ? JSON.parse($scope.saved) : [ ];
	localStorage.setItem('todos', JSON.stringify($scope.todos));

	$scope.addTodo = function() {
		$scope.todos.push({
			text: $scope.todoText,
			done: false
		});
		$scope.todoText = ''; //clear the input after adding
		localStorage.setItem('todos', JSON.stringify($scope.todos));
	};

	$scope.remaining = function() {
		var count = 0;
		angular.forEach($scope.todos, function(todo){
			count+= todo.done ? 0 : 1;
		});
		return count;
	};

	$scope.archive = function() {
		var oldTodos = $scope.todos;
		$scope.todos = [];
		angular.forEach(oldTodos, function(todo){
			if (!todo.done)
				$scope.todos.push(todo);
		});
		localStorage.setItem('todos', JSON.stringify($scope.todos));
	};
});