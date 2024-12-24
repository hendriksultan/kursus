// Mendapatkan elemen dari DOM
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Fungsi untuk memuat daftar tugas dari localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

// Fungsi untuk menyimpan daftar tugas ke localStorage
function saveTasks() {
    const tasks = Array.from(taskList.children).map(taskItem => taskItem.querySelector('.task-text').textContent.trim());
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Fungsi untuk menambahkan tugas ke DOM
function addTaskToDOM(taskText) {
    // Cek apakah tugas sudah ada
    const existingTasks = Array.from(taskList.children).map(taskItem => taskItem.querySelector('.task-text').textContent.trim());
    if (existingTasks.includes(taskText)) return;

    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item'); // Tambahkan class untuk styling

    // Tambahkan nomor tugas
    const taskSpan = document.createElement('span');
    taskSpan.classList.add('task-text');
    taskSpan.textContent = taskText;
    taskItem.appendChild(taskSpan);

    // Tambahkan tombol hapus
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => {
        taskItem.remove();
        saveTasks();
    });

    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
}

// Event listener untuk menambahkan tugas baru melalui form
taskForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Mencegah refresh halaman
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTaskToDOM(taskText);
        saveTasks();
        taskInput.value = ''; // Kosongkan input
        addTaskButton.disabled = true; // Tetap nonaktifkan tombol setelah menambahkan tugas
    }
});

// Validasi input dan tombol
taskInput.addEventListener('input', () => {
    addTaskButton.disabled = taskInput.value.trim() === '';
});

// Memuat tugas saat halaman dimuat
loadTasks();
