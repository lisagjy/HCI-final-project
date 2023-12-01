
function shuffle(array) {
  array.sort(() => Math.random() - 0.5)
}

function renderInputMethods() {
  // check if there is order
  let order = localStorage.getItem('input_method_order')
  if (order == null) {
    // generate
    order = [0, 1, 2]
    shuffle(order)
    localStorage.setItem('input_method_order', JSON.stringify(order))
  } else {
    order = JSON.parse(order)
  }

  console.log(order);
  var options = ['Mouse', 'TouchScreen', 'TouchPad'];
  var optionsList = document.getElementById('inputList');
  var title = document.createElement('label');
  title.textContent = "Entry Method:";
  optionsList.appendChild(title);

  order.forEach(function (option, index) {
    console.log("Current option:", option);
    var label = document.createElement('label');
    var input = document.createElement('input');

    input.type = 'radio';
    input.className = 'input-method';
    input.value = options[option];
    input.required = true;
    label.textContent = options[option];
    label.insertBefore(input, label.firstChild);
    optionsList.appendChild(label);
  });
}

$('.start-button').on('click', () => {
  const selectedInputMethod = $('.input-method:checked').val();
  if (selectedInputMethod !== undefined) {
    localStorage.setItem('input_method', selectedInputMethod);
    window.location.href = 'copyPaste.html';
  } else {
    alert('Please select an input method');
  }
})

$('.back-button').on('click', () => {
  window.location.href = 'dashboard.html';

})

