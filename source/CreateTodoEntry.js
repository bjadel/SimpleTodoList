enyo.kind({
	name: "CreateTodoEntry",
	kind: "Panels",
	realtimeFit: true,
	classes: "enyo-border-box",
	title: "",
	description: "",
	events: {
		onChange: ""
	},
	components: [
		{kind: "Scroller", horizontal:"hidden", fit: true, touch: true, classes: "scroller-sample-scroller enyo-fit", components: [
			{kind: "FittableRows", components: [
				{classes: "onyx-sample-divider", content: "Titel"},
				{kind: "onyx.InputDecorator", alwaysLooksFocused: true, components: [
					{kind: "onyx.Input", placeholder: "Titel", onchange:"titleInputChanged"}
				]},
				{classes: "onyx-sample-divider", content: "Beschreibung"},
				{kind: "onyx.InputDecorator", alwaysLooksFocused: true, components: [
					{kind: "onyx.TextArea", allowHTML: true, placeholder: "Beschreibung", onchange:"descriptionInputChanged"}
				]},
				{tag: "p"},
				{kind: "onyx.Button", name:"saveButtion", content: "Speichern", classes: "onyx-affirmative", ontap:"saveTodoEntry"}
			]}
		]}
	],
	create: function(inControl) {
		this.inherited(arguments);
	},
	saveTodoEntry: function(inSender, inEvent) {
		TodoListModel.addTodoEntry(this.title, this.description);
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
