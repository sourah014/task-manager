// API Configuration
const API_CONFIG = {
    // Detect current environment automatically
    BASE_URL: (function() {
        // Check if we're on Railway (production) or localhost
        const currentHost = window.location.hostname;
        
        if (currentHost === 'localhost' || currentHost === '127.0.0.1') {
            // Local XAMPP
            return 'http://localhost/task-manager-mysql/api';
        } else {
            // Railway or any other deployment
            return window.location.origin + '/api';
        }
    })(),
    
    // Endpoints
    ENDPOINTS: {
        TASKS: '/tasks.php',
        TASK_BY_ID: '/tasks.php'
    },
    
    // Status values
    STATUS: {
        CREATED: 'Created',
        WIP: 'WIP',
        COMPLETED: 'Completed'
    },
    
    // Status transitions
    STATUS_FLOW: {
        'Created': 'WIP',
        'WIP': 'Completed',
        'Completed': 'Created'
    }
};

// Helper function to get full API URL
function getApiUrl(endpoint) {
    return API_CONFIG.BASE_URL + endpoint;
}
```

---

## **📝 Ye Code Kya Karega:**

**Localhost pe (XAMPP):**
```
http://localhost/task-manager-mysql/api/tasks.php
```

**Railway pe:**
```
https://task-manager-production-8e9a.up.railway.app/api/tasks.php
```

**Automatic detect karega!** ✅

---

## **🎯 GitHub Update Karo:**

1. **GitHub.com** → **task-manager** repo
2. **config.js** file open karo
3. **Edit** button (pencil icon)
4. **Poora file replace** karo upar wale code se
5. **Commit changes** green button

---

## **⏳ Railway Auto-Deploy:**

**2-3 minutes wait karo:**
- Railway automatically detect karega
- Redeploy karega
- Green tick dikkhega

---

## **✅ Test Karo:**

**Railway URL phir se refresh karo:**
```
https://task-manager-production-8e9a.up.railway.app
