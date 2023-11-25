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
  //dot.parentNode.removeChild(dot);
}


function handleClick() {
  endTime = new Date();
  const backButton = document.getElementById('backButton');
  const timeDiff = endTime - startTime; // in milliseconds

  // console.log(`Click ${clickCount + 1}: ${timeDiff}ms (${accuracy})`);

  clickCount++;

  if (clickCount < 2) {
    deleteDot();
    renderDot();
    // trial = timeDiff + "\n";
    // data += trial;
    trial.push(timeDiff);
  } else {
    deleteDot();
    // trial = timeDiff + "\n";
    // data += trial;
    trial.push(timeDiff);
    data = trial.join("\n");
    console.log('Test completed!');
    console.log(data);
    backButton.style.display = 'inline-flex';
    clickCount = 0;
    saveAndDownload();
  }
}
function saveAndDownload() {
  const name = localStorage.getItem('userName');
  var blob = new Blob([data], { type: "text/plain" });
  var link = document.createElement("a");
  link.download = name + "_"+ "click.txt";
  link.href = URL.createObjectURL(blob);

  // Append the link to the body
  document.body.appendChild(link);

  // Trigger a click on the link to start the download
  link.click();

  // Remove the link from the DOM
  document.body.removeChild(link);
}

document.getElementById('dot').addEventListener('click', handleClick);

// Start the test
renderDot();
