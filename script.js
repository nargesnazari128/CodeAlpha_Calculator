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
            const parts = display.value.match(/\d+\.?\d*|[+\-\*/%]/g);
            console.log(parts);

            const convertedParts = parts.map(part => isNaN(part) ? part :
            Number(part));
                console.log(convertedParts);

            let result = [...convertedParts];
                console.log(result);

            let index = result.findIndex(part => part === "*"|| part === "/");
                console.log(index);

            let left = result[index -1];
            let right = result[index +1];
                console.log(left,right);

            let operator = result[index];
            let calculation;
            if(operator === "*") {
                calculation = left * right;
            }
            else if (operator === "/") {
                calculation = left / right;
            }
            console.log(calculation);

            result.splice(index - 1, 3, calculation );
                console.log(result);

            let nextIndex = result.findIndex(part => part === "+" || part === "-");
                console.log(nextIndex);

            left = result[nextIndex -1];
            right = result[nextIndex +1];
            operator = result[nextIndex];

            console.log(left, operator, right);

            }
           catch {
            display.value = "Error"
           }
    }
    else {
            display.value += button.textContent;
        }
    });
});

