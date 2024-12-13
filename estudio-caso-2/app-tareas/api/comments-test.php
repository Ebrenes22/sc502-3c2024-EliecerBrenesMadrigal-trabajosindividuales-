<?php
require_once 'db.php';

try {
    $task_id = 1;
    $comment = "Comentario de Prueba.";

    $sql = "INSERT INTO comments (task_id, comment) VALUES (:task_id, :comment)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':task_id', $task_id);
    $stmt->bindParam(':comment', $comment);

    if ($stmt->execute()) {
        echo "Comentario insertado exitosamente.<br>";
    } else {
        echo "Error al insertar el comentario.<br>";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>


<?php
require_once 'db.php';

try {
    $task_id = 1;

    $sql = "SELECT * FROM comments WHERE task_id = :task_id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':task_id', $task_id);
    $stmt->execute();

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (count($results) > 0) {
        echo "Comentarios para la tarea $task_id:<br>";
        foreach ($results as $row) {
            echo "ID: " . $row['id'] . " - Comentario: " . $row['comment'] . "<br>";
        }
    } else {
        echo "No se encontraron comentarios para la tarea $task_id.<br>";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>


<?php
require_once 'db.php';

try {
    $comment_id = 1; 

    $sql = "DELETE FROM comments WHERE id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $comment_id);

    if ($stmt->execute()) {
        if ($stmt->rowCount() > 0) {
            echo "Comentario con ID $comment_id eliminado exitosamente.<br>";
        } else {
            echo "No se encontró un comentario con ID $comment_id.<br>";
        }
    } else {
        echo "Error al eliminar el comentario.<br>";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
