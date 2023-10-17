const firstDay = "17 Feb 2024";

var daysElement;
var hoursElement;
var minutesElement;
var secondsElement;

window.onload = () => {
    daysElement = document.getElementById("days");
    hoursElement = document.getElementById("hours");
    minutesElement = document.getElementById("minutes");
    secondsElement = document.getElementById("seconds");

setInterval(countdown, 1000);

}

function formatTime(time) {
    return time < 10 ? (`0${time}`) : time;
}


function countdown() {
    const currentDate = new Date();
    const firstDayDate = new Date(firstDay);

    difference = firstDayDate - currentDate;
    const days = Math.floor(difference / 24 / 60 / 60 / 1000);
    difference -= days * 24 * 60 * 60 * 1000;

    const hours = Math.floor(difference / 60 / 60 / 1000);
    difference -= hours * 60 * 60 * 1000;

    const minutes = Math.floor(difference / 60 / 1000);
    difference -= minutes * 60 * 1000;

    const seconds = Math.floor(difference / 1000);
    
    daysElement.innerText = formatTime(days);
    hoursElement.innerText = formatTime(hours);
    minutesElement.innerText = formatTime(minutes);
    secondsElement.innerText = formatTime(seconds);

    console.log(days,hours,minutes,seconds);


}

