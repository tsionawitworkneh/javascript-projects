// 1. DOM Elements
const totalCalDisplay = document.querySelector('.stat-card:nth-child(1) .stat-value');
const consumedCalDisplay = document.querySelector('.stat-card:nth-child(2) .stat-value');
const burnedCalDisplay = document.querySelector('.stat-card:nth-child(3) .stat-value');
const remainingCalDisplay = document.querySelector('.purple-bg .stat-value');
const goalDisplay = document.querySelector('.goal-number');

const mealItemsContainer = document.querySelector('.tracking-card:nth-child(1) .card-body');
const workoutItemsContainer = document.querySelector('.tracking-card:nth-child(2) .card-body');

// 2. Initial State
let state = {
    calorieLimit: 2000,
    meals: [],
    workouts: []
};

// 3. The "Master" function to update the UI
function updateStats() {
    const consumed = state.meals.reduce((total, meal) => total + meal.calories, 0);
    const burned = state.workouts.reduce((total, workout) => total + workout.calories, 0);
    const totalNet = consumed - burned;
    const remaining = state.calorieLimit - totalNet;

    // Update Text
    consumedCalDisplay.textContent = consumed;
    burnedCalDisplay.textContent = burned;
    totalCalDisplay.textContent = totalNet;
    remainingCalDisplay.textContent = remaining;
    goalDisplay.textContent = state.calorieLimit;

    // Change color of "Remaining" if negative
    const remainingCard = document.querySelector('.purple-bg');
    if (remaining < 0) {
        remainingCard.style.background = 'linear-gradient(135deg, #ef4444, #b91c1c)'; // Red
    } else {
        remainingCard.style.background = 'linear-gradient(135deg, #a78bfa, #8b5cf6)'; // Purple
    }
}

// Run once on load
updateStats();


const editLimitBtn = document.querySelector('.edit-btn');

editLimitBtn.addEventListener('click', () => {
    const newLimit = prompt('Enter your daily calorie limit:', state.calorieLimit);
    
    if (newLimit !== null && !isNaN(newLimit) && newLimit > 0) {
        state.calorieLimit = parseInt(newLimit);
        updateStats();
    }
});

const addMealBtn = document.querySelector('.green-bg .add-btn');
const addWorkoutBtn = document.querySelector('.orange-bg .add-btn');

// Add Meal Logic
addMealBtn.addEventListener('click', () => {
    const name = prompt('Meal Name (e.g., Breakfast):');
    const calories = prompt('Calories:');

    if (name && calories) {
        state.meals.push({ id: Date.now(), name, calories: parseInt(calories) });
        renderLists();
        updateStats();
    }
});

// Add Workout Logic
addWorkoutBtn.addEventListener('click', () => {
    const name = prompt('Workout Name (e.g., Running):');
    const calories = prompt('Calories Burned:');

    if (name && calories) {
        state.workouts.push({ id: Date.now(), name, calories: parseInt(calories) });
        renderLists();
        updateStats();
    }
});

function renderLists() {
    // Clear and Render Meals
    if (state.meals.length > 0) {
        mealItemsContainer.innerHTML = state.meals.map(meal => `
            <div class="list-item" style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #eee; width:100%">
                <span>${meal.name}</span>
                <span class="badge green-bg" style="padding:2px 8px; border-radius:5px; color:white">${meal.calories}</span>
            </div>
        `).join('');
    }

    // Clear and Render Workouts
    if (state.workouts.length > 0) {
        workoutItemsContainer.innerHTML = state.workouts.map(workout => `
            <div class="list-item" style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #eee; width:100%">
                <span>${workout.name}</span>
                <span class="badge orange-bg" style="padding:2px 8px; border-radius:5px; color:white">${workout.calories}</span>
            </div>
        `).join('');
    }
}



const resetBtn = document.querySelector('.btn-reset');

resetBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset everything?')) {
        state.meals = [];
        state.workouts = [];
        
        // Restore empty state messages
        mealItemsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon"><i class="fas fa-utensils"></i></div>
                <p>No meals added yet</p>
            </div>`;
            
        workoutItemsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon"><i class="fas fa-dumbbell"></i></div>
                <p>No workouts logged yet</p>
            </div>`;

        updateStats();
    }
});