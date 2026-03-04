

//  SELECT DOM ELEMENTS
const totalCalDisplay = document.querySelector('.stat-card:nth-child(1) .stat-value');
const consumedCalDisplay = document.querySelector('.stat-card:nth-child(2) .stat-value');
const burnedCalDisplay = document.querySelector('.stat-card:nth-child(3) .stat-value');
const remainingCalDisplay = document.querySelector('.purple-bg .stat-value');
const remainingCard = document.querySelector('.purple-bg');
const goalDisplay = document.querySelector('.goal-number');

const mealItemsContainer = document.querySelector('.tracking-card:nth-child(1) .card-body');
const workoutItemsContainer = document.querySelector('.tracking-card:nth-child(2) .card-body');

const editLimitBtn = document.querySelector('.edit-btn');
const addMealBtn = document.querySelector('.green-bg .add-btn');
const addWorkoutBtn = document.querySelector('.orange-bg .add-btn');
const resetBtn = document.querySelector('.btn-reset');

//  INITIALIZE STATE (Load from LocalStorage or use Defaults)
let state = JSON.parse(localStorage.getItem('tracalorie_data')) || {
    calorieLimit: 2000,
    meals: [],
    workouts: []
};



// Save current state to browser memory
function save() {
    localStorage.setItem('tracalorie_data', JSON.stringify(state));
}

// Recalculate all numbers and update the dashboard UI
function updateStats() {
    const consumed = state.meals.reduce((total, meal) => total + meal.calories, 0);
    const burned = state.workouts.reduce((total, workout) => total + workout.calories, 0);
    const totalNet = consumed - burned;
    const remaining = state.calorieLimit - totalNet;

    // Update Text Values
    consumedCalDisplay.textContent = consumed;
    burnedCalDisplay.textContent = burned;
    totalCalDisplay.textContent = totalNet;
    remainingCalDisplay.textContent = remaining;
    goalDisplay.textContent = state.calorieLimit;

    // UI Logic: Turn remaining card RED if limit exceeded
    if (remaining < 0) {
        remainingCard.style.background = 'linear-gradient(135deg, #ef4444, #b91c1c)';
    } else {
        remainingCard.style.background = 'linear-gradient(135deg, #a78bfa, #8b5cf6)';
    }
}

// Clear containers and render the list items (Meals/Workouts)
function renderLists() {
    // Helper to generate empty state HTML
    const emptyState = (icon, text) => `
        <div class="empty-state">
            <div class="empty-icon"><i class="fas ${icon}"></i></div>
            <p>${text}</p>
        </div>`;

    // Render Meals
    if (state.meals.length === 0) {
        mealItemsContainer.innerHTML = emptyState('fa-utensils', 'No meals added yet');
    } else {
        mealItemsContainer.innerHTML = state.meals.map(meal => `
            <div class="list-item" style="display:flex; justify-content:space-between; align-items:center; padding:12px; border-bottom:1px solid #eee; width:100%; text-align:left;">
                <span style="font-weight:600; color:#444;">${meal.name}</span>
                <span style="background:#22c55e; padding:4px 10px; border-radius:6px; color:white; font-size:0.8rem; font-weight:bold;">${meal.calories}</span>
            </div>
        `).join('');
    }

    // Render Workouts
    if (state.workouts.length === 0) {
        workoutItemsContainer.innerHTML = emptyState('fa-dumbbell', 'No workouts logged yet');
    } else {
        workoutItemsContainer.innerHTML = state.workouts.map(workout => `
            <div class="list-item" style="display:flex; justify-content:space-between; align-items:center; padding:12px; border-bottom:1px solid #eee; width:100%; text-align:left;">
                <span style="font-weight:600; color:#444;">${workout.name}</span>
                <span style="background:#f97316; padding:4px 10px; border-radius:6px; color:white; font-size:0.8rem; font-weight:bold;">${workout.calories}</span>
            </div>
        `).join('');
    }
}



// Edit Daily Goal
editLimitBtn.addEventListener('click', () => {
    const newLimit = prompt('Set Daily Calorie Goal:', state.calorieLimit);
    if (newLimit && !isNaN(newLimit)) {
        state.calorieLimit = parseInt(newLimit);
        save();
        updateStats();
    }
});

// Add a Meal
addMealBtn.addEventListener('click', () => {
    const name = prompt('Meal Name (e.g. Lunch):');
    const cals = prompt('Calories:');
    if (name && cals && !isNaN(cals)) {
        state.meals.push({ id: Date.now(), name, calories: parseInt(cals) });
        save();
        renderLists();
        updateStats();
    }
});

// Add a Workout
addWorkoutBtn.addEventListener('click', () => {
    const name = prompt('Workout Name (e.g. Yoga):');
    const cals = prompt('Calories Burned:');
    if (name && cals && !isNaN(cals)) {
        state.workouts.push({ id: Date.now(), name, calories: parseInt(cals) });
        save();
        renderLists();
        updateStats();
    }
});

// Reset Day
resetBtn.addEventListener('click', () => {
    if (confirm('Reset all meals and workouts for today?')) {
        state.meals = [];
        state.workouts = [];
        save();
        renderLists();
        updateStats();
    }
});


updateStats();
renderLists();