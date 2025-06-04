
const resultInput = document.getElementById("result");
const buttons = document.querySelectorAll(".buttons button");
const historyList = document.getElementById("history-list");
const themeToggle = document.getElementById("toggle-theme");

// Switch theme
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");
});

// Handle button clicks
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.innerText;
        if (value === "=") {
            try {
                const expression = resultInput.value;
                const result = eval(expression);
                resultInput.value = result;
                addToHistory(expression + " = " + result);
            } catch {
                resultInput.value = "Error";
            }
        } else if (value === "C") {
            resultInput.value = "";
        } else if (value === "←") {
            resultInput.value = resultInput.value.slice(0, -1);
        } else {
            resultInput.value += value;
        }
    });
});

// Handle keyboard input
document.addEventListener("keydown", (e) => {
    if ((e.key >= "0" && e.key <= "9") || ["+", "-", "*", "/", "(", ")", ".", "Backspace"].includes(e.key)) {
        if (e.key === "Backspace") {
            resultInput.value = resultInput.value.slice(0, -1);
        } else {
            resultInput.value += e.key;
        }
    } else if (e.key === "Enter") {
        try {
            const expression = resultInput.value;
            const result = eval(expression);
            resultInput.value = result;
            addToHistory(expression + " = " + result);
        } catch {
            resultInput.value = "Error";
        }
    }
});

// Add calculations to history
function addToHistory(entry) {
    const listItem = document.createElement("li");
    listItem.textContent = entry;
    historyList.appendChild(listItem);
}