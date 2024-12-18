<?php
session_start();
require 'db.php';


try {
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            // Obtener comentarios por ID de tarea
            if (isset($_GET['task_id'])) {
                $task_id = $_GET['task_id'];
                $sql = "SELECT * FROM comments WHERE task_id = :task_id";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':task_id', $task_id);
                $stmt->execute();
                $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($results);
            } else {
                echo json_encode([]);
            }
            break;

        case 'POST':
            // Agregar nuevo comentario
            $data = json_decode(file_get_contents("php://input"), true);
            if (isset($data['task_id'], $data['comment'])) {
                $sql = "INSERT INTO comments (task_id, comment) VALUES (:task_id, :comment)";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':task_id', $data['task_id']);
                $stmt->bindParam(':comment', $data['comment']);
                $stmt->execute();
                echo json_encode(['message' => 'Comentario agregado con éxito.']);
            }
            break;

        case 'DELETE':
            // Eliminar un comentario
            if (isset($_GET['id'])) {
                $comment_id = $_GET['id'];
                $sql = "DELETE FROM comments WHERE id = :id";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':id', $comment_id);
                $stmt->execute();
                echo json_encode(['message' => 'Comentario eliminado con éxito.']);
            }
            break;
        case 'PUT':
            // Actualizar un comentario existente(me falto en la tarea 4)
            $data = json_decode(file_get_contents("php://input"), true);
            if (isset($data['id'], $data['comment'])) {
                $sql = "UPDATE comments SET comment = :comment WHERE id = :id";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':comment', $data['comment']);
                $stmt->bindParam(':id', $data['id']);

                if ($stmt->execute()) {
                    echo json_encode(['message' => 'Comentario actualizado con éxito.']);
                } else {
                    echo json_encode(['error' => 'Error al actualizar el comentario.']);
                }
            } else {
                echo json_encode(['error' => 'Datos incompletos.']);
            }
            break;


        default:
            echo json_encode(['message' => 'Método no soportado.']);
            break;
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
