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
  statusText.textContent = `Try placing 3 marks in a horizontal, 
  vertical, or diagonal row.`;

  let humanPlayerBox = document
    .getElementById("player-1")
    .getElementsByClassName("playing-mark")[0];
  let humanPlayerScore = document
    .getElementById("player-1")
    .getElementsByClassName("player-score")[0];
  let computerPlayerBox = document
    .getElementById("player-2")
    .getElementsByClassName("playing-mark")[0];
  let computerPlayerScore = document
    .getElementById("player-2")
    .getElementsByClassName("player-score")[0];

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

  replayBtn.addEventListener("click", () => {
    // removing classes that were added in previous game
    const squares = document.querySelectorAll("[data-index]");
    squares.forEach((square) => {
      square.style.pointerEvents = "auto";
      square.innerHTML = "";
      square.classList.remove("winner");
      square.classList.remove("draw");
    });

    gameBoard.resetBoard();
    game.resetGame();
    resetDisplay();
    hideBoard();
    document.querySelector("h4").classList.remove("win");
    statusText.textContent = `Try placing 3 marks in a horizontal, 
  vertical, or diagonal row.`;
  });

  // removing all the squares
  function resetDisplay() {
    Array.from(boardContainer.children).forEach((el) => {
      while (el.firstChild) {
        el.removeChild(el.lastChild);
      }
    });
    showResult("");
  }

  //mark choice that will set the players
  choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
      if (!game.getPlay() && !game.isGameOver()) {
        let mark = e.target.dataset.mark;
        game.setPlayers(mark);
        showBoard();
      }
    });
  });

  // let players mark only the empty squares
  boardContainer.addEventListener("click", (e) => {
    if (
      game.getPlay() &&
      e.target.classList.contains("square") &&
      e.target.children.length === 0
    ) {
      const mark = document.createElement("p");
      mark.textContent = game.getCurrentPlayer().mark;
      e.target.appendChild(mark);

      gameBoard.setBoard(e.target.dataset.index, game.getCurrentPlayer().mark);
      game.nextTurn();
    }
  });

  function setComputerTurn(index, mark) {
    const pMark = document.createElement("p");
    pMark.textContent = mark;
    gameBoard.setBoard(index, mark);
    boardContainer.children[index].appendChild(pMark);
  }

  function showResult(winner) {
    document.querySelector("h4").classList.add("win");
    document.querySelector("h4").textContent = winner;
  }

  return {
    setComputerTurn,
    showResult,
    humanPlayerBox,
    computerPlayerBox,
    humanPlayerScore,
    computerPlayerScore,
  };
})();

//game module
const game = (() => {
  let player;
  let computer;
  let currentPlayer;
  let play = false;
  let gameover = false;

  function resetGame() {
    player = null;
    computer = null;
    play = false;
    gameover = false;
    currentPlayer = null;
  }

  let humanScore = 0;
  let computerScore = 0;

  function addHumanScore() {
    humanScore++;
  }

  function addComputerScore() {
    computerScore++;
  }

  function getHumanScore() {
    return humanScore;
  }

  function getComputerScore() {
    return computerScore;
  }

  // setting players after human mark choice
  function setPlayers(mark) {
    player = Player(mark);
    computer = Player(mark === "X" ? "O" : "X");
    if (mark === "X") {
      displayController.humanPlayerBox.textContent = "X";
      displayController.computerPlayerBox.textContent = "O";
    } else {
      displayController.humanPlayerBox.textContent = "O";
      displayController.computerPlayerBox.textContent = "X";
    }

    displayController.humanPlayerScore.textContent = `Your Score: ${getHumanScore()}`;
    displayController.computerPlayerScore.textContent = `Bot Score: ${getComputerScore()}`;
    play = true;
    currentPlayer = player;
  }

  function getCurrentPlayer() {
    return currentPlayer;
  }

  function getPlay() {
    return play;
  }

  function isGameOver() {
    return gameover;
  }

  function nextTurn() {
    checkWinner();

    if (!gameover) {
      currentPlayer = currentPlayer === player ? computer : player;

      if (currentPlayer === computer) {
        computerTurn();
        nextTurn();
      }
    }
  }

  // set computer to make random move based on empty squares
  function computerTurn() {
    const temp = [];
    gameBoard.getBoard().forEach((element, index) => {
      if (element === "") {
        temp.push(index);
      }
    });
    const randPosition = temp[Math.floor(Math.random() * temp.length)];
    displayController.setComputerTurn(randPosition, currentPlayer.mark);
  }

  // Checking for winners based on winning combinations
  function checkWinner() {
    let isWon = false;
    const board = gameBoard.getBoard();
    const win = gameBoard.getWinningCombos();
    const squares = document.querySelectorAll("[data-index]");

    for (let i = 0; i < win.length; i++) {
      const condition = win[i];
      // checking if the marked boxes are in a row for a win
      const box1 = board[condition[0]];
      const box2 = board[condition[1]];
      const box3 = board[condition[2]];
      if (box1 === "" || box2 === "" || box3 === "") {
        continue;
      }
      if (box1 === box2 && box2 === box3) {
        const winner =
          board[condition[0]] === player.mark ? "You win!" : "Computer wins!";

        // adding score based on winner
        if (winner === "You win!") {
          addHumanScore();
          displayController.humanPlayerScore.textContent = `Your Score: ${getHumanScore()}`;
        } else {
          addComputerScore();
          displayController.computerPlayerScore.textContent = `Bot Score: ${getComputerScore()}`;
        }
        squares[condition[0]].classList.add("winner");
        squares[condition[1]].classList.add("winner");
        squares[condition[2]].classList.add("winner");
        for (i = 0; i < squares.length; i++) {
          squares[i].style.pointerEvents = "none";
        }

        displayController.showResult(winner);
        isWon = true;
        gameover = true;
        return winner;
      }
    }

    if (!board.includes("") && !isWon) {
      displayController.showResult("It's a tie!");
      squares.forEach((square) => square.classList.add("draw"));
      gameover = true;
    } else {
      play = !gameover;
    }
  }

  return {
    resetGame,
    setPlayers,
    getCurrentPlayer,
    getPlay,
    isGameOver,
    nextTurn,
  };
})();
