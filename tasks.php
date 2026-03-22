<?php
// tasks.php - RESTful API for Task Management (MySQL Version)

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database configuration for XAMPP/MySQL
$dbConfig = [
    'host' => getenv('DB_HOST') ?: 'localhost',
    'database' => getenv('DB_NAME') ?: 'taskmanager',
    'username' => getenv('DB_USER') ?: 'root',
    'password' => getenv('DB_PASSWORD') ?: ''  // XAMPP default is empty password
];

// Database connection
function getDbConnection($config) {
    try {
        $dsn = sprintf(
            "mysql:host=%s;dbname=%s;charset=utf8mb4",
            $config['host'],
            $config['database']
        );
        
        $pdo = new PDO($dsn, $config['username'], $config['password']);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        
        return $pdo;
    } catch (PDOException $e) {
        sendError('Database connection failed: ' . $e->getMessage(), 500);
        exit();
    }
}

// Helper functions
function sendResponse($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data);
    exit();
}

function sendError($message, $code = 400) {
    http_response_code($code);
    echo json_encode([
        'success' => false,
        'message' => $message
    ]);
    exit();
}

function getRequestBody() {
    $body = file_get_contents('php://input');
    return json_decode($body, true);
}

// Initialize database connection
$db = getDbConnection($dbConfig);

// Router
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        handleGetTasks($db);
        break;
    
    case 'POST':
        handleCreateTask($db);
        break;
    
    case 'PUT':
        handleUpdateTask($db);
        break;
    
    default:
        sendError('Method not allowed', 405);
}

// GET /tasks - Retrieve all tasks
function handleGetTasks($db) {
    try {
        $stmt = $db->prepare("
            SELECT id, task_name, status, created_at 
            FROM tasks 
            ORDER BY created_at DESC
        ");
        
        $stmt->execute();
        $tasks = $stmt->fetchAll();
        
        sendResponse([
            'success' => true,
            'tasks' => $tasks,
            'count' => count($tasks)
        ]);
        
    } catch (PDOException $e) {
        sendError('Failed to fetch tasks: ' . $e->getMessage(), 500);
    }
}

// POST /tasks - Create a new task
function handleCreateTask($db) {
    $data = getRequestBody();
    
    // Validation
    if (!isset($data['task_name']) || empty(trim($data['task_name']))) {
        sendError('Task name is required');
    }
    
    $taskName = trim($data['task_name']);
    
    if (strlen($taskName) > 255) {
        sendError('Task name is too long (max 255 characters)');
    }
    
    try {
        $stmt = $db->prepare("
            INSERT INTO tasks (task_name, status, created_at) 
            VALUES (:task_name, 'Created', NOW())
        ");
        
        $stmt->execute([
            ':task_name' => $taskName
        ]);
        
        // Get the created task
        $taskId = $db->lastInsertId();
        $stmt = $db->prepare("SELECT id, task_name, status, created_at FROM tasks WHERE id = :id");
        $stmt->execute([':id' => $taskId]);
        $task = $stmt->fetch();
        
        sendResponse([
            'success' => true,
            'message' => 'Task created successfully',
            'task' => $task
        ], 201);
        
    } catch (PDOException $e) {
        sendError('Failed to create task: ' . $e->getMessage(), 500);
    }
}

// PUT /tasks - Update task status
function handleUpdateTask($db) {
    $data = getRequestBody();
    
    // Validation
    if (!isset($data['id']) || !isset($data['status'])) {
        sendError('Task ID and status are required');
    }
    
    $taskId = $data['id'];
    $status = $data['status'];
    
    // Validate status
    $validStatuses = ['Created', 'WIP', 'Completed'];
    if (!in_array($status, $validStatuses)) {
        sendError('Invalid status. Must be: Created, WIP, or Completed');
    }
    
    try {
        // Check if task exists
        $stmt = $db->prepare("SELECT id FROM tasks WHERE id = :id");
        $stmt->execute([':id' => $taskId]);
        
        if (!$stmt->fetch()) {
            sendError('Task not found', 404);
        }
        
        // Update task
        $stmt = $db->prepare("
            UPDATE tasks 
            SET status = :status 
            WHERE id = :id
        ");
        
        $stmt->execute([
            ':id' => $taskId,
            ':status' => $status
        ]);
        
        // Get updated task
        $stmt = $db->prepare("SELECT id, task_name, status, created_at FROM tasks WHERE id = :id");
        $stmt->execute([':id' => $taskId]);
        $task = $stmt->fetch();
        
        sendResponse([
            'success' => true,
            'message' => 'Task updated successfully',
            'task' => $task
        ]);
        
    } catch (PDOException $e) {
        sendError('Failed to update task: ' . $e->getMessage(), 500);
    }
}
