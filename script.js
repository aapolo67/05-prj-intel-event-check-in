// DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greeting = document.getElementById("greeting");

// Attendance tracker
let count = 0;
const maxCount = 50;

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

  console.log("Total check-ins: " + count);

  // Update progress bar
  const percentage = Math.round((count / maxCount) * 100);
  progressBar.style.width = `${percentage}%`;

  // Update team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  // Welcome message
  const message = `Welcome, ${name} from ${teamName}`;
  greeting.textContent = message;

  console.log(message);

  form.reset();
});
