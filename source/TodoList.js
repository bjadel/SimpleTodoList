enyo.kind({
	name: "TodoList",
	kind: "Panels",
	realtimeFit: true,
	classes: "enyo-border-box",
	events: {
		onSelect: ""
	},
	components: [
		{kind: "List", fit: true, touch: true, onSetupItem: "setupItem", 
			components:	[
				{name: "item", classes: "item", ontap: "itemTap", components: [
					{name: "index", classes: "list-sample-index"},
					{kind: "FittableRows", components: [
					    {kind: "FittableColumns", components: [
	                        {kind: "Image", src: "assets/listicon.png"},
	                        {name: "todoEntryTitle", tag: "h4"}
                        ]},
						{name: "todoEntryDescription", tag: "p"}
					]}
				]}
			]
		}
	],
	create: function() {
		this.inherited(arguments);
		var todoList = TodoListDAO.loadTodoList();
		TodoListModel.initialize(todoList);
		this.$.list.setCount(TodoListModel.getSize());
		this.render();
	},
	setupItem: function(inSender, inIndex) {
		var i = inIndex.index;
		if (i < TodoListModel.getSize()) {
			var todoEntry = TodoListModel.getTodoEntryByIndex(i);
			// apply selection style if inSender (the list) indicates that this row is selected.
			this.$.item.addRemoveClass("onyx-selected", inSender.isSelected(i)); 
			if (todoEntry && todoEntry.title != "") {
				this.$.todoEntryTitle.setContent(todoEntry.title);
				this.$.todoEntryDescription.setContent(todoEntry.description);
				return true;
			} else {
				return false;
			}
		}
	},
	itemTap: function(inSender, inEvent) {
		this.doSelect(inEvent);
	},
	rerender: function() {
		this.$.list.setCount(TodoListModel.getSize());
		this.render();
	}
});
