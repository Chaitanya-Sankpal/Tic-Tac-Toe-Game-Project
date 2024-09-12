let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGamebutton = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // playerX, playerO

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
    box.addEventListener("click",() => {
        //console.log("button was clicked");
        if(turnO) //playerO
            {
                box.innerText = "O";
                turnO = false;
                box.style.backgroundColor = "pink";
            }
        else // player X
            {
                box.innerText = "X";
                turnO = true;
                box.style.backgroundColor = "yellow";
            }
            box.disabled = true; /* once we have 0 clicked then next time that box should not take
                                 0 value again */
           

        checkwinner();
    });
});

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
   
}

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations !!! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const draw = () => {
    msg.innerText = "Match is draw";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkwinner = () => {
    for(let pattern of winpatterns){
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(boxes[pattern[0]].innerText, 
        //             boxes[pattern[1]].innerText, 
        //             boxes[pattern[2]].innerText
        //         );
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val === pos2val && pos2val === pos3val){
                console.log("Winner",pos1val);
                showWinner(pos1val);
            }
        }
        else{
            if(pos1val != "" && pos2val != "" && pos3val != ""){
                if(pos1val != pos2val && pos2val != pos3val){
                    console.log("Draw",pos1val);
                    draw(pos1val);
                }
        }
    }
}
};      

newGamebutton.addEventListener("click",resetGame);

resetbtn.addEventListener("click",resetGame);