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

	alarmTimeout = setTimeout(ringAlarm, timeToAlarm); // Setting alarm and storing its timeout so we can delete this alarm using this variable later
	
	// Inserting new alarm into alarmsArray
	alarmsArray.push(alarmDateTime);

	// Passing the index of new alarm to display
	displayNewAlarm(alarmsArray.indexOf(alarmDateTime), alarmTimeout);
}
setAlarmBtn.addEventListener('click', setAlarm); // Click event listener on the 'Set Alarm" button

// Function to ring the alarm
function ringAlarm() {
	const time = getCurrentTime(new Date());
	deleteAlarmAfterRinging(time); // Delete the alarm after it rings
	alert('Alarm ringing for ' + time + '... '); // Alerting the user
}

// List of set alarms
function displayNewAlarm(index, timeout) {
	let time = alarmsArray[index]; // Get the alarm time to be displayed

	let setAlarmsList = document.getElementById('set-alarms-list'); // Get the parent 'ul' element
	let newAlarm = document.createElement('li'); // Creating a new 'li' element

	// Appending it to the parent, i.e., the 'ul' element with id='set-alarms-list' and setting the new 'li' element's attributes
	setAlarmsList.appendChild(newAlarm);
	newAlarm.setAttribute("class", "set-alarms-container");

	// Creating a new 'i', 'p', and 'button' element for displaying alarm icon, alarm time, and delete button respectively
	let newIcon = document.createElement('i');
	let newP = document.createElement('p');
	let newDeleteButton = document.createElement('button');

	// Appending the newly created elements to the parent 'li' element
	newAlarm.appendChild(newIcon);
	newAlarm.appendChild(newP);
	newAlarm.appendChild(newDeleteButton);

	// Setting attributes for the newly created and appended elements
	newIcon.setAttribute("class", "fa-solid fa-bell")
	newP.setAttribute("class", "alarm-time");
	newDeleteButton.setAttribute("class", "btn delete-alarm-btn")
	newDeleteButton.setAttribute("id", timeout);

	// Displaying info on the 'p' and 'delete button'
	newDeleteButton.innerHTML = "Delete";
	newP.innerHTML = getCurrentTime(time);
}

// Delete alarm after it rings
const alarms = document.getElementsByClassName('set-alarms-container'); // Get all the set alarms from DOM
function deleteAlarmAfterRinging(alarmToDelete) {
	for (let i = 0; i < alarms.length; i++) { // Looping through the displayed alarms to find the one to delete after it has rung
		if (alarms[i].firstChild.nextSibling.innerHTML === alarmToDelete){ // If found
			alarms[i].remove(); // Removing it from the alarms list
			alarmsArray.splice(i, 1); // Removing it from the universal alarmsArray[] as well
		}
	}
}

// Delete Alarms using "Delete" button
document.querySelector('ul').addEventListener('click', function(event) { // Adding event listener to the parent of dynamically added elements
	if(event.target.tagName.toLowerCase() == 'button') { // Adding event listener to the delete button
		indexOfAlarmToDelete = alarmsArray.indexOf(event.target.parentElement.firstChild.innerHTML); // Getting the index of the alarm that is to be deleted from the alarmsArray
		alarmsArray.splice(indexOfAlarmToDelete, 1); // Deleting the alarm from the alarmsArray
		clearTimeout(event.target.id); // Clearing timeout so we don't get the browser alert
		event.target.parentElement.remove(); // Deleting the container element that has the icon, alarm and delete button
	}
});
