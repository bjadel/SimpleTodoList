enyo.kind({
	name: "App",
	kind: "Panels",
	classes: "app enyo-unselectable",
	fit: true,
	realtimeFit: true,
	arrangerKind: "CollapsingArranger",
	components:[
		{kind: "FittableRows", classes: "left", components: [
			{kind: "onyx.Toolbar", style: "overflow: initial;", components: [
				{name: "title", content: "Todo Liste"}
			]},
			{kind: "FittableColumns", components: [
				{kind:"onyx.Button", content: "Hinzufügen", classes: "onyx-affirmative", ontap:"addTodoEntry"},
				{kind:"onyx.Button", content: "Alle löschen", classes: "onyx-negative", ontap:"deleteAllTodoEntries"}
			]},
			{kind: "TodoList", name: "todoList", onSelect: "todoEntrySelected", fit: true}
		]},
		{kind: "FittableRows", components: [
			{kind: "FittableColumns", noStretch: true, classes: "onyx-toolbar onyx-toolbar-inline", components: [
				{kind: "onyx.Grabber"}
			]},
			{kind: "Panels", 
				name: "contentPanels", 
				draggable: false, 
				arrangerKind: "CardSlideInArranger", 
				fit:true, 
				realtimeFit: true, 
				classes: "panels-sample-panels enyo-border-box", 
				components: [
					{kind: "DisplayTodoEntry", name: "displayTodoEntry", fit: true, onEdit: "displayEditPanel", onDelete: "deleteTodoEntry"},
					{kind: "EditTodoEntry", name: "editTodoEntry", fit: true, onChange: "refreshList"},
					{kind: "CreateTodoEntry", name: "createTodoEntry", fit: true, onChange: "refreshList"}
			]}
		]}
	],
	create: function() {
		this.inherited(arguments);
	},
	addTodoEntry: function(inSender, inEvent) {
		this.$.contentPanels.setIndex(2);
		this.setIndex(1);
	},
	deleteTodoEntry: function(inSender, inEvent) {
		this.setIndex(0);
		TodoListModel.deleteTodoEntryByIndex(inEvent.originator.todoEntryIndex);
		var todoList = TodoListModel.getTodoList();
		TodoListDAO.persistTodoList(todoList);
		this.$.todoList.rerender();
	},
	deleteAllTodoEntries: function(inSender, inEvent) {
		this.setIndex(0);
		TodoListModel.initialize([]);
		TodoListDAO.persistTodoList([]);
		this.$.todoList.rerender();
	},
	todoEntrySelected: function(inSender, inEvent) {
		this.$.contentPanels.setIndex(0);
		this.$.displayTodoEntry.setTodoEntryIndex(inEvent.index);
		this.setIndex(1);
	},
	refreshList: function(inSender, inEvent) {
		this.setIndex(0);
		this.$.todoList.rerender();
	},
	displayEditPanel: function(inSender, inEvent) {
		this.$.contentPanels.setIndex(1);
		this.$.editTodoEntry.setTodoEntryIndex(inEvent.originator.todoEntryIndex);
		this.setIndex(1);
	}
});
