document.addEventListener('DOMContentLoaded', function () {
    let isEditMode = false;
    let edittingId;
    
    const tasks = [
        { id: 1, title: "Complete project report", description: "Prepare and submit the project report", dueDate: "2024-12-01", comments: [] },
        { id: 2, title: "Team Meeting", description: "Get ready for the season", dueDate: "2024-12-01", comments: [] },
        { id: 3, title: "Code Review", description: "Check partners code", dueDate: "2024-12-01", comments: [] },
        { id: 4, title: "Deploy", description: "Check deploy steps", dueDate: "2024-12-01", comments: [] }
    ];
    function loadTasks() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        tasks.forEach(function (task) {
            const taskCard = document.createElement('div');
            taskCard.className = 'col-md-4 mb-3';
            taskCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${task.title}</h5>
                        <p class="card-text">${task.description}</p>
                        <p class="card-text"><small class="text-muted">Due: ${task.dueDate}</small></p>
                        <h7>Comments:</h7>
                        <hr class="my-3">
                        <div class="comments">
                            ${task.comments.map((comment, index) => `
                                <div class="d-flex justify-content-between align-items-center">
                                    <small>${comment}</small>
                                    <button class="btn btn-danger btn-sm delete-comment" data-task-id="${task.id}" data-comment-index="${index}">Delete</button>
                                </div>
                                ${index < task.comments.length - 1 ? '<hr class="my-2">' : ''} 
                            `).join('')}
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button class="btn btn-secondary btn-sm edit-task" data-id="${task.id}">Edit</button>
                        <button class="btn btn-info btn-sm add-comment" data-id="${task.id}">Add Comment</button> 
                        <button class="btn btn-danger btn-sm delete-task" data-id="${task.id}">Delete</button>
                    </div>
                </div>
            `;
            taskList.appendChild(taskCard);
        });
    
        document.querySelectorAll('.edit-task').forEach(function (button) {
            button.addEventListener('click', handleEditTask);
        });
    
        document.querySelectorAll('.delete-task').forEach(function (button) {
            button.addEventListener('click', handleDeleteTask);
        });
    
        document.querySelectorAll('.add-comment').forEach(button => {
            button.addEventListener('click', function () {
                openCommentModal(button.getAttribute('data-id'));
            });
        });
    
        document.querySelectorAll('.delete-comment').forEach(button => {
            button.addEventListener('click', handleDeleteComment);
        });
    }

    // Función para abrir el modal de comentarios
    function openCommentModal(taskId) {
        document.getElementById('task-id-comment').value = taskId;
        const commentModal = new bootstrap.Modal(document.getElementById('commentModal'), {});
        commentModal.show();
    }

    // Función para agregar comentarios
    document.getElementById('comment-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const taskId = parseInt(document.getElementById('task-id-comment').value);
        const commentText = document.getElementById('task-comment').value;

        const task = tasks.find(t => t.id === taskId);
        task.comments.push(commentText);

        const commentModal = bootstrap.Modal.getInstance(document.getElementById('commentModal'));
        commentModal.hide();
        document.getElementById('comment-form').reset();
        
        loadTasks();
    });

    // Función para editar tareas
    function handleEditTask(event) {
        const taskId = parseInt(event.target.dataset.id);
        const task = tasks.find(t => t.id === taskId);
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-desc').value = task.description;
        document.getElementById('due-date').value = task.dueDate;
        isEditMode = true;
        edittingId = taskId;
        const modal = new bootstrap.Modal(document.getElementById("taskModal"));
        modal.show();
    }

    // Función para eliminar tareas
    function handleDeleteTask(event) {
        const id = parseInt(event.target.dataset.id);
        const index = tasks.findIndex(t => t.id === id);
        tasks.splice(index, 1);
        loadTasks();
    }

    // Función para eliminar comentarios
    function handleDeleteComment(event) {
        const taskId = parseInt(event.target.getAttribute('data-task-id'));
        const commentIndex = parseInt(event.target.getAttribute('data-comment-index'));
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.comments.splice(commentIndex, 1);
            loadTasks();
        }
    }

    // Función para manejar el envío del formulario de tareas
    document.getElementById('task-form').addEventListener('submit', function (e) {
        e.preventDefault();
        
        const title = document.getElementById("task-title").value;
        const description = document.getElementById("task-desc").value;
        const dueDate = document.getElementById("due-date").value;

        if (isEditMode) {
            const task = tasks.find(t => t.id === edittingId);
            task.title = title;
            task.description = description;
            task.dueDate = dueDate;
        } else {
            const newTask = {
                id: tasks.length + 1,
                title: title,
                description: description,
                dueDate: dueDate,
                comments: []
            };
            tasks.push(newTask);
        }
        const modal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
        modal.hide();
        loadTasks();
    });

    // Evento para mostrar el modal de tareas
    document.getElementById('taskModal').addEventListener('show.bs.modal', function(){
        if (!isEditMode) {
            document.getElementById('task-form').reset();
        }
    });

    // Evento para ocultar el modal de tareas
    document.getElementById("taskModal").addEventListener('hidden.bs.modal', function(){
        edittingId = null;
        isEditMode = false;
    });

    loadTasks();
});
