* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    color: #333;
}

.container {
    max-width: 400px;
    margin: 0 auto;
    background: white;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 20px rgba(0,0,0,0.1);
}

header {
    background: linear-gradient(135deg, #2c3e50, #3498db);
    color: white;
    padding: 20px;
    text-align: center;
}

header h1 {
    font-size: 1.5em;
    margin-bottom: 10px;
}

.streak-counter {
    font-size: 0.9em;
    opacity: 0.9;
}

.screen {
    flex: 1;
    padding: 20px;
    display: none;
    overflow-y: auto;
}

.screen.active {
    display: block;
}

.setup-section {
    margin-bottom: 30px;
}

.setup-section h3 {
    margin-bottom: 15px;
    color: #2c3e50;
}

.checklist-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    gap: 10px;
}

.checklist-input {
    flex: 1;
    padding: 12px;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
}

.checklist-input:focus {
    outline: none;
    border-color: #3498db;
}

.remove-item {
    background: #e74c3c;
    color: white;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 16px;
}

#add-checklist-item {
    background: #27ae60;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
}

#delay-input {
    width: 100%;
    padding: 12px;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
}

.primary-btn {
    background: linear-gradient(135deg, #3498db, #2980b9);
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    width: 100%;
    margin-top: 20px;
    transition: all 0.3s ease;
}

.primary-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}

.primary-btn:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}

.secondary-btn {
    background: #95a5a6;
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    width: 100%;
    margin-top: 10px;
}

.large {
    padding: 20px 30px;
    font-size: 18px;
    font-weight: bold;
}

.feedback-section {
    margin-bottom: 20px;
}

.question {
    margin-bottom: 20px;
}

.question label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #2c3e50;
}

.question select,
.question textarea {
    width: 100%;
    padding: 12px;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    font-family: inherit;
}

.question textarea {
    height: 80px;
    resize: vertical;
}

.question input[type="range"] {
    width: 100%;
    margin: 10px 0;
}

#discipline-value {
    font-weight: bold;
    color: #3498db;
}

.checklist-checkbox {
    margin-right: 10px;
    transform: scale(1.5);
}

.checklist-label {
    font-size: 16px;
    line-height: 1.5;
}

.checklist-item-container {
    display: flex;
    align-items: center;
    padding: 15px;
    margin-bottom: 10px;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #3498db;
}

.timer-display {
    text-align: center;
    padding: 40px 20px;
}

#timer-circle {
    width: 150px;
    height: 150px;
    border: 8px solid #3498db;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 30px;
    position: relative;
    background: linear-gradient(135deg, #ebf8ff, #dbeafe);
}

#timer-text {
    font-size: 2em;
    font-weight: bold;
    color: #2c3e50;
}

.timer-message {
    color: #7f8c8d;
    font-style: italic;
    margin-top: 10px;
}

.access-content {
    text-align: center;
    padding: 20px 0;
}

.checklist-summary {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 30px;
    text-align: left;
}

.checklist-summary h3 {
    color: #2c3e50;
    margin-bottom: 15px;
}

.checklist-summary ul {
    list-style: none;
    padding-left: 0;
}

.checklist-summary li {
    padding: 8px 0;
    border-bottom: 1px solid #eee;
}

.checklist-summary li:last-child {
    border-bottom: none;
}

.checklist-summary li:before {
    content: "✓";
    color: #27ae60;
    font-weight: bold;
    margin-right: 10px;
}

.progress-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 15px;
    margin-bottom: 30px;
}

.stat-card {
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    border-left: 4px solid #3498db;
}

.stat-card h3 {
    font-size: 0.9em;
    color: #7f8c8d;
    margin-bottom: 10px;
}

.stat-card span {
    font-size: 1.8em;
    font-weight: bold;
    color: #2c3e50;
}

.recent-feedback {
    margin-top: 30px;
}

.recent-feedback h3 {
    margin-bottom: 15px;
    color: #2c3e50;
}

.feedback-entry {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 10px;
    border-left: 4px solid #3498db;
}

.feedback-date {
    font-size: 0.8em;
    color: #7f8c8d;
    margin-bottom: 5px;
}

.feedback-rating {
    font-weight: bold;
    color: #3498db;
}

.bottom-nav {
    display: flex;
    background: #2c3e50;
    border-top: 1px solid #34495e;
}

.nav-btn {
    flex: 1;
    background: none;
    border: none;
    color: #bdc3c7;
    padding: 15px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;
}

.nav-btn.active {
    color: #3498db;
    background: #34495e;
}

.nav-btn:hover {
    background: #34495e;
    color: #ecf0f1;
}

@media (max-width: 480px) {
    .container {
        max-width: 100%;
    }
    
    header {
        padding: 15px;
    }
    
    .screen {
        padding: 15px;
    }
    
    .progress-stats {
        grid-template-columns: 1fr;
    }
}