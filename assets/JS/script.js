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
		addTasks(task, true);
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
	addTasks(task, true);
	inputTask.value = '';
});

function idGenerator() {
	return Math.floor(Math.random() * 3000);
}

// Function to put the task on the HTML
// Lógica para adicionar as tarefas :
// Já possuo a ul, basta criar os seguintes componentes: li --> span --> div(btns) --> button (btnAction edit/delete) --> i
function addTasks(task, save = false) {
	// save = false
	let li = createTagLi(task);
	taskList.appendChild(li);
	if (save) saveTasks();
}

function createTagLi(task) {
	let li = document.createElement('li');
	li.id = task.id;

	// Creating the span element
	let span = document.createElement('span');
	span.classList.add('taskText');
	span.innerHTML = task.name;

	// Creating the div element
	let div = document.createElement('div');
	div.classList.add('btns');

	// Creating the edit Button element
	let doButton = document.createElement('button');
	doButton.classList.add('btnAction');
	doButton.classList.add('do');
	doButton.innerHTML = '<i class="fa fa-check"></i>';

	//Make the done button done the task
	// get the id in order to get the specific task to edit/delete
	doButton.setAttribute('onclick', 'done(' + task.id + ')');

	// Creating the delete Button element

	let delButton = document.createElement('button');
	delButton.classList.add('btnAction');
	delButton.classList.add('delete');
	delButton.innerHTML = '<i class="fa fa-trash"></i>';

	//Make the delete button delete the task
	// get the id in order to get the specific task to edit/delete
	delButton.setAttribute('onclick', 'del(' + task.id + ')');

	// Putting the buttons inside the div
	div.appendChild(doButton);
	div.appendChild(delButton);

	//Putting the span and div elements inside li element
	li.appendChild(span);
	li.appendChild(div);
	li.classList.add('tasks');

	return li;
}

function done(taskId) {
	let li = document.getElementById('' + taskId + '');
	let task = li.firstChild;
	task.classList.toggle('completed');
}

function del(taskId) {
	let li = document.getElementById('' + taskId + '');
	taskList.removeChild(li);
	saveTasks();
}

function saveTasks() {
	const liTasks = taskList.querySelectorAll('li');
	const listOfTasks = [];

	for (let task of liTasks) {
		let liText = task.innerText;
		listOfTasks.push(liText);
	}

	const tasksJSON = JSON.stringify(listOfTasks);
	if (tasksJSON) {
		localStorage.setItem('tasksJSON', tasksJSON);
	}
}

function addSaveTasks() {
	const tasks = localStorage.getItem('tasksJSON');
	const listOfTasks = JSON.parse(tasks);
	for (let taskName of listOfTasks) {
		const task = {
			name: taskName,
			id: idGenerator(),
		};
		createTagLi(task);

		addTasks(task, false);
	}
	// for (let task of listOfTasks) {
	//
	// }
}

addSaveTasks();
