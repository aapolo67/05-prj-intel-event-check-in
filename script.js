// DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greeting = document.getElementById("greeting");
const attendeeList = document.getElementById("attendeeList");
const emptyAttendees = document.getElementById("emptyAttendees");
const resetBtn = document.getElementById("resetBtn");

// Attendance tracker
const maxCount = 50;
let attendees = [];
let count = Number(localStorage.getItem("attendanceCount")) || 0;

const savedAttendees = localStorage.getItem("attendees");

if (savedAttendees) {
  try {
    attendees = JSON.parse(savedAttendees);
  } catch (error) {
    attendees = [];
  }
}

attendeeCount.textContent = count;
progressBar.style.width = `${Math.round((count / maxCount) * 100)}%`;

const teamIds = ["waterCount", "zeroCount", "powerCount"];

teamIds.forEach(function (teamId) {
  const savedTeamCount = Number(localStorage.getItem(teamId)) || 0;
  document.getElementById(teamId).textContent = savedTeamCount;
});

function addAttendeeToList(name, teamName) {
  const attendeeItem = document.createElement("li");
  const attendeeName = document.createElement("strong");
  const attendeeTeam = document.createElement("span");

  attendeeName.textContent = name;
  attendeeTeam.textContent = teamName;
  attendeeItem.appendChild(attendeeName);
  attendeeItem.appendChild(attendeeTeam);
  attendeeList.appendChild(attendeeItem);
}

attendees.forEach(function (attendee) {
  addAttendeeToList(attendee.name, attendee.teamName);
});

if (attendees.length > 0) {
  emptyAttendees.style.display = "none";
}

// Form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, teamName);

  // Increment count
  count++;
  attendeeCount.textContent = count;
  localStorage.setItem("attendanceCount", count);

  console.log("Total check-ins: " + count);

  // Update progress bar
  const percentage = Math.round((count / maxCount) * 100);
  progressBar.style.width = `${percentage}%`;

  // Update team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = Number(teamCounter.textContent) + 1;
  localStorage.setItem(team + "Count", teamCounter.textContent);

  // Add the attendee to the list
  attendees.push({ name: name, teamName: teamName });
  localStorage.setItem("attendees", JSON.stringify(attendees));
  emptyAttendees.style.display = "none";
  addAttendeeToList(name, teamName);

  // Welcome message
  const message = `😤 Welcome, ${name} from ${teamName}!`;
  greeting.textContent = message;
  greeting.style.display = "block";

  if (count >= maxCount) {
    let winningTeamName = "Team Water Wise";
    let winningTeamCount = Number(
      document.getElementById("waterCount").textContent,
    );
    const zeroTeamCount = Number(
      document.getElementById("zeroCount").textContent,
    );
    const powerTeamCount = Number(
      document.getElementById("powerCount").textContent,
    );

    if (zeroTeamCount > winningTeamCount) {
      winningTeamName = "Team Net Zero";
      winningTeamCount = zeroTeamCount;
    }

    if (powerTeamCount > winningTeamCount) {
      winningTeamName = "Team Renewables";
    }

    greeting.textContent = `🎉🎉🎉 Goal reached! ${winningTeamName} is the winning team! 🏆🏆🏆`;
    greeting.classList.add("goal-reached");
  }

  console.log(message);

  form.reset();
});

resetBtn.addEventListener("click", function () {
  count = 0;
  attendees = [];

  localStorage.removeItem("attendanceCount");
  localStorage.removeItem("waterCount");
  localStorage.removeItem("zeroCount");
  localStorage.removeItem("powerCount");
  localStorage.removeItem("attendees");

  attendeeCount.textContent = count;
  progressBar.style.width = "0%";
  teamIds.forEach(function (teamId) {
    document.getElementById(teamId).textContent = 0;
  });

  attendeeList.innerHTML = "";
  emptyAttendees.style.display = "block";
  greeting.textContent = "";
  greeting.style.display = "none";
  greeting.classList.remove("goal-reached");
  form.reset();
});
