
let currentExpression = "";
const specialResults = {
    7: { name: "Cristiano Ronaldo", bgImage: "https://m.economictimes.com/thumb/msid-97089587,width-1200,height-900,resizemode-4,imgsize-40518/cristiano-ronaldo.jpg" }, // Specify background images for special numbers
    10: { name: "Lionel Messi", bgImage: "https://wallpaperaccess.com/full/1935804.jpg" },
    369: { name: "Albert Einstein", bgImage: "https://wallpaperaccess.com/full/1935804.jpg" }
};

function appendToDisplay(value) {
    const display = document.getElementById("result");
    display.value += value;
    currentExpression = display.value; 
}

function clearDisplay() {
    document.getElementById("result").value = "";
    currentExpression = ""; // Reset the expression
    document.body.style.backgroundImage = "url('https://wallpapercave.com/wp/wp7168888.jpg')"; // Reset background image
}

function onEqualsPress() {
    const display = document.getElementById("result");
    let result;

    try {
        result = eval(display.value);
    } catch {
        display.value = "Error";
        return;
    }

    if (specialResults[result]) {
        activateSpecialFeature(result);
    } else {
        showChallengePopup(result);
    }
}

function activateSpecialFeature(result) {
    const display = document.getElementById("result");
    display.value = specialResults[result].name;

    // Change all button text to the special result
    const keys = document.querySelectorAll(".buttons button");
    keys.forEach(key => key.innerText = result);

    // Change background image
    document.body.style.backgroundImage = url('${specialResults[result].bgImage}');

    // Reset the calculator after 10 seconds
    setTimeout(resetCalculator, 10000);
}

function resetCalculator() {
    clearDisplay();
    const keys = document.querySelectorAll(".buttons button");
    keys.forEach((key, index) => {
        const originalValue = key.getAttribute("onclick").match(/'\d'|\+|-|\*|\//)[0];
        key.innerText = originalValue.replace(/'/g, '');
    });
    document.body.style.backgroundImage = "url('https://wallpaperaccess.com/full/7836436.png')"; // Reset to default background
}

function showChallengePopup(result) {
    const popup = document.getElementById("challengePopup");
    const overlay = document.getElementById("popupOverlay");
    document.getElementById("challengeText").innerText =' What is ${currentExpression}?';
    popup.style.display = "block";
    overlay.style.display = "block";
    popup.dataset.expectedAnswer = result; // Store the expected answer
}

function checkChallengeAnswer() {
    const popup = document.getElementById("challengePopup");
    const overlay = document.getElementById("popupOverlay");
    const answer = document.getElementById("challengeAnswer").value;
    const expectedAnswer = popup.dataset.expectedAnswer;
    const display = document.getElementById("result");

    if (answer == expectedAnswer) {
        display.value = "you are brilliant"; // Show the correct answer
    } else {
        display.value = "you have low maths knowledge"; // Show an error message
    }

    // Close the popup
    popup.style.display = "none";
    overlay.style.display = "none";
    document.getElementById("challengeAnswer").value = ""; // Clear the answer field
}