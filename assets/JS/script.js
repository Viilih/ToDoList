const inputTask = document.querySelector('#inputTask');
const addTask = document.querySelector('.addTask');
const taskList = document.querySelector('#taskList');

inputTask.addEventListener('keypress', e => {
	if (e.keyCode === 13) {
		if (!inputTask.value) return;
		let task = {
			name: inputTask.value,
			id: idGenerator(),
		};
		// Add the task on the ul
		addTasks(task);
		inputTask.value = '';
	}
});

addTask.addEventListener('click', e => {
	if (!inputTask.value) return;
	let task = {
		name: inputTask.value,
		id: idGenerator(),
	};
	// Add the task on the ul
	addTasks(task);
	inputTask.value = '';
});

function idGenerator() {
	return Math.floor(Math.random() * 3000);
}

// Function to put the task on the HTML
// Lógica para adicionar as tarefas :
// Já possuo a ul, basta criar os seguintes componentes: li --> span --> div(btns) --> button (btnAction edit/delete) --> i
function addTasks(task) {
	let li = createTagLi(task);
	taskList.appendChild(li);
}

function createTagLi(task) {
	let li = document.createElement('li');

	// Creating the span element
	let span = document.createElement('span');
	span.classList.add('taskText');
	span.innerHTML = task.name;

	// Creating the div element
	let div = document.createElement('div');
	div.classList.add('btns');

	// Creating the edit Button element
	let editButton = document.createElement('button');
	editButton.classList.add('btnAction');
	editButton.classList.add('edit');
	editButton.innerHTML = '<i class="fa fa-pencil"></i>';

	//Make the edit button edit the task
	// get the id in order to get the specific task to edit/delete
	editButton.setAttribute('onclick', 'edit(' + task.id + ')');

	// Creating the delete Button element

	let delButton = document.createElement('button');
	delButton.classList.add('btnAction');
	delButton.classList.add('delete');
	delButton.innerHTML = '<i class="fa fa-trash"></i>';

	//Make the delete button delete the task
	// get the id in order to get the specific task to edit/delete
	delButton.setAttribute('onclick', 'del(' + task.id + ')');

	// Putting the buttons inside the div
	div.appendChild(editButton);
	div.appendChild(delButton);

	//Putting the span and div elements inside li element
	li.appendChild(span);
	li.appendChild(div);
	li.classList.add('tasks');

	return li;
}

function edit(taskId) {
	alert(taskId);
}

function del(taskId) {
	alert(taskId);
}
