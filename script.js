class MT5DisciplineTracker {
    constructor() {
        this.checklistItems = [];
        this.delayMinutes = 5;
        this.currentScreen = 'setup';
        this.feedbackHistory = [];
        this.sessionCount = 0;
        this.currentStreak = 0;
        this.bestStreak = 0;
        this.hasCompletedSession = false;
        
        this.initializeApp();
        this.loadData();
        this.setupEventListeners();
    }

    initializeApp() {
        // Show setup screen by default
        this.showScreen('setup');
    }

    loadData() {
        const savedData = localStorage.getItem('mt5DisciplineData');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.checklistItems = data.checklistItems || [];
            this.delayMinutes = data.delayMinutes || 5;
            this.feedbackHistory = data.feedbackHistory || [];
            this.sessionCount = data.sessionCount || 0;
            this.currentStreak = data.currentStreak || 0;
            this.bestStreak = data.bestStreak || 0;
            this.hasCompletedSession = data.hasCompletedSession || false;
        }
        
        this.updateUI();
    }

    saveData() {
        const data = {
            checklistItems: this.checklistItems,
            delayMinutes: this.delayMinutes,
            feedbackHistory: this.feedbackHistory,
            sessionCount: this.sessionCount,
            currentStreak: this.currentStreak,
            bestStreak: this.bestStreak,
            hasCompletedSession: this.hasCompletedSession
        };
        
        localStorage.setItem('mt5DisciplineData', JSON.stringify(data));
    }

    setupEventListeners() {
        // Navigation
        document.getElementById('nav-setup').addEventListener('click', () => this.showScreen('setup'));
        document.getElementById('nav-trade').addEventListener('click', () => this.startTradingFlow());
        document.getElementById('nav-progress').addEventListener('click', () => this.showScreen('progress'));

        // Setup screen
        document.getElementById('add-checklist-item').addEventListener('click', () => this.addChecklistItem());
        document.getElementById('save-setup').addEventListener('click', () => this.saveSetup());
        
        // Feedback screen
        document.getElementById('discipline-rating').addEventListener('input', (e) => {
            document.getElementById('discipline-value').textContent = e.target.value;
        });
        document.getElementById('submit-feedback').addEventListener('click', () => this.submitFeedback());
        
        // Checklist screen
        document.getElementById('complete-checklist').addEventListener('click', () => this.completeChecklist());
        
        // Access screen
        document.getElementById('open-mt5').addEventListener('click', () => this.openMT5());
        document.getElementById('back-to-setup').addEventListener('click', () => this.showScreen('setup'));
        
        // Progress screen
        document.getElementById('back-from-progress').addEventListener('click', () => this.showScreen('setup'));
        
        // Delay input
        document.getElementById('delay-input').addEventListener('change', (e) => {
            this.delayMinutes = parseInt(e.target.value) || 5;
        });
    }

    addChecklistItem() {
        const builder = document.getElementById('checklist-builder');
        const itemDiv = document.createElement('div');
        itemDiv.className = 'checklist-item';
        itemDiv.innerHTML = `
            <input type="text" placeholder="e.g., Risk management calculated" class="checklist-input">
            <button class="remove-item">×</button>
        `;
        
        itemDiv.querySelector('.remove-item').addEventListener('click', () => {
            itemDiv.remove();
        });
        
        builder.appendChild(itemDiv);
    }

    saveSetup() {
        const inputs = document.querySelectorAll('.checklist-input');
        this.checklistItems = [];
        
        inputs.forEach(input => {
            if (input.value.trim()) {
                this.checklistItems.push(input.value.trim());
            }
        });
        
        if (this.checklistItems.length === 0) {
            alert('Please add at least one checklist item');
            return;
        }
        
        this.delayMinutes = parseInt(document.getElementById('delay-input').value) || 5;
        this.saveData();
        alert('Setup saved successfully!');
    }

    startTradingFlow() {
        if (this.checklistItems.length === 0) {
            alert('Please setup your checklist first');
            this.showScreen('setup');
            return;
        }
        
        // Check if we need feedback from previous session
        if (this.hasCompletedSession) {
            this.showScreen('feedback');
        } else {
            this.showScreen('checklist');
        }
    }

    showScreen(screenName) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show requested screen
        document.getElementById(`${screenName}-screen`).classList.add('active');
        
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        if (screenName === 'setup') {
            document.getElementById('nav-setup').classList.add('active');
            this.populateSetupForm();
        } else if (screenName === 'progress') {
            document.getElementById('nav-progress').classList.add('active');
            this.updateProgressScreen();
        }
        
        this.currentScreen = screenName;
    }

    populateSetupForm() {
        const builder = document.getElementById('checklist-builder');
        builder.innerHTML = '';
        
        if (this.checklistItems.length === 0) {
            this.addChecklistItem();
        } else {
            this.checklistItems.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'checklist-item';
                itemDiv.innerHTML = `
                    <input type="text" value="${item}" class="checklist-input">
                    <button class="remove-item">×</button>
                `;
                
                itemDiv.querySelector('.remove-item').addEventListener('click', () => {
                    itemDiv.remove();
                });
                
                builder.appendChild(itemDiv);
            });
        }
        
        document.getElementById('delay-input').value = this.delayMinutes;
    }

    populateChecklist() {
        const container = document.getElementById('checklist-container');
        container.innerHTML = '';
        
        this.checklistItems.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'checklist-item-container';
            itemDiv.innerHTML = `
                <input type="checkbox" id="check-${index}" class="checklist-checkbox">
                <label for="check-${index}" class="checklist-label">${item}</label>
            `;
            
            itemDiv.querySelector('input').addEventListener('change', () => {
                this.updateChecklistButton();
            });
            
            container.appendChild(itemDiv);
        });
        
        this.updateChecklistButton();
    }

    updateChecklistButton() {
        const checkboxes = document.querySelectorAll('#checklist-container input[type="checkbox"]');
        const allChecked = Array.from(checkboxes).every(cb => cb.checked);
        document.getElementById('complete-checklist').disabled = !allChecked;
    }

    completeChecklist() {
        this.showScreen('timer');
        this.startTimer();
    }

    startTimer() {
        const timerText = document.getElementById('timer-text');
        const circle = document.getElementById('timer-circle');
        let timeLeft = this.delayMinutes * 60; // Convert to seconds
        
        const updateTimer = () => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerText.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            
            // Update circle border color based on progress
            const progress = (this.delayMinutes * 60 - timeLeft) / (this.delayMinutes * 60);
            const hue = progress * 120; // From red (0) to green (120)
            circle.style.borderColor = `hsl(${hue}, 70%, 50%)`;
            
            if (timeLeft <= 0) {
                this.showAccessScreen();
                return;
            }
            
            timeLeft--;
            setTimeout(updateTimer, 1000);
        };
        
        updateTimer();
    }

    showAccessScreen() {
        this.showScreen('access');
        
        // Populate reminder list
        const reminderList = document.getElementById('reminder-list');
        reminderList.innerHTML = '';
        
        this.checklistItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            reminderList.appendChild(li);
        });
    }

    openMT5() {
        // In a real app, this would open MT5
        // For now, we'll simulate it
        this.hasCompletedSession = true;
        this.saveData();
        
        // Try to open MT5 (this will only work on Android with MT5 installed)
        const mt5Intent = 'intent://net.metaquotes.metatrader5/#Intent;scheme=https;package=net.metaquotes.metatrader5;end';
        window.location.href = mt5Intent;
        
        // Fallback message
        setTimeout(() => {
            alert('MT5 should be opening now. Return to this app after your trading session for feedback.');
        }, 1000);
    }

    submitFeedback() {
        const followedPlan = document.getElementById('followed-plan').value;
        const disciplineRating = document.getElementById('discipline-rating').value;
        const wentWell = document.getElementById('went-well').value;
        const doDifferently = document.getElementById('do-differently').value;
        const emotionalState = document.getElementById('emotional-state').value;
        
        if (!followedPlan || !emotionalState) {
            alert('Please fill in all required fields');
            return;
        }
        
        const feedback = {
            date: new Date().toISOString(),
            followedPlan,
            disciplineRating: parseInt(disciplineRating),
            wentWell,
            doDifferently,
            emotionalState
        };
        
        this.feedbackHistory.unshift(feedback);
        this.feedbackHistory = this.feedbackHistory.slice(0, 10); // Keep only last 10
        
        this.sessionCount++;
        
        // Update streak
        if (feedback.disciplineRating >= 7) {
            this.currentStreak++;
            this.bestStreak = Math.max(this.bestStreak, this.currentStreak);
        } else {
            this.currentStreak = 0;
        }
        
        this.hasCompletedSession = false;
        this.saveData();
        this.updateUI();
        
        // Clear form
        document.getElementById('followed-plan').value = '';
        document.getElementById('discipline-rating').value = '5';
        document.getElementById('discipline-value').textContent = '5';
        document.getElementById('went-well').value = '';
        document.getElementById('do-differently').value = '';
        document.getElementById('emotional-state').value = '';
        
        alert('Feedback submitted! You can now proceed to the checklist.');
        this.showScreen('checklist');
    }

    updateProgressScreen() {
        document.getElementById('total-sessions').textContent = this.sessionCount;
        
        const avgDiscipline = this.feedbackHistory.length > 0 
            ? (this.feedbackHistory.reduce((sum, f) => sum + f.disciplineRating, 0) / this.feedbackHistory.length).toFixed(1)
            : '0';
        document.getElementById('avg-discipline').textContent = avgDiscipline;
        document.getElementById('best-streak').textContent = this.bestStreak;
        
        // Show recent feedback
        const historyContainer = document.getElementById('feedback-history');
        historyContainer.innerHTML = '';
        
        this.feedbackHistory.slice(0, 5).forEach(feedback => {
            const entry = document.createElement('div');
            entry.className = 'feedback-entry';
            entry.innerHTML = `
                <div class="feedback-date">${new Date(feedback.date).toLocaleDateString()}</div>
                <div class="feedback-rating">Discipline: ${feedback.disciplineRating}/10</div>
                <div>Plan followed: ${feedback.followedPlan}</div>
                <div>Emotional state: ${feedback.emotionalState}</div>
            `;
            historyContainer.appendChild(entry);
        });
    }

    updateUI() {
        document.getElementById('streak').textContent = `Streak: ${this.currentStreak} days`;
        
        if (this.currentScreen === 'checklist') {
            this.populateChecklist();
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MT5DisciplineTracker();
});