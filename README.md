# Online Calculator

A simple and interactive online calculator built with **HTML, CSS, and JavaScript** as the final project of [The Odin Project – Foundations](https://www.theodinproject.com/lessons/foundations-calculator).

The calculator supports basic arithmetic operations, decimal numbers, keyboard input, and sequential calculations through a clean and colorful user interface.

## Features

- **Basic Arithmetic:** Addition, subtraction, multiplication, and division.
- **Interactive Display:** Shows the current input, selected operator, and calculation results.
- **Decimal Support:** Allows users to enter decimal numbers.
- **Backspace:** Deletes the last entered character.
- **Clear Button:** Resets the calculator and clears the current calculation.
- **Keyboard Support:** Supports keyboard input for numbers, operators, and calculator controls.
- **Chained Calculations:** Supports sequential operations, such as `12 + 7 - 1 =`.
- **Consecutive Operator Handling:** Replaces the selected operator when another operator is pressed before entering the next number.
- **Division-by-Zero Protection:** Displays a custom error message when attempting to divide by zero.
- **Result Formatting:** Rounds long decimal results to prevent display overflow.
- **Input Validation:** Prevents multiple decimal points in a single number.
- **Digit Limit:** Limits the number of entered digits to keep the display readable.

## Technologies Used

- **HTML5** – Structures the calculator interface.
- **CSS3** – Provides styling, layout, and interactive button effects.
- **JavaScript (Vanilla JS)** – Implements arithmetic operations, DOM manipulation, event handling, keyboard support, and calculator logic.

## Live Demo

Visit the repository to explore the source code:

[GitHub Repository – Calculator](https://github.com/AliMehrabi5/Calculator)

## Getting Started

### Prerequisites

You only need a modern web browser. No additional libraries, frameworks, or dependencies are required.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AliMehrabi5/Calculator.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Calculator
   ```

3. Open `index.html` in your web browser.

Alternatively, open the project in Visual Studio Code and use the Live Server extension to run it locally.

## Project Structure

```text
Calculator/
├── index.html    # Calculator structure and buttons
├── style.css     # Styling and layout
├── script.js     # Calculator logic and event handlers
└── README.md     # Project documentation
```

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `0–9` | Enter a digit |
| `.` | Enter a decimal point |
| `+` | Addition |
| `-` | Subtraction |
| `*` or `x` | Multiplication |
| `/` | Division |
| `Enter` or `=` | Calculate the result |
| `Backspace` | Delete the last input character |
| `Escape` or `Delete` | Clear the calculator |
| `C` | Clear the calculator |

## How It Works

The calculator uses separate JavaScript functions to perform the four basic arithmetic operations:

- `add(a, b)` – Adds two numbers.
- `subtract(a, b)` – Subtracts the second number from the first.
- `multiply(a, b)` – Multiplies two numbers.
- `divide(a, b)` – Divides the first number by the second.

The `operate(operator, a, b)` function selects and executes the appropriate arithmetic operation.

The calculator manages its state using variables that store the first number, the selected operator, the current input, and whether the display should be reset.

Event listeners handle button clicks and keyboard input, while DOM manipulation updates the calculator display dynamically.

The implementation also handles common edge cases, including division by zero, consecutive operators, incomplete expressions, decimal input, and long calculation results.

## Learning Objectives

This project was created to practice and reinforce the following concepts:

- Writing reusable JavaScript functions.
- Working with variables, parameters, and return values.
- Using conditional statements and switch cases.
- Manipulating DOM elements with JavaScript.
- Handling mouse clicks and keyboard events.
- Managing application state.
- Using CSS Grid and Flexbox for layout.
- Handling edge cases and invalid operations.
- Formatting floating-point calculation results.
- Organizing a web project into separate HTML, CSS, and JavaScript files.
- Using Git and GitHub for version control.

## Future Improvements

Potential improvements include:

- Improving responsive design for mobile devices.
- Enhancing accessibility and keyboard navigation.
- Adding calculation history.
- Improving the visual design and user experience.

## Acknowledgements

This project was built as part of [The Odin Project](https://www.theodinproject.com/), an open-source curriculum for learning web development.

## Author

**Ali Mehrabi**

GitHub: [@AliMehrabi5](https://github.com/AliMehrabi5)

---

*Built with HTML, CSS, and JavaScript as part of The Odin Project – Foundations.*
