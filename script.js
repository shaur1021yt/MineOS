var welcomeScreen = document.querySelector("#welcome")
var welcomeScreenClose = document.querySelector("#welcomeclose")
var instacraftWindow = document.querySelector("#instacraft")
var instacraftClose = document.querySelector("#instacraftClose")
var instacraftIcon = document.querySelector("#instacraftIcon")
var instacraftSidebar = document.querySelector("#instacraftSidebar")
var instacraftContent = document.querySelector("#instacraftContent")
var welcomeScreenOpen = document.querySelector("#welcomeopen")
var topBar = document.querySelector("#topbar")
var biggestIndex = 1
var selectedInstacraftIndex = 0

var instacraftNotes = [
  {
    title: "Steve Builds",
    date: "06/11/2026",
    content: `
      <div class="post-card">
        <div class="post-header">
          <div class="post-avatar"></div>
          <div>
            <strong>instacraft</strong>
            <div>Today</div>
          </div>
        </div>
        <img class="post-image" src="https://i.ytimg.com/vi/aWn90ls3B3E/maxresdefault.jpg" alt="Craft feed image">
        <div class="post-caption">
          <strong>Built a Mansion</strong>
          <p>Time flies when you're having fun!</p>
        </div>
      </div>
    `
  },
  {
    title: "Minecraft Tips",
    date: "06/10/2026",
    content: `
      <div class="post-card">
        <div class="post-header">
          <div class="post-avatar"></div>
          <div>
            <strong>instacraft</strong>
            <div>Yesterday</div>
          </div>
        </div>
        <img class="post-image" src="https://raw.githubusercontent.com/shaur1021yt/MineOS/main/channels4_profile.jpg" alt="Tips image">
        <div class="post-caption">
          <strong>Listen Up!</strong>
          <p>Subscribe to Shaur1021 to get better at Minecraft.</p>
        </div>
      </div>
    `
  },
  {
    title: "Explorer",
    date: "06/09/2026",
    content: `
      <div class="post-card">
        <div class="post-header">
          <div class="post-avatar"></div>
          <div>
            <strong>instacraft</strong>
            <div>June 9</div>
          </div>
        </div>
        <img class="post-image" src="https://preview.redd.it/the-ruins-of-the-jungle-v0-xybc9vwedz691.jpg?width=1080&crop=smart&auto=webp" alt="Explorer image">
        <div class="post-caption">
          <strong>Explore textures</strong>
          <p>Experiment with brick, glass, and plant life to make your world feel lived-in and dreamy.</p>
        </div>
      </div>
    `
  }
]

function closeWindow(element) {
  element.style.display = "none"
}

function openWindow(element) {
  element.style.display = "flex"
  biggestIndex++
  element.style.zIndex = biggestIndex
  if (topBar) {
    topBar.style.zIndex = biggestIndex + 1
  }
}

function handleWindowTap(element) {
  biggestIndex++
  element.style.zIndex = biggestIndex
  if (topBar) {
    topBar.style.zIndex = biggestIndex + 1
  }
}

function addWindowTapHandling(element) {
  if (!element) return
  element.addEventListener("mousedown", function() {
    handleWindowTap(element)
  })
}

function initializeWindow(id) {
  var element = document.querySelector("#" + id)
  if (!element) return
  dragElement(element)
  addWindowTapHandling(element)
}

function setInstacraftContent(index) {
  if (index < 0 || index >= instacraftNotes.length) return
  selectedInstacraftIndex = index
  var note = instacraftNotes[index]
  instacraftContent.innerHTML = `
    <div class="note-header">
      <h3>${note.title}</h3>
      <div class="note-date">${note.date}</div>
    </div>
    ${note.content}
  `
  var entries = instacraftSidebar.querySelectorAll(".sidebar-entry")
  entries.forEach(function(entry, entryIndex) {
    entry.classList.toggle("active", entryIndex === index)
  })
}

function addToSidebar(index) {
  var note = instacraftNotes[index]
  var newDiv = document.createElement("div")
  newDiv.className = "sidebar-entry"
  newDiv.innerHTML = `
    <div class="entry-title">${note.title}</div>
    <div class="entry-date">${note.date}</div>
  `
  newDiv.addEventListener("click", function() {
    setInstacraftContent(index)
  })
  instacraftSidebar.appendChild(newDiv)
}

function initializeInstacraftApp() {
  instacraftNotes.forEach(function(_, index) {
    addToSidebar(index)
  })
  setInstacraftContent(0)
}

function updateTime() {
    var currentTime = new Date().toLocaleString();
    var timeText = document.querySelector("#timeElement");
    timeText.textContent = currentTime;
}
setInterval(updateTime, 1000);

initializeWindow("welcome")
initializeWindow("instacraft")
initializeInstacraftApp()
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element
} 

function deselectIcon(element) {
  element.classList.remove("selected");
  selectedIcon = undefined
}


function handleIconTap(element) {
  if (element.classList.contains("selected")) {
    deselectIcon(element)
    openWindow(window)
  } else {
    selectIcon(element)
  }
}

welcomeScreenClose.addEventListener("click", function() {
  closeWindow(welcomeScreen);
});

instacraftClose.addEventListener("click", function() {
  closeWindow(instacraftWindow);
});

instacraftIcon.addEventListener("click", function() {
  openWindow(instacraftWindow);
});

welcomeScreenOpen.addEventListener("click", function() {
  openWindow(welcomeScreen);
});
