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
});
let btn = $('button')
let addP = $('#currentDay')
let textarea = document.querySelectorAll('textarea')
function dispalyTime() { 
  let current = dayjs().format('MMMM-dddd-YYYY')
  addP.text(current)
}
function matchID() {
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
    let lastNum =parseInt(idList[i].attr("id").replace(/[^\d]/g, " "));
    if (lastNum >= 1 && lastNum <= 5) { 
      lastNum = lastNum + 12
    }
      console.log(`listNumber is ${lastNum}`);
    if (matchCurrentTime >= 1 && matchCurrentTime <= 9) { 
      matchCurrentTime = matchCurrentTime + 12;
      console.log(`currnet time is ${matchCurrentTime}`);
    } 
    if (matchCurrentTime === lastNum) {
      idList[i].addClass("present");//red
    } else if (lastNum < matchCurrentTime) {
      idList[i].addClass("past");//gray
    } else if (lastNum > matchCurrentTime) {
      idList[i].addClass("future");//green
    }
  }
}
matchID();

function saveStorage() {
  let storageItem = {
    todoItem9: textarea[0].value,
    todoItem10: textarea[1].value,
    todoItem11: textarea[2].value,
    todoItem12: textarea[3].value,
    todoItem1: textarea[4].value,
    todoItem2: textarea[5].value,
    todoItem3: textarea[6].value,
    todoItem4: textarea[7].value,
    todoItem5: textarea[8].value,
  };
  localStorage.setItem('storageItem', JSON.stringify(storageItem));
  return storageItem
}
function renderStorage() { 
  addP.text(dispalyTime())
  addP
  let getStorage = JSON.parse(localStorage.getItem('storageItem'))
  textarea[0].value = getStorage.todoItem9
  textarea[1].value = getStorage.todoItem10
  textarea[2].value = getStorage.todoItem11
  textarea[3].value = getStorage.todoItem12
  textarea[4].value = getStorage.todoItem1
  textarea[5].value = getStorage.todoItem2
  textarea[6].value = getStorage.todoItem3
  textarea[7].value = getStorage.todoItem4
  textarea[8].value = getStorage.todoItem5
  
  
}
for (let i = 0; i < btn.length; i++) { 
  btn[i].addEventListener('click', function (e) { 
    e.preventDefault();
    saveStorage()
  })
}
renderStorage()


