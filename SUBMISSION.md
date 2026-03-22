# Assignment 2 Submission - Task Manager

**Date:** March 22, 2026  
**Assignment:** Mini Full-Stack Task Manager Application

## What I Built

A complete task management application with frontend, backend API, and PostgreSQL database. Users can create tasks, view them in real-time, and update their status through a lifecycle (Created → WIP → Completed).

## Submission Files

### 1. Source Code
All code is included in this package:

**Frontend:**
- `index.html` - Main application page
- `styles.css` - UI styling (responsive, modern design)
- `app.js` - Application logic and API calls
- `config.js` - API configuration

**Backend:**
- `api/tasks.php` - RESTful API with GET, POST, PUT endpoints

**Database:**
- `database/schema.sql` - PostgreSQL table schema with sample data

**Documentation:**
- `README.md` - Complete setup and usage guide
- `DEPLOYMENT.md` - Deployment instructions
- `ARCHITECTURE.svg` - System architecture diagram

### 2. Architecture Overview

See `ARCHITECTURE.svg` for visual diagram.

**Flow:**
1. User interacts with UI
2. JavaScript makes API call (fetch)
3. PHP processes request
4. PostgreSQL query executed
5. JSON response returned
6. UI updates without reload

**Tech Stack:**
- Frontend: HTML5, CSS3, Vanilla JS
- Backend: PHP 7.4+ (RESTful API)
- Database: PostgreSQL 12+

### 3. Database Schema

**Table: tasks**

- id: SERIAL (Primary Key, Auto-increment)
- task_name: VARCHAR(255) - NOT NULL
- status: VARCHAR(50) - NOT NULL, DEFAULT 'Created'
- created_at: TIMESTAMP - NOT NULL, DEFAULT NOW()

**Valid Status Values:** 'Created', 'WIP', 'Completed'

### 4. API Endpoints

**GET /api/tasks.php**
- Returns all tasks from database
- Response includes task count

**POST /api/tasks.php**
- Creates new task
- Auto-assigns timestamp
- Returns created task

**PUT /api/tasks.php**
- Updates task status
- Validates status transition
- Returns updated task

## Features Implemented

**Core Requirements:**
- Add new tasks ✓
- Display task list from database ✓
- Update task status ✓
- Automatic timestamps ✓
- Real-time UI feedback (no page reload) ✓

**Additional Features:**
- Filter tasks by status
- Task statistics display
- Input validation (client and server)
- Error handling
- Loading states
- Empty state display
- Responsive mobile design
- Clean, modern UI

## Code Quality

**Frontend:**
- Clean JavaScript class structure
- Separation of concerns
- Event delegation
- Modern ES6+ syntax
- Commented code

**Backend:**
- RESTful design
- Input validation
- SQL injection prevention (PDO prepared statements)
- CORS enabled
- Proper error handling
- HTTP status codes

**Database:**
- Proper data types
- Constraints (CHECK, NOT NULL)
- Indexes for performance
- Default values

## How to Run Locally

**Step 1: Setup database**
```
psql -U postgres -d taskmanager -f database/schema.sql
```

**Step 2: Configure (optional - uses defaults)**
```
export DB_HOST=localhost
export DB_NAME=taskmanager
export DB_USER=postgres
export DB_PASSWORD=your_password
```

**Step 3: Start server**
```
php -S localhost:8000
```

**Step 4: Open browser**
```
http://localhost:8000
```

## Deployment

The application is deployment-ready for:
- Railway (recommended - free tier)
- Render (PHP + PostgreSQL)
- Traditional hosting (cPanel/Plesk)

See `DEPLOYMENT.md` for detailed instructions.

## Testing

Tested on:
- Chrome 120+
- Firefox 120+
- Safari 17+
- Mobile browsers (iOS Safari, Chrome Android)

Functionality tested:
- Task creation ✓
- Task listing ✓
- Status updates ✓
- Filtering ✓
- Validation ✓
- Error handling ✓

## Assignment Compliance

| Requirement | Status | Implementation |
|------------|--------|----------------|
| HTML/CSS/JS Frontend | ✓ | Clean, responsive UI |
| Add Task Function | ✓ | Form with validation |
| List Tasks Function | ✓ | Real-time from database |
| PHP/Java Backend | ✓ | PHP RESTful API |
| POST /tasks endpoint | ✓ | Create task |
| GET /tasks endpoint | ✓ | Retrieve tasks |
| PostgreSQL Database | ✓ | Schema with constraints |
| tasks table | ✓ | id, task_name, created_at, status |
| No page refresh | ✓ | Fetch API used |
| Status lifecycle | ✓ | Created → WIP → Completed |
| Code Quality | ✓ | Clean, readable, organized |
| README | ✓ | Complete documentation |
| Database Script | ✓ | schema.sql included |
| Architecture Diagram | ✓ | ARCHITECTURE.svg |

## File Structure

**Main Files:**
- index.html - Frontend UI
- styles.css - Styling
- app.js - Application logic
- config.js - API configuration

**API Folder:**
- api/tasks.php - Backend API

**Database Folder:**
- database/schema.sql - Database schema

**Documentation:**
- README.md - Complete documentation
- DEPLOYMENT.md - Deploy guide
- ARCHITECTURE.svg - Architecture diagram
- .gitignore - Git ignore rules

## Known Limitations

- No user authentication (not required)
- No task deletion (not required)
- Single user mode
- No task editing (name change)

These could be added as future enhancements.

## Notes

- The API uses environment variables for database config (production-ready)
- CORS is enabled for cross-origin requests
- All user input is validated and sanitized
- SQL injection protection via PDO prepared statements
- Error handling throughout the stack

## Next Steps for Production

1. Deploy backend to Railway/Render
2. Deploy frontend to Vercel/Netlify
3. Update config.js with production API URL
4. Test thoroughly
5. Monitor performance
