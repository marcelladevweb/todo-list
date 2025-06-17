const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const toggleThemeBtn = document.getElementById('toggle-theme');

// Recupera tarefas ao carregar
window.addEventListener('load', () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => createTask(task.text, task.done));
});

// Adiciona tarefa
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;
  createTask(taskText);
  taskInput.value = '';
  saveTasks();
});

// Pressionar Enter também adiciona
taskInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') addTaskBtn.click();
});

// Alternar tema
toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  toggleThemeBtn.textContent =
    document.body.classList.contains('dark-mode') ? '☀️ Modo Claro' : '🌙 Modo Escuro';
});

// Cria e insere tarefa
function createTask(text, done = false) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${text}</span>
    <button class="delete-btn">🗑️</button>
  `;

  if (done) li.classList.add('done');

  li.addEventListener('click', () => {
    li.classList.toggle('done');
    saveTasks();
  });

  li.querySelector('.delete-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  taskList.appendChild(li);
}

// Salvar tarefas
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#task-list li').forEach(li => {
    tasks.push({
      text: li.querySelector('span').textContent,
      done: li.classList.contains('done')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}