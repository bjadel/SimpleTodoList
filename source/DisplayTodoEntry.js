enyo.kind({
	name: "DisplayTodoEntry",
	kind: "Panels",
	realtimeFit: true,
	classes: "enyo-border-box",
	todoEntryIndex: "",
	events: {
		onEdit: "",
		onDelete: ""
	},
	components: [
		{kind: "Scroller", horizontal:"hidden", fit: true, touch: true, classes: "scroller-sample-scroller enyo-fit", components: [
			{kind: "FittableColumns", components: [
				{kind:"onyx.Button", content: "Bearbeiten", classes: "onyx-affirmative", ontap:"editTodoEntry"},
				{kind:"onyx.Button", content: "Löschen", classes: "onyx-negative", ontap:"deleteTodoEntry"}
			]},
			{name: "displayTodoEntryContent", 
				classes: "display-todo-entry-content", 
				kind: "FittableRows", 
				components: [
					{name: "todoEntryTitle", tag: "h1"},
					{name: "todoEntryDescription", tag: "p"}
			]}
		]}
	],
	create: function(inControl) {
		this.inherited(arguments);
	},
	setTodoEntryIndex: function(index) {
		this.todoEntryIndex = index;
		var todoEntry = TodoListModel.getTodoEntryByIndex(index);
		this.$.todoEntryTitle.setContent(todoEntry.title);
		this.$.todoEntryDescription.setContent(todoEntry.description);
	},
	editTodoEntry: function(inSender, inEvent) {
		this.doEdit();
	},
	deleteTodoEntry: function(inSender, inEvent) {
		this.doDelete();
	}
})
