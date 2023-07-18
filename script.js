// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  let btn = $("button");
  let addP = $("#currentDay");
  let textarea = $("textarea");

  function dispalyTime() { 
    $("header").css({
      display: "flex",
      "flex-direction": "column",
      "align-items": "center",
    });
    let current = dayjs().format("MMMM-dddd-YYYY");
    addP.text(current);
  }
function matchTime(){ 
 let idList = [
      $("#hour-9"),
      $("#hour-10"),
      $("#hour-11"),
      $("#hour-12"),
      $("#hour-1"),
      $("#hour-2"),
      $("#hour-3"),
      $("#hour-4"),
      $("#hour-5"),
    ];
    console.log(idList);
    const currentTime = dayjs().format("h");
    let timeID = `hour-${currentTime}`;
    console.log(timeID);
    let matchCurrentTime = parseInt(timeID.replace(/[^\d]/g, " "));

    for (let i = 0; i < idList.length; i++) {
      console.log(idList[i]);
      console.log(idList[i].attr("id"));
      let lastNum = parseInt(idList[i].attr("id").replace(/[^\d]/g, " "));
      if (lastNum >= 1 && lastNum <= 5) {
        lastNum = lastNum + 12;
      }
      console.log(`listNumber is ${lastNum}`);
      if (matchCurrentTime >= 1 && matchCurrentTime < 9) {
        matchCurrentTime = matchCurrentTime + 12;
        console.log(`currnet time is ${matchCurrentTime}`);
      }
      if (matchCurrentTime === lastNum) {
        idList[i].addClass("present"); //red
      } else if (lastNum < matchCurrentTime) {
        idList[i].addClass("past"); //gray
      } else if (lastNum > matchCurrentTime) {
        idList[i].addClass("future"); //green
      }
    }
}
  matchTime()
  function saveStorage(index) {
    let getStorage = JSON.parse(localStorage.getItem('storageItem')) || {};
    getStorage[`todoItem${index}`] = textarea[index].value;
    localStorage.setItem("storageItem", JSON.stringify(getStorage));
  }
  function renderStorage() {
    addP.text(dispalyTime());
    let getStorage = JSON.parse(localStorage.getItem("storageItem"));
    if (getStorage) {
      textarea[0].value = getStorage.todoItem0 || "";
      textarea[1].value = getStorage.todoItem1 || "";
      textarea[2].value = getStorage.todoItem2 || "";
      textarea[3].value = getStorage.todoItem3 || "";
      textarea[4].value = getStorage.todoItem4 || "";
      textarea[5].value = getStorage.todoItem5 || "";
      textarea[6].value = getStorage.todoItem6 || "";
      textarea[7].value = getStorage.todoItem7 || "";
      textarea[8].value = getStorage.todoItem8 || "";
    }
  }
  btn.each(function (index) {
    $(this).click(function () {
      saveStorage(index);
    });
  });
  renderStorage();
});
