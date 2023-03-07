# Tic-Tac-Toe

Project: Tic Tac Toe - from The Odin Project Curriculum -> Path (https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe)

The project asks to:

- use factory functions and modules and to have as little global code as possible;
- render the gameboard in javascript
- build the functions that allow players to add marks to a specific spot on the board, and then tie it to the DOM, letting players click on the gameboard to place their marker
- Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie.
- Include a button to start/restart the game and add a display element that congratulates the winning player!

---> [view project](https://freefallrush.github.io/Tic-Tac-Toe/) <----

[![tic-tac-toe.gif](https://i.postimg.cc/K8Sw3tYq/tic-tac-toe.gif)](https://postimg.cc/crhXVgww)

Tic Tac Toe was a good exercise to better understand the module patterns and how IIEFs work.
It forced me to think about how I organize and how I link the code in terms of design patterns.
Though the exercise asks for inputs for player names, I decided to make my solution based on the choice mark made by the human player,
and exclude the name inputs.
For the second player I used Math.random, so the bot's options are not the best and give the human player a big advantage to win.
