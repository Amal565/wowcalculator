let currentExpression = "";
const specialResults = {
    
    7: { name: "Cristiano Ronaldo", bgImage: "url('https://m.media-amazon.com/images/I/81n2mm7ZleL._AC_UF894,1000_QL80_.jpg')" }, 
    10: { name: "Lionel Messi", bgImage: "url('https://hips.hearstapps.com/hmg-prod/images/lionel-messi-celebrates-after-their-sides-third-goal-by-news-photo-1686170172.jpg')" }, 
    369: { name: "Mamootty", bgImage: "url('https://images.lifestyleasia.com/wp-content/uploads/sites/7/2023/09/06152608/Megastar-Mammootty-1600x900.jpg')" } 
};

function appendToDisplay(value) {
    const display = document.getElementById("result");
    display.value += value;
    currentExpression = display.value;
}

function clearDisplay() {
    document.getElementById("result").value = "";
}

function onEqualsPress() {
    const display = document.getElementById("result");
    let result;

    try {
        result = eval(display.value);
    } catch {
        result = "Error";
    }

    if (result === 9) {
        activateDeathMode(); 
    } else if (specialResults[result]) {
        activateSpecialFeature(result);
    } else if (result !== "Error") {
        showChallengePopup(result);
    }
}

function activateDeathMode() {
    const display = document.getElementById("result");
    display.value = "DEAD";
    display.classList.add("dead");
    document.body.style.backgroundColor = "black"; 
    const calculator = document.querySelector(".calculator");
    calculator.classList.add("glow"); 
    const keys = document.querySelectorAll(".buttons button");
    keys.forEach(key => key.classList.add("glow")); 
    disableCalculator();
}

function activateSpecialFeature(result) {
    const display = document.getElementById("result");
    display.value = specialResults[result].name;
    document.body.style.backgroundImage = specialResults[result].bgImage;
    const keys = document.querySelectorAll(".buttons button");
    keys.forEach(key => key.innerText = result);
    setTimeout(resetCalculator, 5000); 
}

function resetCalculator() {
    clearDisplay();
    const keys = document.querySelectorAll(".buttons button");
    keys.forEach(key => {
        // Restore button text
        const originalValue = key.getAttribute("onclick").match(/'\d'|\+|-|\*|\//)[0];
        key.innerText = originalValue.replace(/'/g, '');
        key.classList.remove("glow"); 
    });
    document.body.style.backgroundImage = "url('https://wallpaperaccess.com/full/7836436.png')"; // Reset background image
    document.body.style.backgroundColor = ""; 
    const display = document.getElementById("result");
    display.classList.remove("dead"); 
    currentExpression = ""; 
    enableCalculator();
}

function disableCalculator() {
    const keys = document.querySelectorAll(".buttons button");
    keys.forEach(key => key.disabled = true); // Disable all buttons
}

function enableCalculator() {
    const keys = document.querySelectorAll(".buttons button");
    keys.forEach(key => key.disabled = false); 
}

function showChallengePopup(result) {
    const popup = document.getElementById("challengePopup");
    const overlay = document.getElementById("popupOverlay");
    document.getElementById("challengeText").innerText =' What is(currentExpression)?';
    popup.style.display = "block";
    overlay.style.display = "block";
    popup.dataset.expectedAnswer = result;
}

function checkChallengeAnswer() {
    const popup = document.getElementById("challengePopup");
    const overlay = document.getElementById("popupOverlay");
    const answer = document.getElementById("challengeAnswer").value;
    const expectedAnswer = popup.dataset.expectedAnswer;
    const display = document.getElementById("result");

    if (answer == expectedAnswer) {
        display.value = expectedAnswer;
    } else {
        display.value = "Incorrect answer!";
    }

    
    popup.style.display = "none";
    overlay.style.display = "none";
    document.getElementById("challengeAnswer").value = "";
}
