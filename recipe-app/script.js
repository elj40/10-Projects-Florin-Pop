async function getRandomMeal() {
    const randomMeal = await fetch("www.themealdb.com/api/json/v1/1/random.php")

    console.log(randomMeal);
}

async function getMealByID(id) {
    const meal = await fetch("www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
}

async function getMealsBySearch(term) {
    const meal = await fetch("www.themealdb.com/api/json/v1/1/search.php?s="+term);
}

getRandomMeal();