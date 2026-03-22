-- Task Manager Database Schema
-- MySQL Database Setup (for XAMPP)

-- Create database (run this first if database doesn't exist)
CREATE DATABASE IF NOT EXISTS taskmanager;

-- Use the database
USE taskmanager;

-- Drop table if exists (for clean setup)
DROP TABLE IF EXISTS tasks;

-- Create tasks table
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Created',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CHECK (status IN ('Created', 'WIP', 'Completed')),
    CHECK (LENGTH(TRIM(task_name)) > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create index on status for faster filtering
CREATE INDEX idx_tasks_status ON tasks(status);

-- Create index on created_at for faster sorting
CREATE INDEX idx_tasks_created_at ON tasks(created_at DESC);

-- Insert sample data (optional - for testing)
INSERT INTO tasks (task_name, status, created_at) VALUES
    ('Complete project documentation', 'Created', DATE_SUB(NOW(), INTERVAL 2 HOUR)),
    ('Review pull requests', 'WIP', DATE_SUB(NOW(), INTERVAL 1 HOUR)),
    ('Setup CI/CD pipeline', 'Created', DATE_SUB(NOW(), INTERVAL 30 MINUTE)),
    ('Write unit tests', 'WIP', DATE_SUB(NOW(), INTERVAL 15 MINUTE)),
    ('Deploy to staging', 'Completed', DATE_SUB(NOW(), INTERVAL 3 HOUR));

-- Verify table creation
DESCRIBE tasks;

-- Display sample data
SELECT * FROM tasks ORDER BY created_at DESC;

-- Database setup complete
-- You can now run the application!
