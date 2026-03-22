// API Configuration
const API_CONFIG = {
    // Use relative path - works everywhere!
    BASE_URL: window.location.origin + '/api',
    
    ENDPOINTS: {
        TASKS: '/tasks.php',
        TASK_BY_ID: '/tasks.php'
    },
    
    STATUS: {
        CREATED: 'Created',
        WIP: 'WIP',
        COMPLETED: 'Completed'
    },
    
    STATUS_FLOW: {
        'Created': 'WIP',
        'WIP': 'Completed',
        'Completed': 'Created'
    }
};

function getApiUrl(endpoint) {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
}
```

**Ye automatically detect karega:**
- Localhost pe: `http://localhost/api`
- Railway pe: `https://task-manager-production-8e9a.up.railway.app/api`

---

### **Step 2: GitHub Pe Upload Karo**

1. **GitHub.com** pe jao
2. **task-manager** repo kholo
3. **config.js** file pe click karo
4. **Edit** (pencil icon) dabao
5. Updated code paste karo
6. **Commit changes** green button dabao

---

### **Step 3: Railway Auto-Deploy Karega**

**Railway dashboard:**
- Automatically detect karega GitHub change
- Redeploy karega (2-3 min)
- **Deployments** tab mein dekh sakte ho

---

### **Step 4: Test Karo**

Railway URL dobara kholo:
```
https://task-manager-production-8e9a.up.railway.app
