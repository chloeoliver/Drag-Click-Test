const click = document.getElementById("click");
const clickCountP = document.getElementById("clickCount");
let clickCount = 0;
const cps = document.getElementById("cps");
const timeRemaining = document.getElementById("timeRemaining");

const timeSlider = document.getElementById("timeSlider");
const timeText = document.getElementById("time");

timeSlider.oninput = ()=>{
  timeText.innerText = timeSlider.value;
  time = timeSlider.value;
  if(time == 1) {
    timeText.classList.add("single");
  } else if(timeText.classList.contains("single")) {
    timeText.classList.remove("single");
  }
}

let time = timeSlider.value;

let startTime = null;
const allTime = document.getElementById("allTime");
allTime.ondblclick = ()=>{
  localStorage.removeItem("all-time");
  updateAllTime(0);
}
const updateAllTime = (newScore)=>{
  console.log(newScore, Number(localStorage.getItem("all-time")));
  if(newScore > Number(localStorage.getItem("all-time"))) {
    localStorage.setItem("all-time", newScore.toString());
  }
  allTime.textContent = localStorage.getItem("all-time") || 0;
}
updateAllTime(0);

const showClicks = ()=>{
  clickCountP.innerText = clickCount;
}

showClicks();
const animFunc = ()=>{
  const elapsed = (Date.now() - startTime) * 0.001;
   if(elapsed < time) {
      cps.innerText = Math.round((clickCount / elapsed) * 10) / 10;
      timeRemaining.innerText = (time - elapsed).toFixed(2);
      window.requestAnimationFrame(animFunc);
   } else {
     click.disabled = true;
     cps.innerText = Math.round((clickCount / time) * 10) / 10;
     timeRemaining.innerText = 0;
     updateAllTime(Number(cps.innerText));
     cps.innerText = "Result: "+cps.innerText;
     startTime = null;
     click.classList.add("play-again");     
     setTimeout(()=>{
       click.disabled = false;
     }, 1000);
   }
 }
const clickHandler = ()=>{
   if(!startTime) {
     startTime = Date.now();
     window.requestAnimationFrame(animFunc);
     clickCount = 0;
     click.classList.remove("play-again");
   }
   clickCount++;
   showClicks();
}

click.addEventListener("mousedown", (event)=>{
  if(event.button == 0) {
    clickHandler();
  }
});
click.addEventListener("contextmenu", (event)=>{
  event.preventDefault();
  clickHandler();
});

const darkTheme = document.getElementById("darkTheme");
const isDarkTheme = localStorage.getItem("dark-theme") === "true";
darkThemeIfy.bind({checked: isDarkTheme})();
darkTheme.checked = isDarkTheme;

darkTheme.oninput = darkThemeIfy;

function darkThemeIfy() {
  if(this.checked) {
    document.body.style.setProperty("--bg-color", "black");
    document.body.style.setProperty("--text-color", "white");
    document.body.style.setProperty("--click-color", "rgb(180,180,180)");
    document.body.style.setProperty("--shadow-color", "white");
    localStorage.setItem("dark-theme", "true");
  } else {
    document.body.style.setProperty("--bg-color", "");
    document.body.style.setProperty("--click-color", "");
    document.body.style.setProperty("--text-color", "");
    document.body.style.setProperty("--shadow-color", "");
    localStorage.setItem("dark-theme", "false");
  }
}