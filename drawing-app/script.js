const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const sizeAdjuster = document.getElementById("size-adjust");
const colorPicker = document.getElementById("color-picker");
const clearBtn = document.getElementById("clear");

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

let isPressed = false;
let previousMouseX, previousMouseY; 

sizeAdjuster.addEventListener("change", (e)=> {
    const thumb = document.querySelector(".toolbox").style.setProperty("--thumb-size", sizeAdjuster.value + "px");
});

canvas.addEventListener("mousedown", (mouse)=>{ isPressed=true;console.log(mouse) })
canvas.addEventListener("mouseup", ()=>{ isPressed=false; })

canvas.addEventListener("mousemove" ,(mouse)=>{ 
    if (isPressed) {
        let x = mouse.offsetX;
        let y = mouse.offsetY;
        ctx.strokeStyle = colorPicker.value;
        line(x,y,previousMouseX,previousMouseY);
    }

    previousMouseX = mouse.offsetX;
    previousMouseY = mouse.offsetY;
});

clearBtn.onclick = function clear() {
    console.log("clear");
    ctx.clearRect(0,0,canvas.width,canvas.height);
}


function circle(x,y,r) {
    ctx.beginPath();
    ctx.arc(x,y,r, 0, 2*Math.PI);
    ctx.fill();
    ctx.stroke();
}

function line(x1,y1,x2,y2) {
    ctx.save;

    ctx.lineWidth = 1;
    ctx.fillStyle = colorPicker.value;
    circle(x2,y2,sizeAdjuster.value/2 - 1);


    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);

    ctx.lineWidth = sizeAdjuster.value;

    ctx.stroke();

    ctx.restore;
}
