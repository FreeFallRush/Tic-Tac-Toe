// factory function to create players after the chosen mark
const Player = (mark) => {
  return { mark };
};

// gameBoard module
const gameBoard = (() => {
  // setting the board to store marked squares
  const board = ["", "", "", "", "", "", "", "", ""];

  function setBoard(index, mark) {
    board[index] = mark;
  }

  function getBoard() {
    return board;
  }
  // resetting the board
  function resetBoard() {
    board.forEach((_el, index) => {
      board[index] = "";
    });
  }

  // all the possible winning combinations on the board
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function getWinningCombos() {
    return winningCombos;
  }

  return { setBoard, getBoard, resetBoard, getWinningCombos };
})();

// displayController module to control the interface
const displayController = (() => {
  const boardContainer = document.getElementById("gameboard");
  const choices = document.querySelectorAll(".choice-box");
  const replayBtn = document.getElementById("replay-btn");
  const statusText = document.querySelector("h4");

  function showBoard() {
    document.getElementById("modal-choice").classList.add("hidden");
    document.getElementById("game").classList.remove("hide");
  }

  function hideBoard() {
    document.getElementById("modal-choice").classList.remove("hidden");
    document.getElementById("game").classList.add("hide");
  }

  // generating the 3x3 board
  gameBoard.getBoard().forEach((_el, index) => {
    let square = document.createElement("div");
    square.classList.add("square");
    square.dataset.index = index;
    boardContainer.appendChild(square);
  });

  //mark choice that will set the players
  choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
      let mark = e.target.dataset.mark;

      showBoard();
    });
  });
})();
