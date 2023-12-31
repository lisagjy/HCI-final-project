let startTime, endTime;
let trial = [];
let roundCount = 0;
const totalRounds = 10;
let trialData = [];
let buttonCount = 50;
let inputChosen;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function initializeTestEnvironment() {
    let instructionElement = document.getElementById("instruction");
    if (instructionElement) {
        document.body.removeChild(instructionElement);
    }
}

function generateButtons() {
    let testContainer = document.getElementById("testContainer");
    testContainer.innerHTML = '';
    let redIndex = getRandomInt(buttonCount);
  
    // Generate green buttons
    for (let i = 0; i < buttonCount; i++) {
      if (i == redIndex){
        // Add the red button
        let redButton = document.createElement("button");
        redButton.style.width = `150px`;
        redButton.style.height = `90px`;
        // redButton.style.resize = 'none';
        redButton.className = 'button redButton'; // Apply both classes
        redButton.onclick = function() { handleButtonClick(this); };
        testContainer.appendChild(redButton);
      }
      else {
        let button = document.createElement("button");
        button.className = 'button greenButton'; // Apply both classes
        button.style.width = `150px`;
        button.style.height = `90px`;
        // button.style.resize = 'none';
        button.onclick = function() { handleButtonClick(this); };
        testContainer.appendChild(button);
      }
    }
  }
  

function handleButtonClick(button) {
  endTime = new Date();
  const timeDiff = endTime - startTime; // in milliseconds
  const isRedButtonClicked = button.className.includes('redButton');

  // Record accuracy and time for this trial
  trialData.push({
    round: roundCount + 1,
    time: timeDiff,
    correct: isRedButtonClicked
  });

  // Prepare for the next round or end the test
  if (roundCount < totalRounds - 1) {
    roundCount++;
    generateButtons();
    startTime = new Date(); // Reset the timer for the next round
  } else {
    // Test is completed, process and save the data
    processDataAndSave();
  }
}

function clearTestArea() {
  let testContainer = document.getElementById("testContainer");
  if (testContainer) {
    testContainer.style.display = 'none'; // Hide the container with the buttons
  }
  let backButton = document.getElementById("backButton");
  if (backButton) {
    backButton.style.display = 'block'; // Show the back button
  }
}

function processDataAndSave() {
    // Format the trial data into a string
    let data = trialData.map(trial => `${trial.time}, ${trial.correct}`).join('\n');

    // Call saveAndDownload with the formatted data
    saveAndDownload(data);

    // Clear the test area and show the back button
    clearTestArea();
}

function saveAndDownload(data) {
    const name = localStorage.getItem('userName');
    var blob = new Blob([data], { type: "text/plain" });
    var link = document.createElement("a");
    link.download = name + "_" + inputChosen+"_scroll.txt";
    link.href = URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function startScrollTest() {
  const val = validateForm();
  if(val){
    initializeTestEnvironment();
    roundCount = 0; // Reset the round count
    startTime = new Date(); // Set startTime before generating buttons
    generateButtons();
  }
  else{
    alert('Please select an input method');
  }
}

function renderInputMethods() {
  //check for the order
  var order = JSON.parse(localStorage.getItem("scroll_input_order"));
  console.log(order);
  var options = ['Mouse','TouchScreen','TouchPad'];
  var optionsList = document.getElementById('scroll_inputList');
  var title = document.createElement('label');
  title.textContent = "Entry Method:";
  optionsList.appendChild(title);

  order.forEach(function (option) {
    console.log("Current option:", option);
      var label = document.createElement('label');
      var input = document.createElement('input');

      input.type = 'radio';
      input.name = 'input-method';
      input.value = options[option];
      input.required = true;
      label.textContent = options[option];
      label.insertBefore(input, label.firstChild);
      optionsList.appendChild(label);
  });
}

function validateForm() {
  var inputMethods = document.getElementsByName('input-method');
  var isChecked = false;

  for (var i = 0; i < inputMethods.length; i++) {
    if (inputMethods[i].checked) {
      isChecked = true;
      inputChosen = inputMethods[i].value;
      break;
    }
  }
  return isChecked;
}

window.onload = renderInputMethods;
