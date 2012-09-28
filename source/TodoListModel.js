var TodoListModel = ({
	initialize: function(persistedTodoList) {
		if (persistedTodoList===null || typeof persistedTodoList === "undefined" || persistedTodoList.length == 0) {
		    	this.todoList = [];
		} else {
			this.todoList = persistedTodoList;
		}
	},
	addTodoEntry: function(title, description) {
		if (title != "") {
			this.todoList.push({
				title:title, 
				description:description
			});
		}
	},
	getTodoEntryByIndex: function(index) {
		return this.todoList[index];
	},
	setTodoEntryByIndex: function(todoEntry, index) {
		this.todoList[index] = todoEntry;
	},
	deleteTodoEntryByIndex: function(index) {
		this.todoList.splice(index, 1);
	},
	getSize: function() {
		return this.todoList.length;
	},
	getTodoList: function() {
		return this.todoList;
	}
});
