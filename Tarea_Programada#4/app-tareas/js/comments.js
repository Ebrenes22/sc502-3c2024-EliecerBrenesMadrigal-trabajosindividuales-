// Funcion obtener comentarios por ID de tarea
async function getComments(taskId) {
    const response = await fetch(`/app-tareas/api/comments.php?task_id=${taskId}`);
    const data = await response.json();
    console.log(data);
    return data; 
}

// Funcion para un nuevo comentario
async function addComment(taskId, comment) {
    const response = await fetch('/app-tareas/api/comments.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task_id: taskId, comment: comment })
    });
    const data = await response.json();
    console.log(data);
}

// Funcion para eliminar un comentario
async function deleteComment(commentId) {
    const response = await fetch(`/app-tareas/api/comments.php?id=${commentId}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    console.log(data);
}

// Funcion para mostar comentarios en el modal
async function showComments(taskId) {
    const comments = await getComments(taskId);
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = ''; 

    comments.forEach(comment => {
        const commentElement = document.createElement('li');
        commentElement.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        commentElement.textContent = comment.comment;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => {
            deleteComment(comment.id).then(() => showComments(taskId));
        };

        commentElement.appendChild(deleteBtn);
        commentsList.appendChild(commentElement);
    });
}
