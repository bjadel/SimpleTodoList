enyo.kind({
	name: "EditTodoEntry",
	kind: "Panels",
	realtimeFit: true,
	classes: "enyo-border-box",
	todoEntryIndex: "",
	title: "",
	description: "",
	events: {
		onChange: ""
	},
	components: [
		{kind: "Scroller", horizontal:"hidden", fit: true, touch: true, classes: "scroller-sample-scroller enyo-fit", components: [
			{kind: "FittableRows", classes: "edit-todo-entry-content", components: [
				{classes: "edit-input-label", content: "Titel"},
				{kind: "onyx.InputDecorator", alwaysLooksFocused: true, components: [
					{kind: "onyx.Input", name: "todoEntryTitle", placeholder: "Titel", onchange:"titleInputChanged"}
				]},
				{classes: "edit-input-label", content: "Beschreibung"},
				{kind: "onyx.InputDecorator", alwaysLooksFocused: true, components: [
					{kind: "onyx.TextArea", name: "todoEntryDescription", allowHTML: true, placeholder: "Beschreibung", onchange:"descriptionInputChanged"}
				]},
				{tag: "p"},
				{kind: "onyx.Button", name:"saveButtion", content: "Speichern", classes: "onyx-affirmative", ontap:"saveTodoEntry"}
			]}
		]}
	],
	create: function(inControl) {
		this.inherited(arguments);
	},
	setTodoEntryIndex: function(index) {
		this.todoEntryIndex = index;
		var todoEntry = TodoListModel.getTodoEntryByIndex(index);
		this.title = todoEntry.title;
		this.description = todoEntry.description;
		this.$.todoEntryTitle.setValue(todoEntry.title);
		this.$.todoEntryDescription.setValue(todoEntry.description);
	},
	saveTodoEntry: function(inSender, inEvent) {
		var todoEntry = TodoListModel.getTodoEntryByIndex(this.todoEntryIndex);
		todoEntry.title = this.title;
		todoEntry.description = this.description;
		var todoList = TodoListModel.getTodoList();
		TodoListDAO.persistTodoList(todoList);
		this.doChange();
	},
	titleInputChanged: function(inSender, inEvent) {
		this.title = inSender.getValue();
	},
	descriptionInputChanged: function(inSender, inEvent) {
		this.description = inSender.getValue();
	}
})
