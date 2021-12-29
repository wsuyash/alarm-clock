// Getting the current time in the desired format
function getCurrentTime(date) {
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

	return hour + ":" + minute + ":" + second + " " + ampm;
}

// Displaying the current time in the clock-face
const clockFace = document.getElementById('clock-face');
function showTime() {
	const date = new Date(); // Getting current date
	clockFace.innerHTML = getCurrentTime(date);
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
const setAlarmBtn = document.getElementById('set-alarm'); // applying click event on "Set Alarm" button

let alarmsArray = []; // List of alarms
let alarmTimeout; // Variable used to clearTimeout for deleting alarms

// Function to set the alarm
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

	// Converting user-input to proper JavaScript Date() format
	const alarmDateTime = new Date(year + "-" + (month + 1) + "-" + day + " " + getHours + ":" + getMinutes + ":" + getSeconds);
	if(isNaN(alarmDateTime)) {
		alert("Invalid Time")
		return;
	}	

 	if (currentDateTime > alarmDateTime) {
		alert('The time you have set has already passed. Try a time in the future.');
		return;
	}

	let timeToAlarm = alarmDateTime - currentDateTime; // Time until alarm rings

	alarmTimeout = setTimeout(ringAlarm, timeToAlarm); // Setting alarm
	
	// Inserting new alarm into alarmsArray
	alarmsArray.push(alarmDateTime);
	// alarmsArray.sort(); // Sorting the alarms in ascending order

	// Passing the index of new alarm to display
	displayNewAlarm(alarmsArray.indexOf(alarmDateTime), alarmTimeout);
}
setAlarmBtn.addEventListener('click', setAlarm);

// Function to ring the alarm
function ringAlarm() {
	const time = getCurrentTime(new Date());
	alert('Alarm ringing for ' + time + '... ');
	deleteAlarmAfterRinging(time); // Delete the alarm after it rings
}

// List of set alarms
function displayNewAlarm(index, timeout) {
	let time = alarmsArray[index];

	let setAlarmsList = document.getElementById('set-alarms-list');
	let newAlarm = document.createElement('li');
	setAlarmsList.appendChild(newAlarm);
	newAlarm.setAttribute("class", "set-alarms-container");

	let newP = document.createElement('p');
	let newDeleteButton = document.createElement('button');
	let icon = document.createElement('i');
	newAlarm.appendChild(icon).setAttribute( "class", "fa-solid fa-bell");;
	newAlarm.appendChild(newP);
	newAlarm.appendChild(newDeleteButton);
	newP.setAttribute("class", "alarm-time");
	newDeleteButton.setAttribute("class", "btn delete-alarm-btn")
	newDeleteButton.setAttribute("id", timeout);
	newDeleteButton.innerHTML = "Delete";

	newP.innerHTML = getCurrentTime(time);
}

// Delete alarm after it rings
const alarms = document.getElementsByClassName('set-alarms-container');
function deleteAlarmAfterRinging(alarmToDelete) {
	for (let i = 0; i < alarms.length; i++) {
		// if (alarms[i].firstChild.innerHTML === alarmToDelete){
		if (alarms[i].firstChild.nextSibling.innerHTML === alarmToDelete){
			alarms[i].remove();
			alarmsArray.splice(i, 1);
		}
	}
}

// Delete Alarms using "Delete" button
document.querySelector('ul').addEventListener('click', function(event) {
	if(event.target.tagName.toLowerCase() == 'button') {
		indexOfAlarmToDelete = alarmsArray.indexOf(event.target.parentElement.firstChild.innerHTML);
		alarmsArray.splice(indexOfAlarmToDelete, 1);
		clearTimeout(event.target.id);
		event.target.parentElement.remove();
	}
});
