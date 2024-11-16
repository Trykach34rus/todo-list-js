const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-btn')
const todoTemplate = document.querySelector('.todo-template')
const todoList = document.querySelector('.todo-list')
const todoItemInput = document.querySelector('.todo-time-input')

let todoArray = getList()

renderList(todoArray)
function renderList(arr) {
	todoList.innerHTML = null
	todoItemInput.innerHTML = null
	arr.forEach(item => {
		const clone = todoTemplate.content.cloneNode(true)
		const todoItem = clone.querySelector('.todo-item')
		const deleteBtn = clone.querySelector('.todo-delete')
		const todoText = clone.querySelector('.todo-text')
		const completeBtn = clone.querySelector('.todo-complete')
		const todoTime = clone.querySelector('.todo-time')
		if (item.complete) {
			todoItem.classList.add('todo-item-complete')
		}

		todoText.innerHTML = item.title
		todoTime.innerHTML = item.time
		deleteBtn.onclick = () => deleteTodo(item.id)
		completeBtn.onclick = () => completeTodo(item.id)
		todoList.append(clone)
	})
	saveList()
}

function deleteTodo(id) {
	todoArray = todoArray.filter(item => item.id !== id)
	renderList(todoArray)
}
function completeTodo(id) {
	const item = todoArray.find(item => item.id === id)
	item.complete = true
	renderList(todoArray)
}

function addTodo() {
	const text = todoInput.value
	const time = todoItemInput.value
	todoArray.push({
		id: Date.now(),
		title: text,
		complete: false,
		time: time,
	})
	renderList(todoArray)
}
function saveList() {
	const jsonArray = JSON.stringify(todoArray)
	localStorage.setItem('todoArray', jsonArray)
}
function getList() {
	const saveArray = localStorage.getItem('todoArray')
	if (saveArray) {
		return JSON.parse(saveArray)
	} else {
		return []
	}
}
todoButton.onclick = addTodo
