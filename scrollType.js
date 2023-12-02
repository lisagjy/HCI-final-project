let startTime, endTime;
let trial = [];
let roundCount = 0;
const totalRounds = 5;
let trialData = [];
let buttonCount = 50;
let inputChosen;
let buttonClicked;

let wordList1 = ['nightowl','giftwrap','expected','jumbling','invoking'];
let wordList2 = ['keyboard','exciting','tickling','appendix','lunchbox'];
let wordList3 = ['judgment','inequity','lovesick','rollback','youthful'];
let wordList;


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
        //button.onclick = function() { handleButtonClick(this); };
        testContainer.appendChild(button);
      }
    }
  }
  

function handleButtonClick(button) {
  // Prepare for the next round or end the test
  const help = document.getElementById('helpAlert');
  if (roundCount == 0){
    help.style.display = 'block';
  }
  updateTypeTest();
  buttonClicked = button;
}

function handleNext(){
    const userInput = document.getElementById("userInput");
    var typedMessage = userInput.value.toLowerCase();
    const sampleText = document.getElementById('sampleText').value.toLowerCase();
    const inputCorrect = isBackward(sampleText,typedMessage);
    var resultMessage = document.getElementById("result");

    if(roundCount==0){
        const help = document.getElementById('helpAlert');
        help.style.display = 'none';
    }

    if (!inputCorrect){
        resultMessage.innerHTML = "Sorry, that's not correct. Please try again.";
        resultMessage.style.color = "red";
        return
    }



    endTime = new Date();
    const timeDiff = endTime - startTime; // in milliseconds
    //const isRedButtonClicked = buttonClicked.className.includes('redButton');
    // Record accuracy and time for this trial
    trialData.push({
      round: roundCount + 1,
      time: timeDiff,
      //correct: isRedButtonClicked
    });
    if (roundCount < totalRounds - 1) {
        roundCount++;
        generateButtons();
        resultMessage.innerHTML = "Look for the next button!";
        resultMessage.style.color = "green";
        userInput.value = '';
        startTime = new Date(); // Reset the timer for the next round
      } else {
        // Test is completed, process and save the data
        processDataAndSave();
      }
}

function updateTypeTest(){
    const sampleText = document.getElementById('sampleText');
    sampleText.textContent = wordList[roundCount];
    sampleText.value = wordList[roundCount];
}
function isBackward(word,word2) {
    var reversedWord = word.split('').reverse().join('');
    console.log(word);
    console.log(word2);
    console.log(reversedWord);
    return word2 === reversedWord;
}

function clearTestArea() {
  let testContainer = document.getElementById("testContainer");
  const type = document.getElementById("typeContainer");
  if (testContainer || type) {
    testContainer.style.display = 'none'; // Hide the container with the buttons
    type.style.display = 'none';
  }
  let backButton = document.getElementById("backButton");
  if (backButton) {
    backButton.style.display = 'block'; // Show the back button
  }
}

function processDataAndSave() {
    // Format the trial data into a string
    let data = trialData.map(trial => `${trial.time}`).join('\n');

    // Call saveAndDownload with the formatted data
    saveAndDownload(data);

    // Clear the test area and show the back button
    clearTestArea();
}

function saveAndDownload(data) {
    const name = localStorage.getItem('userName');
    var blob = new Blob([data], { type: "text/plain" });
    var link = document.createElement("a");
    link.download = name + "_" + inputChosen+"_scrolltype.txt";
    link.href = URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function startScrollTest() {
  const val = validateForm();
  const type = document.getElementById("typeContainer");
  if(val){
    initializeTestEnvironment();
    roundCount = 0; // Reset the round count
    startTime = new Date(); // Set startTime before generating buttons
    generateButtons();
    type.style.display = 'inline-flex';
  }
  else{
    alert('Please select an input method');
  }
}

function renderInputMethods() {
  //check for the order
  var order = JSON.parse(localStorage.getItem("scrolltype_input_order"));
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
      switch(i){
        case 0:
            wordList = wordList1;
            break;
        case 1:
            wordList = wordList2;
            break;
        case 2:
            wordList = wordList3;
      }
      break;
    }
  }
  return isChecked;
}

window.onload = renderInputMethods;
