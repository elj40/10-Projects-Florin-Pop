const USER_API = 'https://api.github.com/users/'

const main = document.querySelector("main");
const form = document.querySelector("form");
const search = document.getElementById("search");

async function getUser(user) {
    const resp = await fetch(USER_API+user);
    const respData = await resp.json()

    console.log(respData);

    createUserCard(respData);

}

function createUserCard(user) {

    const cardHTML = `
    <div class="card">
        <div class="avatar">
        <img src="${user.avatar_url}" alt="${user.name}"/>
        </div>
        <div class="info">
            <h2><a href="${user.html_url}">${user.name}</a></h2>
            <p>${user.bio}</p>

            <ul>
                <li><i class="fa-regular fa-eye"></i>&emsp;${user.followers}</li>
                <li><i class="fa-regular fa-heart"></i>&emsp;${user.following}</li>
                <li><i class="fa-solid fa-receipt"></i>&emsp;${user.public_repos}</li>
                
            </ul>
        </div>
    </div>
    `

    main.innerHTML = cardHTML;
}

form.addEventListener("submit", (e)=>{
    e.preventDefault();

    const user = search.value;

    if(user) {
        getUser(user)
    }
});

getUser("elj40");