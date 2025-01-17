<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, PUT, DELETE, GET');
header("Access-Control-Allow-Headers: Content-Type");

include_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        createMovie();
        break;

    case 'PUT':
        updateMovie();
        break;

    case 'DELETE':
        deleteMovie();
        break;

    case 'GET':
        getMovies();
        break;

    default:
        echo json_encode(['message' => 'Invalid Request']);
        break;
}

// Create a new movie
function createMovie()
{
    $data = json_decode(file_get_contents("php://input"));
    if (!empty($data->title) && !empty($data->episode_or_season) && !empty($data->genre) && !empty($data->last_watched)) {
        $conn = getConnection();
        $stmt = $conn->prepare("INSERT INTO movies (title, episode_or_season, genre, last_watched) VALUES (?, ?, ?, ?)");
        $stmt->bind_param('ssss', $data->title, $data->episode_or_season, $data->genre, $data->last_watched);

        if ($stmt->execute()) {
            echo json_encode(['message' => 'Movie Created']);
        } else {
            echo json_encode(['message' => 'Movie Not Created']);
        }

        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(['message' => 'Incomplete Data']);
    }
}

// Update movie information
function updateMovie()
{
    $data = json_decode(file_get_contents("php://input"));
    if (!empty($data->id) && !empty($data->title) && !empty($data->episode_or_season) && !empty($data->genre) && !empty($data->last_watched)) {
        $conn = getConnection();
        $stmt = $conn->prepare("UPDATE movies SET title = ?, episode_or_season = ?, genre = ?, last_watched = ? WHERE id = ?");
        $stmt->bind_param('ssssi', $data->title, $data->episode_or_season, $data->genre, $data->last_watched, $data->id);

        if ($stmt->execute()) {
            echo json_encode(['message' => 'Movie Updated']);
        } else {
            echo json_encode(['message' => 'Movie Not Updated']);
        }

        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(['message' => 'Incomplete Data']);
    }
}

// Delete a movie
function deleteMovie()
{
    $data = json_decode(file_get_contents("php://input"));
    if (!empty($data->id)) {
        $conn = getConnection();
        $stmt = $conn->prepare("DELETE FROM movies WHERE id = ?");
        $stmt->bind_param('i', $data->id);

        if ($stmt->execute()) {
            echo json_encode(['message' => 'Movie Deleted']);
        } else {
            echo json_encode(['message' => 'Movie Not Deleted']);
        }

        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(['message' => 'Invalid ID']);
    }
}

// Get movies (all or by ID)
function getMovies()
{
    $conn = getConnection();

    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $stmt = $conn->prepare("SELECT * FROM movies WHERE id = ?");
        $stmt->bind_param('i', $id);
    } else {
        $stmt = $conn->prepare("SELECT * FROM movies");
    }

    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $movies = [];
        while ($row = $result->fetch_assoc()) {
            $movies[] = $row;
        }
        echo json_encode($movies);
    } else {
        echo json_encode(['message' => 'No Movies Found']);
    }

    $stmt->close();
    $conn->close();
}
