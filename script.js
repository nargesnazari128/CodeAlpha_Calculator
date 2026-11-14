const display = 
document.getElementById("display");

const buttons =
document.querySelectorAll(".buttons button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        display.value = button.textContent;
    });
});