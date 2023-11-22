let startTime, endTime;
let clickCount = 0;

function getRandomPosition() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const x = Math.random() * (screenWidth - 50); // Adjust 50 for the dot size
  const y = Math.random() * (screenHeight - 50);

  return { x, y };
}

function showDot() {
  const dot = document.getElementById('dot');
  const position = getRandomPosition();

  dot.style.left = `${position.x}px`;
  dot.style.top = `${position.y}px`;

  dot.style.display = 'block';
  startTime = new Date();
}

function hideDot() {
  const dot = document.getElementById('dot');
  dot.style.display = 'none';
}

function handleClick() {
  endTime = new Date();
  const timeDiff = endTime - startTime; // in milliseconds
  const accuracy = timeDiff < 1000 ? 'Perfect' : 'Good'; // Adjust the time threshold as needed

  console.log(`Click ${clickCount + 1}: ${timeDiff}ms (${accuracy})`);

  clickCount++;

  if (clickCount < 10) {
    hideDot();
    setTimeout(showDot, 1000); // Adjust the delay between dots as needed
  } else {
    console.log('Test completed!');
  }
}

document.getElementById('dot').addEventListener('click', handleClick);

// Start the test
showDot();
