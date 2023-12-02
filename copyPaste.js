let trialNum = 0
let index, correctAnswer, startTime
let count = 0
let correctNum = 0
const listContainer = $('#listContainer')
let completionTime = []
let ans = []
const showList = [
  'The curious cat explored the mysterious garden under the moonlight.',
  'As the sun set, a gentle breeze whispered through the ancient trees.',
  'In the bustling city, a solitary musician played a haunting melody.',
  'Lost in thought, she gazed at the distant horizon, pondering life mysteries.',
  'The aroma of freshly brewed coffee filled the cozy cafe on a rainy afternoon.',
  'A burst of laughter echoed through the room as friends gathered for a celebration.',
  'The old bookshop, with its creaky wooden floors, held stories from a bygone era.',
  'Bright stars adorned the night sky, creating a celestial masterpiece.',
  'On the peaceful riverbank, a solitary boat drifted with the gentle current.',
  'In the vibrant market, vendors showcased a kaleidoscope of colors and flavors.'
]
const numberToText = {
  0: 'first',
  1: 'second',
  2: 'third'
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5)
}

$('#show-btn').on('click', function () {
  listContainer.empty()
  shuffle(showList)
  console.log(showList);
  const ol = $('<ol>')

  for (let i = 0; i < 3; i++) {
    const li = $('<li>').text(showList[i])
    ol.append(li)
  }
  correctAnswer = showList[index]
  console.log(correctAnswer);
  listContainer.append(ol)
  // start to count
  startTime = new Date();
  console.log(startTime);
})

function loadSentence() {

  index = Math.floor(Math.random() * 3)
  console.log(index)
  $("#selected").text(numberToText[index]);
  listContainer.text('Please click the above button to show sentences')
}

$('#submit-btn').on('click', function () {
  // end count
  let endTime = new Date()
  let elapsedTime = endTime - startTime
  console.log(elapsedTime);
  completionTime.push(elapsedTime)

  // check if correct
  count++
  console.log(count);
  if ($('#textarea').val() == correctAnswer) {
    correctNum++
    ans.push(true)
    // $("#messagec").show()
  } else {
    ans.push(false)
    // $("#messagew").show()
  }
  trialNum++

  $('#textarea').val('');

  if (trialNum == 5) {
    downloadFile()
    $('.alert-warning').hide()
    $(".alert-primary").show()
    return
  }
  loadSentence()
  $('.alert-warning').show()

})

// $('#restart-btn').on('click', function () {
//   $('#messagec').hide()
//   $("#messagew").hide()
// })

// $('#download-btn').on('click', function () {
//   let fileContent = ''
//   // let sum = 0;
//   // completionTime.forEach((val) => {
//   //   sum += val;
//   // });
//   // let average = sum / completionTime.length
//   const filename = `record.txt`;
//   for (let i = 0; i < completionTime.length; i++) {
//     fileContent += completionTime[i] + ' ' + ans[i] + '\n'
//   }
//   // fileContent = `Completion Time ${completionTime}\n Average ${average}\nCorrect Answer ${correctNum}:\n Times Tried ${count}:\n`;
//   downloadFile(filename, fileContent);
// })

function downloadFile() {
  const filename = localStorage.getItem('userName') + "_" + localStorage.getItem('input_method') + "_copyPaste.txt";
  let content = ''
  for (let i = 0; i < completionTime.length; i++) {
    content += completionTime[i] + ' ' + ans[i] + '\n'
  }
  const blob = new Blob([content], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}