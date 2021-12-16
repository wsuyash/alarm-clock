// Displaying the current time in the clock-face
const clockFace = document.getElementById('clock-face');
function showTime() {
	const date = new Date(); // Getting current date
	let hour = date.getHours(); // Getting current hour
	let minute = date.getMinutes(); // Getting current minutes
	let second = date.getSeconds(); // Getting current seconds
	let ampm = "AM";

	if (hour >= 12) {
		ampm = "PM";
	}

	// Converting hour into 12-hour format
	if (hour > 12) {
		hour = hour - 12;
	}
	if (hour == 0) {
		hour = 12;
	}

	// Prepending 0 to single-digit values
	hour = (hour < 10) ? ("0" + hour) : hour;
	minute = (minute < 10) ? ("0" + minute) : minute;
	second = (second < 10) ? ("0" + second) : second;

	clockFace.innerHTML = hour + " : " + minute + " : " + second + " " + ampm;
}
setInterval(showTime, 1000); // Running showTime() every second to update the time

// Populating the hours(HH), minutes(MM) and seconds(SS) in the "hours", "minutes" and "seconds" select tags respectively
const selectHours = document.getElementById('hours');
const selectMinutes = document.getElementById('minutes');
const selectSeconds = document.getElementById('seconds');
for (let i = 0; i < 60; i++) {
	let newOptionHours = document.createElement("OPTION");
	let newOptionMinutes = document.createElement("OPTION");
	let newOptionSeconds = document.createElement("OPTION");

	if (i < 10) {
		i = "0" + i;
	}

	if (i > 0 && i < 13) { // limit for hours is 12
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
const date = new Date(); // Getting the current date

// Automatically selecting AM or PM option depending on the current hour
if (date.getHours() >= 12) {
	document.getElementById('pm').setAttribute('selected', 'true');
} else {
	document.getElementById('am').setAttribute('selected', 'true');
}

// Set Alarm funcionality
const setAlarmBtn = document.getElementById('set-alarm');

function setAlarm() {
	let getHours = document.getElementById('hours').value;
	let getMinutes = document.getElementById('minutes').value;
	let getSeconds = document.getElementById('seconds').value;
	let getAMPM = document.getElementById('am-pm').value;

	if (getHours < 10) {
		getHours = parseInt(getHours);
	}
	if (getAMPM == "PM") {
		if (getHours != 12) {
			getHours = parseInt(getHours) + 12 + "";
		}
	} else {
		if (getHours == 12) {
			getHours = "00";
		}
	}

	const currentDateTime = new Date();
	const year = currentDateTime.getFullYear();
	const month = currentDateTime.getMonth();
	const day = currentDateTime.getDate();

	const alarmDateTime = new Date(year + "-" + (month + 1) + "-" + (day) + " " + getHours + ":" + getMinutes + ":" + getSeconds);
	
 	if (currentDateTime > alarmDateTime) {
		alert('The time you have set has already passed. Try a time in the future.');
		return;
	}

	let timeToAlarm = alarmDateTime - currentDateTime;
	setTimeout(ringAlarm, timeToAlarm);
}
setAlarmBtn.addEventListener('click', setAlarm);

function ringAlarm() {
	alert('Alarm ringing...');
}