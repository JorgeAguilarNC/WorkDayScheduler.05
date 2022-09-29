var today = new Date();
var weekday = today.getDate();
var month = today.getFullYear();
var currentTime = Number(
  today
    .toLocaleString("en-US", { hour: "2-digit", hour12: false })
    .slice(0, 2)
    .trim()
);
const container = document.getElementsByClassName("container");
// Save button
function isSaveButton(event) {
  return event.target.matches("button") || event.target.matches(".fa-save");
}
//local storage
let savedData = JSON.parse(localStorage.getItem("savedData"));
if (!savedData) {
  savedData = {};
}
//color for rows
const timeNodes = document.getElementsByClassName("hour");
let timeArr = Object.values(timeNodes);

timeArr.forEach((time) => {
  if (savedData[time.textContent]) {
    $(".hour").each(function (item) {
      if ($(this).text() == time.textContent) {
        $(this).siblings("textarea").val(savedData[time.textContent]);
      }
    });
  }
  let timeNumber = Number(
    time.textContent
      .toLocaleString("en-US", { hour: "2-digit", hour12: true })
      .slice(0, 2)
      .trim()
  );
  if (timeNumber < 6) {
    timeNumber += 12;
  }
  timeNumber > currentTime
    ? time.nextElementSibling.classList.add("future")
    : null;
  timeNumber == currentTime
    ? time.nextElementSibling.classList.add("present")
    : null;
  timeNumber < currentTime
    ? time.nextElementSibling.classList.add("past")
    : null;
});

$(".saveBtn").click(function (e) {
  let time = $(this).siblings(".hour").text();
  let data = $(this).siblings("textarea").val();
  savedData[time] = data;
  localStorage.setItem("savedData", JSON.stringify(savedData));
});
