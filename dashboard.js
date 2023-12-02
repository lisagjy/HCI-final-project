
function navigate2Click() {
    window.location.href = 'click.html'
    if (localStorage.getItem("click_input_order") == null) {
        var order = [0, 1, 2];
        shuffleArray(order);
        localStorage.setItem("click_input_order", JSON.stringify(order));
    }
}

function navigate2Copypaste() {
    window.location.href = 'inputChose.html'
}

function navigate2Scroll() {
    if (localStorage.getItem("scroll_input_order") == null) {
        var order = [0, 1, 2];
        shuffleArray(order);
        localStorage.setItem("scroll_input_order", JSON.stringify(order));
    }
    window.location.href = 'scroll.html';
}

function navigate2ScrollType() {
    window.location.href = 'scrollType.html'
    if (localStorage.getItem("scrolltype_input_order") == null) {
        var order = [0, 1, 2];
        shuffleArray(order);
        localStorage.setItem("scrolltype_input_order", JSON.stringify(order));
    }
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function renderTests() {
    //<button class="button-89" role="button" id="backButton" onclick="navigate2Click()">TEST 1</button>
    const orders = JSON.parse(localStorage.getItem("testOrder"));
    const listContainer = document.getElementById("tests-container");
    const testLable = ['Test 1', 'Test 2', 'Test 3', 'Test 4']
    const testsOptionsFunction = [navigate2Click, navigate2Copypaste, navigate2Scroll, navigate2ScrollType]
    console.log(orders);
    if (orders.length > 0) {
        console.log("not empty");
        orders.forEach(function (order, index) {
            console.log(order);
            var button = document.createElement('button');
            button.className = 'button-89';
            button.role = 'button';
            // button.id = testsOptions[order];
            button.onclick = testsOptionsFunction[order];
            button.textContent = testLable[index];
            listContainer.appendChild(button);

        });
    } else {
        // If the list is empty, display a message or handle it accordingly
        alert("no order given");
    }
}

renderTests();