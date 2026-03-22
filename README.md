# Task Manager - Mini Full-Stack Application

A functional task management application built with vanilla JavaScript, PHP, and PostgreSQL. Features real-time task creation, status updates, and a clean responsive UI.

## Features

- Create new tasks with automatic timestamps
- View all tasks from database
- Update task status (Created → WIP → Completed)
- Real-time UI updates without page reload
- Filter tasks by status
- Responsive design (mobile-friendly)
- RESTful API architecture

## Tech Stack

**Frontend:**
- HTML5
- CSS3 (Custom styling, no frameworks)
- Vanilla JavaScript (ES6+)

**Backend:**
- PHP 7.4+ (RESTful API)
- PDO for database interactions

**Database:**
- PostgreSQL 12+

## Project Structure

```
task-manager/
├── index.html          # Main HTML page
├── styles.css          # CSS styling
├── app.js             # Frontend logic
├── config.js          # API configuration
├── api/
│   └── tasks.php      # Backend API endpoints
├── database/
│   └── schema.sql     # Database schema
└── README.md          # This file
```

## Quick Start

### Prerequisites

- PHP 7.4 or higher
- PostgreSQL 12 or higher
- Web server (Apache, Nginx, or PHP built-in server)

### Local Setup

**1. Clone/Download the repository**

```bash
git clone <your-repo-url>
cd task-manager
```

**2. Setup Database**

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE taskmanager;

# Exit and run schema
psql -U postgres -d taskmanager -f database/schema.sql
```

**3. Configure Database Connection**

Edit `api/tasks.php` and update database credentials:

```php
$dbConfig = [
    'host' => 'localhost',
    'port' => '5432',
    'database' => 'taskmanager',
    'username' => 'postgres',
    'password' => 'your_password'
];
```

Or set environment variables:
```bash
export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=taskmanager
export DB_USER=postgres
export DB_PASSWORD=your_password
```

**4. Start PHP Server**

```bash
# Start from project root
php -S localhost:8000
```

**5. Open in Browser**

Navigate to: `http://localhost:8000`

## API Endpoints

### GET /api/tasks.php
Retrieve all tasks from database

**Response:**
```json
{
  "success": true,
  "tasks": [
    {
      "id": 1,
      "task_name": "Complete documentation",
      "status": "Created",
      "created_at": "2026-03-22 10:30:00"
    }
  ],
  "count": 1
}
```

### POST /api/tasks.php
Create a new task

**Request Body:**
```json
{
  "task_name": "New task"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "task": {
    "id": 2,
    "task_name": "New task",
    "status": "Created",
    "created_at": "2026-03-22 11:00:00"
  }
}
```

### PUT /api/tasks.php
Update task status

**Request Body:**
```json
{
  "id": 1,
  "status": "WIP"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "task": {
    "id": 1,
    "task_name": "Complete documentation",
    "status": "WIP",
    "created_at": "2026-03-22 10:30:00"
  }
}
```

## Database Schema

```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    task_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Created',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    
    CONSTRAINT check_status CHECK (status IN ('Created', 'WIP', 'Completed'))
);
```

## Deployment

### Option 1: Traditional Hosting

1. Upload all files to web server
2. Setup PostgreSQL database
3. Run `schema.sql` to create tables
4. Update API configuration with production database credentials
5. Access via your domain

### Option 2: Platform as a Service

**Frontend (Vercel/Netlify):**
1. Deploy static files (HTML, CSS, JS)
2. Update `config.js` with backend API URL

**Backend (Railway/Render):**
1. Create new service
2. Add PostgreSQL database
3. Deploy API code
4. Set environment variables for database connection

### Environment Variables

For production, set these environment variables:

```
DB_HOST=your-db-host
DB_PORT=5432
DB_NAME=taskmanager
DB_USER=your-username
DB_PASSWORD=your-password
```

## Features Breakdown

### Frontend
- Clean, modern UI with gradient background
- Task input validation
- Real-time status updates
- Filter tasks by status (All/Created/WIP/Completed)
- Responsive design for mobile devices
- Loading states and empty states
- Task statistics display

### Backend
- RESTful API design
- CORS enabled for cross-origin requests
- Input validation and sanitization
- Error handling with appropriate HTTP status codes
- PDO prepared statements (SQL injection prevention)
- Environment variable support

### Database
- Proper data types and constraints
- Indexed columns for performance
- Default values for timestamps and status
- Sample data for testing

## Testing

**Test API endpoints using curl:**

```bash
# Get all tasks
curl http://localhost:8000/api/tasks.php

# Create a task
curl -X POST http://localhost:8000/api/tasks.php \
  -H "Content-Type: application/json" \
  -d '{"task_name":"Test task"}'

# Update task status
curl -X PUT http://localhost:8000/api/tasks.php \
  -H "Content-Type: application/json" \
  -d '{"id":1,"status":"WIP"}'
```

## Troubleshooting

**Issue: Can't connect to database**
- Check PostgreSQL is running: `pg_isready`
- Verify credentials in `api/tasks.php`
- Check database exists: `psql -l`

**Issue: CORS errors**
- Make sure API has CORS headers (already included)
- Check API URL in `config.js` matches your setup

**Issue: Tasks not loading**
- Open browser console for errors
- Verify API endpoint is accessible
- Check database has tables created

**Issue: PHP errors**
- Check PHP version: `php -v` (need 7.4+)
- Enable error reporting in `php.ini`
- Check Apache/Nginx error logs

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Code Quality

- Clean, readable code with comments
- Separation of concerns (HTML/CSS/JS)
- RESTful API best practices
- SQL best practices (prepared statements, constraints)
- Error handling throughout
- Input validation on both frontend and backend

## Future Enhancements

Possible improvements:
- Task deletion
- Task editing
- Task priority levels
- Due dates
- User authentication
- Task categories/tags
- Search functionality
- Pagination for large task lists

## License

Created for Achiredo Technologies Assignment

## Support

For issues or questions:
1. Check browser console for errors
2. Verify database connection
3. Check API endpoint responses
4. Review server logs

---

**Assignment Completed:** March 22, 2026
