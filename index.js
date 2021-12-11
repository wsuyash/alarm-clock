// Displaying the current time in the clock-face
const clockFace = document.getElementById('clock-face');

const date = new Date();
function showTime() {
    let hour = date.getHours();
    if(hour > 12) {
        hour = hour - 12;

        if(hour < 10) {
            hour = "0" + hour;
        }
    }
    clockFace.innerHTML = hour;
}

// Populating the hours(HH), minutes(MM) and seconds(SS) in the "hours", "minutes" and "seconds" select tags respectively
const selectHours = document.getElementById('hours');
const selectMinutes = document.getElementById('minutes');
const selectSeconds = document.getElementById('seconds');
for(let i = 0; i < 60; i++) {
    let newOptionHours = document.createElement("OPTION");
    let newOptionMinutes = document.createElement("OPTION");
    let newOptionSeconds = document.createElement("OPTION");

    if(i < 10) {
        i = "0" + i;
    }

    if(i < 24) { // limit for hours is 23
        selectHours.appendChild(newOptionHours).innerHTML = i;
        newOptionHours.setAttribute('value', i);
    }

    selectMinutes.appendChild(newOptionMinutes).innerHTML = i;
    newOptionMinutes.setAttribute('value', i);

    selectSeconds.appendChild(newOptionSeconds).innerHTML = i;
    newOptionSeconds.setAttribute('value', i);
}

// Setting default AM/PM depending on the current time
const selectAMPM = document.getElementById('am-pm');
if (date.getHours() > 12) {
    document.getElementById('pm').setAttribute('selected', 'true');
}else {
    document.getElementById('am').setAttribute('selected', 'true');
}