# Deployment Guide - Task Manager

Quick guide for deploying the Task Manager application to production.

## Option 1: Railway (Recommended - Easiest)

Railway provides free PostgreSQL and PHP hosting.

### Steps:

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your repository

3. **Add PostgreSQL Database**
   - Click "New" → "Database" → "PostgreSQL"
   - Railway will automatically create database

4. **Configure Environment**
   - Railway auto-detects PHP
   - Add environment variables (they're set automatically from DB):
     - DB_HOST
     - DB_PORT
     - DB_NAME
     - DB_USER
     - DB_PASSWORD

5. **Setup Database Schema**
   - Go to PostgreSQL service
   - Click "Data" tab
   - Run contents of `database/schema.sql`

6. **Deploy**
   - Push code to GitHub
   - Railway auto-deploys
   - Get live URL from dashboard

## Option 2: Render

### Backend (PHP API + PostgreSQL):

1. **Create Render Account**
   - Go to https://render.com

2. **Create PostgreSQL Database**
   - New → PostgreSQL
   - Note connection details

3. **Create Web Service**
   - New → Web Service
   - Connect GitHub repo
   - Build Command: (leave empty)
   - Start Command: `php -S 0.0.0.0:$PORT -t .`

4. **Add Environment Variables**
   ```
   DB_HOST=<from postgres>
   DB_PORT=5432
   DB_NAME=<from postgres>
   DB_USER=<from postgres>
   DB_PASSWORD=<from postgres>
   ```

5. **Run Database Schema**
   - Connect to database
   - Run `database/schema.sql`

### Frontend:

1. **Deploy to Vercel**
   - Go to https://vercel.com
   - Import from GitHub
   - Deploy

2. **Update API URL**
   - Edit `config.js`
   - Set BASE_URL to your Render backend URL

## Option 3: Traditional Hosting (cPanel)

### Requirements:
- PHP 7.4+
- PostgreSQL access
- FTP access

### Steps:

1. **Upload Files**
   - Upload all files via FTP
   - Place in public_html or appropriate directory

2. **Create Database**
   - Use cPanel PostgreSQL manager
   - Create database and user
   - Note credentials

3. **Import Schema**
   - Use phpPgAdmin or psql
   - Run `database/schema.sql`

4. **Configure**
   - Edit `api/tasks.php`
   - Update database credentials

5. **Test**
   - Visit your domain
   - Test task creation

## Environment Variables Reference

```bash
# Database Configuration
DB_HOST=localhost          # Database host
DB_PORT=5432              # PostgreSQL port
DB_NAME=taskmanager       # Database name
DB_USER=postgres          # Database username
DB_PASSWORD=your_password # Database password
```

## Post-Deployment Checklist

- [ ] Database schema created
- [ ] Sample tasks visible
- [ ] Can add new task
- [ ] Can change task status
- [ ] Filtering works
- [ ] No console errors
- [ ] Mobile responsive
- [ ] HTTPS enabled

## Common Issues

**Issue: CORS errors**
- Ensure `api/tasks.php` has CORS headers (already included)

**Issue: Database connection failed**
- Check environment variables
- Verify database credentials
- Check database service is running

**Issue: 404 on API calls**
- Update `config.js` with correct API URL
- Ensure API path is correct

**Issue: Empty response**
- Check database has data
- Run sample data insert from `schema.sql`

## Testing Production

```bash
# Test GET endpoint
curl https://your-api-url.com/api/tasks.php

# Test POST endpoint
curl -X POST https://your-api-url.com/api/tasks.php \
  -H "Content-Type: application/json" \
  -d '{"task_name":"Production test"}'
```

## Monitoring

Once deployed, monitor:
- API response times
- Database connections
- Error logs
- User activity

## Support

For deployment issues:
1. Check platform documentation
2. Verify environment variables
3. Check database connection
4. Review application logs
