var TodoListDAO = ({
	storageKey: "simple.todo.list",
	loadTodoList: function() {
		var todoList = localStorage.getItem(this.storageKey);
		if(typeof todoList === "string"){
			return JSON.parse(todoList);
		}
	},
	persistTodoList: function(todoList) {
		var temp = JSON.stringify(todoList);
		localStorage.setItem(this.storageKey, temp);
	}
});
