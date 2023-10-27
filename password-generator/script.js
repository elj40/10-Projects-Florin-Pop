const characters = [[33, 64], //Special
        [65, 90],   //Uppercase
        [97,122]    //lowercase
    ]

const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy");
const passwordEl = document.getElementById("password");

generateBtn.onclick = function generatePassword() {
    const useNumbers = document.getElementById("number").checked;
    const useUpper = document.getElementById("upper").checked;
    const useLower = document.getElementById("lower").checked;
    const useSpecial = document.getElementById("symbol").checked;
    let length = document.getElementById("length").valueAsNumber;

    length = Math.min(20, Math.max(length, 4));

    let password = ''
    let i = 0;

    if (!useNumbers && !useUpper && !useLower && !useSpecial) {
        alert("At least one option must be selected");
        return;
    }

    while (i<length) {
        index = Math.floor(Math.random()*4);
        if (index == 0 && !useSpecial) continue;
        if (index == 1 && !useUpper) continue;
        if (index == 2 && !useLower) continue;
        if (index == 3 && !useNumbers) continue;

        let li = Math.floor(Math.random()*(characters[index][1]-characters[index][0])) + characters[index][0];

        if (index < 3) password += String.fromCharCode(li);
        else password += Math.floor(Math.random()*10).toString();
        i++;
    }

    passwordEl.innerText = password;

}

copyBtn.addEventListener("click", (e)=> {
    navigator.clipboard.writeText(passwordEl.innerText);
    alert("Copied text: "+ passwordEl.innerText);
})