// Task Manager Application
class TaskManager {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.cacheElements();
        this.attachEventListeners();
        this.loadTasks();
    }

    cacheElements() {
        // Form elements
        this.taskInput = document.getElementById('taskInput');
        this.addTaskBtn = document.getElementById('addTaskBtn');
        this.formHint = document.getElementById('formHint');

        // List elements
        this.tasksList = document.getElementById('tasksList');
        this.emptyState = document.getElementById('emptyState');
        this.loadingState = document.getElementById('loadingState');

        // Stats
        this.totalTasksEl = document.getElementById('totalTasks');
        this.completedTasksEl = document.getElementById('completedTasks');

        // Filter buttons
        this.filterBtns = document.querySelectorAll('.filter-btn');

        // Template
        this.taskTemplate = document.getElementById('taskTemplate');
    }

    attachEventListeners() {
        // Add task
        this.addTaskBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        // Clear error on input
        this.taskInput.addEventListener('input', () => {
            this.taskInput.classList.remove('error');
            this.formHint.textContent = '';
            this.formHint.className = 'form-hint';
        });

        // Filter buttons
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => this.setFilter(btn.dataset.filter));
        });
    }

    showLoading() {
        this.loadingState.classList.add('active');
        this.emptyState.classList.remove('active');
        this.tasksList.style.display = 'none';
    }

    hideLoading() {
        this.loadingState.classList.remove('active');
    }

    showEmptyState() {
        this.emptyState.classList.add('active');
        this.tasksList.style.display = 'none';
    }

    hideEmptyState() {
        this.emptyState.classList.remove('active');
        this.tasksList.style.display = 'flex';
    }

    async loadTasks() {
        try {
            this.showLoading();
            
            const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.TASKS));
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.success) {
                this.tasks = data.tasks || [];
                this.renderTasks();
                this.updateStats();
            } else {
                throw new Error(data.message || 'Failed to load tasks');
            }
            
        } catch (error) {
            console.error('Error loading tasks:', error);
            this.tasks = [];
            this.renderTasks();
            this.showMessage('Could not connect to server. Using offline mode.', 'error');
        } finally {
            this.hideLoading();
        }
    }

    async addTask() {
        const taskName = this.taskInput.value.trim();

        // Validation
        if (!taskName) {
            this.taskInput.classList.add('error');
            this.showMessage('Please enter a task name', 'error');
            return;
        }

        if (taskName.length > 255) {
            this.taskInput.classList.add('error');
            this.showMessage('Task name is too long (max 255 characters)', 'error');
            return;
        }

        try {
            this.addTaskBtn.disabled = true;
            this.showMessage('Adding task...', '');

            const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.TASKS), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    task_name: taskName
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                this.showMessage('Task added successfully!', 'success');
                this.taskInput.value = '';
                await this.loadTasks();
            } else {
                throw new Error(data.message || 'Failed to add task');
            }

        } catch (error) {
            console.error('Error adding task:', error);
            this.showMessage('Failed to add task. Please try again.', 'error');
        } finally {
            this.addTaskBtn.disabled = false;
        }
    }

    async updateTaskStatus(taskId, currentStatus) {
        const nextStatus = API_CONFIG.STATUS_FLOW[currentStatus];

        try {
            const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.TASK_BY_ID), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: taskId,
                    status: nextStatus
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                // Update local task
                const task = this.tasks.find(t => t.id === taskId);
                if (task) {
                    task.status = nextStatus;
                    this.renderTasks();
                    this.updateStats();
                }
            } else {
                throw new Error(data.message || 'Failed to update task');
            }

        } catch (error) {
            console.error('Error updating task:', error);
            this.showMessage('Failed to update task status', 'error');
        }
    }

    renderTasks() {
        // Clear list
        this.tasksList.innerHTML = '';

        // Filter tasks
        let filteredTasks = this.tasks;
        if (this.currentFilter !== 'all') {
            filteredTasks = this.tasks.filter(task => task.status === this.currentFilter);
        }

        // Show empty state if no tasks
        if (filteredTasks.length === 0) {
            this.showEmptyState();
            return;
        }

        this.hideEmptyState();

        // Render tasks (newest first)
        const sortedTasks = [...filteredTasks].sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
        });

        sortedTasks.forEach(task => {
            const taskElement = this.createTaskElement(task);
            this.tasksList.appendChild(taskElement);
        });
    }

    createTaskElement(task) {
        const clone = this.taskTemplate.content.cloneNode(true);
        const taskItem = clone.querySelector('.task-item');
        
        taskItem.dataset.taskId = task.id;
        taskItem.dataset.status = task.status;
        
        const taskName = clone.querySelector('.task-name');
        taskName.textContent = task.task_name;
        
        const taskTime = clone.querySelector('.task-time');
        taskTime.textContent = this.formatDate(task.created_at);
        
        const statusBadge = clone.querySelector('.status-badge');
        statusBadge.textContent = task.status;
        statusBadge.classList.add(task.status);
        
        const statusBtn = clone.querySelector('.btn-status');
        statusBtn.addEventListener('click', () => {
            this.updateTaskStatus(task.id, task.status);
        });
        
        return clone;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
        
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        
        const diffDays = Math.floor(diffHours / 24);
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    updateStats() {
        this.totalTasksEl.textContent = this.tasks.length;
        const completedCount = this.tasks.filter(t => t.status === 'Completed').length;
        this.completedTasksEl.textContent = completedCount;
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active button
        this.filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        this.renderTasks();
    }

    showMessage(message, type = '') {
        this.formHint.textContent = message;
        this.formHint.className = `form-hint ${type}`;
        
        if (type === 'success') {
            setTimeout(() => {
                this.formHint.textContent = '';
                this.formHint.className = 'form-hint';
            }, 3000);
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new TaskManager();
    console.log('Task Manager initialized');
});
