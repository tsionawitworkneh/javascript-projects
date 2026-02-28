const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search');
const recipeContainer = document.querySelector(".recipies");
const samples = document.querySelectorAll(".sample");

console.log(recipeContainer);
console.log(samples);


searchBtn.addEventListener('click', () => {
    searchRecipes(searchInput.value.trim());
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        searchRecipes(searchInput.value.trim());
    }
});

samples.forEach(button => {
    button.addEventListener('click', () => {
        searchInput.value = button.textContent;
        searchRecipes(button.textContent);
    });
});

async function searchRecipes(query) {
    if (!query) return;

    recipeContainer.innerHTML = "Loading....";

    try {
        const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        );

        const data = await response.js;

        recipeContainer.innerHTML = "";
        if (!data.meals) {
            recipeContainer.innerHTML = "<p>No recipes found.</p>";
            return;
        }
        data.meals.forEach(meal => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="card-content">
                    <h3>${meal.strMeal}</h3>
                    <div class="meta">${meal.strCategory} • ${meal.strArea}</div>
                    <div class="instructions">
                        ${meal.strInstructions.substring(0, 120)}...
                    </div>
                </div>
            `;

            recipeContainer.appendChild(card);
        });

    } catch (error) {
        recipeContainer.innerHTML = "Something went wrong.";
    }
}

