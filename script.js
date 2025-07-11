let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true; //playerX, playerO

const winPatterns =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

const resetGame = () => {
    turnO = true;
    enableboxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "⭕";
            turnO = false;
        } else{
            box.innerText = "✖️";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableboxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableboxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};
const showWinner = (winner) =>{
    msg.innerText = `🎉 Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
}

const checkDraw = () => {
  let filled = true;
  boxes.forEach((box) => {
    if (box.innerText === "") {
      filled = false;
    }
  });

  if (filled) {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    disableboxes();
  }
};

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val != "" && pos2Val != "" && pos3Val !="") {
            if (pos1Val == pos2Val && pos2Val == pos3Val) {
                disableboxes();
                showWinner(pos1Val);
            }
            
        }
        
    }
    checkDraw();
}


newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click",resetGame);