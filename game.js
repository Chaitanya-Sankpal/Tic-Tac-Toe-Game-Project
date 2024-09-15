let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGamebutton = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // true for playerO, false for playerX
let moveCount = 0; // Counter to track the number of moves

const winpatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") { // Ensure the box is empty before marking
            if (turnO) { // playerO
                box.innerText = "O";
                box.style.backgroundColor = "pink";
            } else { // playerX
                box.innerText = "X";
                box.style.backgroundColor = "yellow";
            }
            box.disabled = true;
            turnO = !turnO; // Switch turn
            moveCount++; // Increment move counter

            checkWinner();
        }
    });
});

const resetGame = () => {
    turnO = true;
    moveCount = 0; // Reset move counter
    enableBoxes();
    msgContainer.classList.add("hide");
}

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
}

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "";
    });
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations !!! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const draw = () => {
    msg.innerText = "Match is a draw";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    // Check for a winner
    for (let pattern of winpatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
            showWinner(pos1val);
            return; // Exit the function as we found a winner
        }
    }

    // Check for a draw if no winner is found
    if (moveCount === 9) { // All boxes are filled
        draw();
    }
};

newGamebutton.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
