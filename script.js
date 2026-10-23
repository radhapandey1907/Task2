const display = document.getElementById("display");

        let currentInput = "";
        let previousInput = "";
        let operator = null;


        // Number input
        function inputNumber(number) {

            if (currentInput === "0") {
                currentInput = number;
            } else {
                currentInput += number;
            }

            updateDisplay();
        }


        // Decimal input
        function inputDecimal() {

            if (!currentInput.includes(".")) {

                if (currentInput === "") {
                    currentInput = "0";
                }

                currentInput += ".";
                updateDisplay();
            }
        }


        // Operator
        function chooseOperator(op) {

            if (currentInput === "" && previousInput === "") {
                return;
            }

            if (previousInput !== "" && currentInput !== "") {
                calculate();
            }

            operator = op;
            previousInput = currentInput;
            currentInput = "";
        }


        // Calculation
        function calculate() {

            if (previousInput === "" || currentInput === "" || operator === null) {
                return;
            }

            const num1 = parseFloat(previousInput);
            const num2 = parseFloat(currentInput);

            let result;

            switch (operator) {

                case "+":
                    result = num1 + num2;
                    break;

                case "-":
                    result = num1 - num2;
                    break;

                case "*":
                    result = num1 * num2;
                    break;

                case "/":

                    if (num2 === 0) {
                        display.value = "Error";
                        currentInput = "";
                        previousInput = "";
                        operator = null;
                        return;
                    }

                    result = num1 / num2;
                    break;
            }

            currentInput = String(result);
            previousInput = "";
            operator = null;

            updateDisplay();
        }


        // Clear
        function clearDisplay() {

            currentInput = "";
            previousInput = "";
            operator = null;

            display.value = "0";
        }


        // Delete last character
        function deleteLast() {

            currentInput = currentInput.slice(0, -1);

            updateDisplay();
        }


        // Percentage
        function percentage() {

            if (currentInput !== "") {

                currentInput = String(
                    parseFloat(currentInput) / 100
                );

                updateDisplay();
            }
        }


        // Update display
        function updateDisplay() {

            display.value = currentInput || "0";
        }


        // Keyboard support
        document.addEventListener("keydown", function(event) {

            const key = event.key;

            if (!isNaN(key)) {
                inputNumber(key);
            }

            else if (key === ".") {
                inputDecimal();
            }

            else if (key === "+" || key === "-" ||
                     key === "*" || key === "/") {

                chooseOperator(key);
            }

            else if (key === "Enter" || key === "=") {

                event.preventDefault();
                calculate();
            }

            else if (key === "Escape") {

                clearDisplay();
            }

            else if (key === "Backspace") {

                deleteLast();
            }

            else if (key === "%") {

                percentage();
            }

        });
