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
