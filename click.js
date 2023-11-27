let startTime, endTime;
let clickCount = 0;
let data = "";
let trial = [];


function getRandomPosition() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const x = Math.random() * (screenWidth - 50); // Adjust 50 for the dot size
  const y = Math.random() * (screenHeight - 50);

  return { x, y };
}

function renderDot() {
  const dot = document.getElementById('dot');
  const position = getRandomPosition();

  dot.style.left = `${position.x}px`;
  dot.style.top = `${position.y}px`;

  dot.style.display = 'block';
  startTime = new Date();
}

function deleteDot() {
  const dot = document.getElementById('dot');
  dot.style.display = 'none';
}


function handleClick(event) {
  endTime = new Date();
  const backButton = document.getElementById('backButton');
  const timeDiff = endTime - startTime; // in milliseconds
  const dot = document.getElementById('dot');
  const dot_rect = dot.getBoundingClientRect();
  const clicked_x = event.clientX;
  const clicked_y = event.clientY;
  const dot_x = dot_rect.left + dot_rect.width / 2;
  const dot_y = dot_rect.top + dot_rect.height / 2;
  const tolerance = 10;

  // console.log(`Click ${clickCount + 1}: ${timeDiff}ms (${accuracy})`);

  var distance = getDistance(dot_x,dot_y,clicked_x,clicked_y);
  if (distance > dot_rect.width/2+tolerance){
    return;
  }
  clickCount++;
  if (clickCount < 2) {
    deleteDot();
    renderDot();
    const accuracy = Math.max(0,1-distance/(dot_rect.width/2));
    trial.push(timeDiff + "," +distance+","+accuracy);
  } else {
    deleteDot();
    dot.parentNode.removeChild(dot);
    const accuracy = Math.max(0,1-distance/(dot_rect.width/2));
    trial.push(timeDiff + "," +distance+","+accuracy);
    data = trial.join("\n");
    console.log('Test completed!');
    console.log(data);
    backButton.style.display = 'inline-flex';
    clickCount = 0;
    saveAndDownload();
    document.removeEventListener('click', handleClick);
  }
}

function getDistance(x1,y1,x2,y2){
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function saveAndDownload() {
  const name = localStorage.getItem('userName');
  var blob = new Blob([data], { type: "text/plain" });
  var link = document.createElement("a");
  link.download = name + "_"+ "click.txt";
  link.href = URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function startClickTest(){
  document.body.removeChild(document.getElementById("click-instruction"));
  renderDot();
  document.addEventListener('click', handleClick)
}

// document.getElementById('dot').addEventListener('click', handleClick);
deleteDot();
