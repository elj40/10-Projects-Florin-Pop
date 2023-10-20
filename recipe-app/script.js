const mealsEl = document.getElementById("meals");

async function getRandomMeal() {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const meals = await resp.json();
    const meal = meals.meals[0];

    addMeal(meal);
}



async function getMealByID(id) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
    if (resp == null) {
        alert("Could not find recipe");
        return;
    }
    
    const meals = await resp.json();
    const meal = meals.meals[0];

    return meal;
}

async function getMealsBySearch(term) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="+term.replace(" ", "%20"));
    if (resp == null) {
        alert("Could not find recipe");
        return;
    }
    
    const meals = await resp.json();
    const meal = meals.meals[0];

    return meal;
}

async function search() {
    const searchTerm = document.getElementById("search-term");

    let mealData = await getMealsBySearch(searchTerm.value);
    addMeal(mealData);
}


function addMeal(mealData, isActive = false) {
    const meal = document.createElement("div");
    const mealCount = mealsEl.childElementCount
    meal.innerHTML = `<div class="meal" id="meal-${mealCount}">

    <div class="meal-header">
        <span class="random">${mealData.strMeal}</span>
    
        <img src="${mealData.strMealThumb}" alt="">
        <p class="instructions">${mealData.strInstructions}</p>
    </div>
    <div class="meal-body">
        <h4>${mealData.strCategory}</h4>
        <button class="info">
            <i class="fa-solid fa-info"></i>
        </button>
        <button class="heart">
            <i class="fa-solid fa-heart"></i>                      
        </button>
    </div>
    </div>`

    if (isActive) meal.querySelector(".fa-heart").classList.add("active");

    meal.querySelector(".heart").addEventListener("click", (e)=> {

        let me = e.target;
        
        if (me.classList.contains('active')) {
            removeMealFromLS(mealData.idMeal);
            removeMealFromFav(mealData);
            me.classList.remove("active");

        }else {
            addMealToLS(mealData.idMeal);
            addMealToFav(mealData);
            me.classList.add("active");

        }
    })

    meal.querySelector(".info").addEventListener("click", (e)=> {
        let t = e.target;

        const image = meal.getElementsByTagName("img")[0];
        const random = meal.querySelector(".random");
        const p = meal.querySelector(".instructions");


        if (t.classList.contains("open")) {
            image.style.display = "block";
            random.style.display = "block";
            p.style.display = "none";
            t.classList.remove("open");
        }else {
            image.style.display = "none";
            random.style.display = "none";
            p.style.display = "block";
            t.classList.add("open");
        }
    })

    mealsEl.innerHTML = "";
    mealsEl.appendChild(meal);
}

function addMealToFav(mealData) {

    const favMeals = document.getElementById("fav-meals");
    const favMeal = document.createElement("li");
    favMeal.innerHTML = `<img src="${mealData.strMealThumb}" alt=""><span>${mealData.strMeal}</span>`
    
    favMeal.addEventListener("click", async ()=> {
        const mealName = favMeal.getElementsByTagName("span")[0].innerText;
        const mealData = await getMealsBySearch(mealName);

        console.log(mealName, mealData);
        addMeal(mealData, true);
    })
    favMeals.appendChild(favMeal);
}

function removeMealFromFav(mealData) {
    const favMeals = document.getElementById("fav-meals");
    for (let i = favMeals.children.length-1; i >=0 ; i--) {
        const child = favMeals.children[i];
        const favName = child.getElementsByTagName("span")[0].innerText;
        if (favName == mealData.strMeal) favMeals.removeChild(child);
    } 
}

function addMealToLS(mealId) {
    const mealIds = getMealsFromLS();

    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}

function removeMealFromLS(mealId) {
    const mealIds = getMealsFromLS();

    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter(id => id !== mealId)));
}

function getMealsFromLS() {
    const mealIds = JSON.parse(localStorage.getItem("mealIds"));

    return mealIds === null ? [] : mealIds;
}

async function loadFavMeals() {
    const allMeals = getMealsFromLS();

    for (let id of allMeals) {
        const meal = await getMealByID(id);

        addMealToFav(meal);
    }
}

loadFavMeals();
getRandomMeal();
