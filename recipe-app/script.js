const mealsEl = document.getElementById("meals");

async function getRandomMeal() {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const meals = await resp.json();
    const meal = meals.meals[0];

    addMeal(meal);
}



async function getMealByID(id) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
    const meals = await resp.json();
    const meal = meals.meals[0];

    return meal;
}

async function getMealsBySearch(term) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="+term.replace(" ", "%20"));
    const meals = await resp.json();
    const meal = meals.meals[0];

    return meal;
}


function addMeal(mealData, isActive = false) {
    const meal = document.createElement("div");
    const mealCount = mealsEl.childElementCount
    meal.innerHTML = `<div class="meal" id="meal-${mealCount}">

    <div class="meal-header">
        <span class="random">${mealData.strMeal}</span>
    
        <img src="${mealData.strMealThumb}" alt="">
    </div>
    <div class="meal-body">
        <h4>${mealData.strCategory}</h4>
        <button class="heart">
            <i class="fa-solid fa-heart"></i>                      
        </button>
    </div>
    </div>`

    if (isActive) meal.querySelector(".fa-heart").classList.add("active");

    meal.querySelector(".heart").addEventListener("click", (e)=> {
        //alert("I am meal " + mealCount);
        let me = e.target;
        
        if (me.classList.contains('active')) {
            removeMealFromLS(mealData.idMeal);
            removeMealFromFav(mealData);
            me.classList.remove("active");
            //me.style.color = "gray"
        }else {
            addMealToLS(mealData.idMeal);
            addMealToFav(mealData);
            me.classList.add("active");
           //me.style.color = "aqua";
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
