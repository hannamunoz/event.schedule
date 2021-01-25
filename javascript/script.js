// I need a var to store my blocks of time in
let container = document.querySelector(".calendar-container");
// I need a var that stores the hours in a loop continuously in order
let hoursArray = ["9", "10", "11", "12", "13", "14", "15", "16", "17"];
// I need a var to show current Day, Month, Year
let currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
// setInterval
setInterval(updateTime, 1000);

displayEvents();


// Function to stringify text to localStorage
function saveHourEvent(hour) {
    let events = localStorage.getItem("events");
    let textValue = document.getElementById(hour).value;
    let updatedEvents;
    if (events !== null) {
        let parsedEvents = JSON.parse(events);
        let index = parsedEvents.findIndex((obj) => {
            return obj.hour === hour;
        });
        console.log(index);
        if (index === -1){
            parsedEvents.push({ hour: hour, value: textValue});
        } else {
            parsedEvents[index].value = textValue
        }
        updatedEvents = JSON.stringify(parsedEvents);
    } else {
        updatedEvents = JSON.stringify([{hour: hour, value: textValue}]);
    }
    localStorage.setItem("events", updatedEvents);
    displayEvents();
}

// Function to parse text from localStorage to display in event space
// if text exists, render it
// else display none
function displayEvents() {
    let events = localStorage.getItem("events");
    if (events!== null){
        let parsedEvents = JSON.parse(events);
        parsedEvents.forEach( (event) => {
            document.getElementById(event.hour).value = event.value;
        })
    }
}

// Timer function to display current date and time at the top of the screen
function updateTime() {
    currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
    document.getElementById("currentDay").innerHTML = currentDate;
    updateTimeBlocks();
}
// Function that calls on timer to display different colors on each hour
function updateTimeBlocks() {
    let currentTime = moment().format('H');
    hoursArray.forEach((hour) => {
        if (parseInt(currentTime) > parseInt(hour)) {
            document.getElementById(hour).classList = "past";
        } else if (currentTime === hour) {
            document.getElementById(hour).classList = "present";
        } else {
            document.getElementById(hour).classList = "future";
        }
    });
}