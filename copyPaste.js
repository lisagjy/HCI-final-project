let trialNum = 0
let index, correctAnswer, startTime
let count = 0
let correctNum = 0
const listContainer = $('#listContainer')
let completionTime = []
let ans = []
const showList = [
  'This is test 1.',
  'This is test 2.',
  'This is test 3.',
  'This is test 4.',
  'This is test 5.',
  'This is test 6.',
  'This is test 7.',
  'This is test 8.',
  'This is test 9.',
  'This is test 10.'
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

  if (trialNum == 2) {
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
  const filename = localStorage.getItem('userName') + "_" + "copyPaste.txt";
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