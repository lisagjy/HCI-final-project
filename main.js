
function navigate2Dashboard() {
    const form = document.getElementById('userForm');
    localStorage.removeItem('click_input_order');
    if (form.checkValidity){
        let order = [1,2,3,4];
        shuffleArray(order);
        localStorage.setItem('testOrder',JSON.stringify(order));
        const userName = document.getElementById('name').value;
        localStorage.setItem('userName', userName);
        window.location.href = 'dashboard.html';
        
        return false;
    }
    localStorage.removeItem('userName');
    localStorage.removeItem('testOrder');
    return false;
}

//fisher-yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
