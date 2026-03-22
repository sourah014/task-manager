# Task Manager - XAMPP Setup Guide

Quick setup guide for running Task Manager with XAMPP (MySQL).

## Prerequisites

- XAMPP installed (with Apache and MySQL)
- Web browser

## Step-by-Step Setup

### Step 1: Start XAMPP

1. Open XAMPP Control Panel
2. Start **Apache** (click Start button)
3. Start **MySQL** (click Start button)

Both should show green "Running" status.

### Step 2: Create Database

1. Open browser and go to: `http://localhost/phpmyadmin`
2. Click "New" in left sidebar
3. Database name: `taskmanager`
4. Click "Create"

### Step 3: Import Database Schema

1. Click on `taskmanager` database (left sidebar)
2. Click "SQL" tab at top
3. Open `database/schema-mysql.sql` file in notepad
4. Copy ALL the content
5. Paste in the SQL box
6. Click "Go" button at bottom

You should see "5 rows inserted" message.

### Step 4: Copy Files to XAMPP

**Option A: Put in htdocs**
1. Copy entire `task-manager-mysql` folder
2. Paste in `C:\xampp\htdocs\`
3. Rename to just `task-manager` (optional)

**Option B: Use directly**
1. Keep folder where it is
2. Just note the full path

### Step 5: Access Application

**If in htdocs:**
```
http://localhost/task-manager/
```

**If using different location:**
- Use PHP built-in server (see Alternative Method below)

### Step 6: Test

1. You should see Task Manager UI
2. Try adding a task: "Test Task"
3. Click "Add Task"
4. Task should appear in list
5. Click status change button - status should update

## Alternative Method (No htdocs copy)

If you don't want to copy to htdocs:

1. Open Command Prompt (CMD)
2. Navigate to your folder:
   ```
   cd C:\path\to\task-manager-mysql
   ```
3. Start PHP server:
   ```
   C:\xampp\php\php.exe -S localhost:8000
   ```
4. Open browser:
   ```
   http://localhost:8000
   ```

## Configuration

Database settings are in `api/tasks.php`:

```php
$dbConfig = [
    'host' => 'localhost',
    'database' => 'taskmanager',
    'username' => 'root',
    'password' => ''  // Default XAMPP has no password
];
```

**If you changed MySQL password:**
- Edit `api/tasks.php`
- Update the password value

## Troubleshooting

### Apache won't start
- Port 80 might be in use
- Close Skype or other programs using port 80
- Or change Apache port in XAMPP config

### MySQL won't start
- Port 3306 might be in use
- Stop other MySQL services
- Or change MySQL port in XAMPP config

### Database connection failed
- Check MySQL is running in XAMPP
- Verify database name is `taskmanager`
- Check username is `root` with empty password

### Tasks not loading
- Open browser console (F12)
- Check for errors
- Verify API URL in `config.js`
- Make sure Apache is running

### 404 Not Found
- Check file path is correct
- Verify files are in `htdocs` or server is running
- Check URL spelling

## File Structure

```
task-manager-mysql/
├── index.html          # Main page
├── styles.css          # Styling
├── app.js             # Frontend logic
├── config.js          # API config
├── api/
│   └── tasks.php      # Backend API (MySQL)
├── database/
│   └── schema-mysql.sql  # Database schema
└── README-XAMPP.md    # This file
```

## Testing API Directly

Open browser and test:

**Get all tasks:**
```
http://localhost/task-manager/api/tasks.php
```

Should return JSON with tasks.

## Next Steps

Once working locally:
1. Test all features (add, update, filter)
2. Check mobile responsive view
3. Ready for submission!

## Common XAMPP Locations

**Windows:**
- XAMPP folder: `C:\xampp`
- htdocs: `C:\xampp\htdocs`
- PHP: `C:\xampp\php\php.exe`

**Mac:**
- XAMPP folder: `/Applications/XAMPP`
- htdocs: `/Applications/XAMPP/htdocs`

---

**Need help?** Check XAMPP logs in Control Panel or browser console.
