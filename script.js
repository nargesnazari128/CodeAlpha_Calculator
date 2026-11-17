const display = document.getElementById("display");

const buttons = document.querySelectorAll(".buttons button");

buttons.forEach(button => 
{button.addEventListener("click", () => {
    if (button.textContent === "C"){
         display.value = "";
        }
    else if (button.textContent === "DEL") {
        display.value = display.value.slice(0, -1);
    }
    else if (button.textContent === "=") {
           try{
            if ( display.value.trim() === ""){
                return;
            }

            const parts = display.value.match(/-?\d+\.?\d*|[+*/%\-]/g);
            console.log(parts);

            const convertedParts = parts.map(part => isNaN(part) ? part :
            Number(part));
                console.log(convertedParts);
            
            const isValid = convertedParts.every((part, index) =>{
                if (index % 2 === 0) {
                    return typeof part === "number";
                }
                else { 
                    return ["+", "-", "*", "/", "%"].includes(part);
                }
            });
                if (!isValid || convertedParts.length % 2 === 0){
                    throw new Error("Invalid Expression");
                }

            let result = [...convertedParts];
                console.log(result);

            let left;
            let right;
            let operator;

            while (result.some(part => part === "*" || part === "/" || part === "%")) {
                let index = result.findIndex(part => part === "*" || part === "/" || part === "%");
               
                left = result[index - 1];
                right = result[index +1 ];

                operator = result[index];
                let calculation;
                if (operator === "*") {
                    calculation = left * right;
                }
                else if (operator === "/") {
                    if (right === 0 ) {
                        throw new Error("Cannot divided by zero");
                    }
                    calculation = left / right;
                }
                else if (operator === "%") {
                    calculation = left % right;
                }
                result.splice(index - 1, 3, calculation);
            }


            while (result.some(part => part === "+" || part === "-")) {
                let nextIndex = result.findIndex(part => part === "+" || part === "-");

                left = result[nextIndex - 1];
                right = result[nextIndex + 1];
                operator = result[nextIndex];

                let finalCalculation;
                if (operator === "+") {
                    finalCalculation = left + right;
                }
                else if (operator === "-") {
                    finalCalculation = left - right;
                }
                result.splice(nextIndex -1, 3, finalCalculation);
            }
            display.value = result[0];
        }
           catch {
            display.value = "Error"
           }
    }
    else {
        if (["+", "-", "*", "/", "%"].includes(button.textContent)) {
            const lastCharacter = display.value.slice(-1);
            
            if (["+", "-", "*", "/", "%"].includes(lastCharacter)) {
                display.value =
                display.value.slice(0, -1) +button.textContent;
                return
            }
            if (display.value === "") {
                return;
            }
        }
        if (button.textContent === ".") {
            const currentNumber = display.value.split(/[+\-\*\/%]/).pop();
            if (currentNumber.includes(".")){
                return;
            }
            if (currentNumber === "") {
                display.value += "0"; 
            }
        }
            display.value += button.textContent;
        }
    });
});

document.addEventListener("keydown", (event) =>{
    let key = event.key;
    
    if (key === "Enter") {
        key = "=";
    }
    else if (key === "Backspace") {
        key = "DEL";
    }
    else if (key === "Escape") {
        key ="C";
    }

    const matchingButton = [...buttons].find(button =>
        button.textContent === key
    );
    if (matchingButton) {
        event.preventDefault();
        matchingButton.click();
    }
});

