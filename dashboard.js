
function navigate2Click(){
    window.location.href='click.html'
    if (localStorage.getItem("click_input_order") == null){
        var order = [0,1,2];
        shuffleArray(order);
        localStorage.setItem("click_input_order",JSON.stringify(order));
    }
}

function navigate2Copypaste(){
    window.location.href='copyPaste.html'
}

function navigate2Scroll(){
    window.location.href='scroll.html'
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

const order = JSON.parse(localStorage.getItem("testOrder"));
const listContainer = document.getElementById("order-container");
const text = document.createElement("h4");

if (order.length > 0) {
    text.textContent = "Please do the tests in the following order: "+order;
    listContainer.appendChild(text);
} else {
    // If the list is empty, display a message or handle it accordingly
    alert("no order given");
}