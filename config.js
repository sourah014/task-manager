// API Configuration
const API_CONFIG = {
    // Base URL - Update this with your deployed backend URL
    BASE_URL: './api',
    
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
    return `${API_CONFIG.BASE_URL}${endpoint}`;
}
