/**
 * The following program contains source code for a game called Tic-tac-toe.
 * It is a game for two players, X and O, who take turns marking the
 * spaces in a 3×3 grid. 
 * The player who succeeds in placing three of their marks in a horizontal, vertical, or 
 * diagonal row is the winner
 */


let turn = 1;
let win = -1;
let clickCounter = 0;
const matrix = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1]
];
let toggle = "computer";
let score1 = 0;
let score2 = 0;
let draw = 0;

/**
 * Toggles the current player.
 * 
 */
function togglePlayer() {
    reset();


    if (toggle == "computer") {
        toggle = "player2";
        document.getElementById("score2").innerHTML = "Player 2 Score";

    } else {
        toggle = "computer";
        document.getElementById("score2").innerHTML = "Computer Score";

    }
    score1 = 0;
    score2 = 0;
    draw = 0;
    document.getElementById("toggle").innerHTML = toggle;
    document.getElementById("score1").innerHTML = "Player 1 Score";
    document.getElementById("draw").innerHTML = "Draw";

}

/**
 * Reset the Matrix and Scores.
 *
 */
function reset() {
    turn = 1;
    win = -1;
    clickCounter = 0;


    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            matrix[i][j] = -1;
        }
    }

    document.getElementById("00").innerHTML = "";
    document.getElementById("01").innerHTML = "";
    document.getElementById("02").innerHTML = "";
    document.getElementById("10").innerHTML = "";
    document.getElementById("11").innerHTML = "";
    document.getElementById("12").innerHTML = "";
    document.getElementById("20").innerHTML = "";
    document.getElementById("21").innerHTML = "";
    document.getElementById("22").innerHTML = "";
}


/**
 * Fills the gameboard Acoording to players.
 *
 * @param {div} elem The div element to put value upon.
 * @param {number} row The row of div.
 * @param {number} col The column of div.
 * 
 */
function ActionPerformedByPlayer(elem, row, col) {

    if (toggle == "computer") {

        Action(toggle, elem, row, col);
    } else {
        Action(toggle, elem, row, col);
    }

}
/**
 * Fills the gameboard Acoording to players and displays output.
 *
 * @param {string} toggle The current player(player2 / Computer).
 * @param {div} elem The div element to put value upon.
 * @param {number} row The row of div.
 * @param {number} col The column of div.
 * 
 */
function Action(toggle, elem, row, col) {
    if (win != -1)
        return;

    if (elem != null)
        if (elem.innerHTML != "")
            return;

    matrix[row][col] = turn;
    if (turn == 1) {
        elem.innerHTML = "X";
        if (toggle == "computer")
            document.getElementById("messagesection").innerHTML = "Computer turn";
        else
            document.getElementById("messagesection").innerHTML = "Player 2 turn";
        turn = 2;
        clickCounter++;

    } else if (turn == 2) {
        elem.innerHTML = "O";
        document.getElementById("messagesection").innerHTML = "Player 1 turn";
        turn = 1;
        clickCounter++;
    }
    win = checkMatrix();

    if (win != -1) {
        if (win == 1) {
            document.getElementById("messagesection").innerHTML = " Player " + win + " Won the match ";
            score1++;

            document.getElementById("score1").innerHTML = "Player 1 Score" + "<br>" + score1;
        } else {

            score2++;
            if (toggle == "computer") {
                document.getElementById("messagesection").innerHTML = "Computer " + " Won the match ";
                document.getElementById("score2").innerHTML = "Computer Score" + "<br>" + score2;
            } else {
                document.getElementById("messagesection").innerHTML = "Player " + win + " Won the match ";
                document.getElementById("score2").innerHTML = "player 2 Score" + "<br>" + score2;
            }
        }


        ConfettiAnimation();
        restartButton();

    }

    if (clickCounter == 9 && win == -1) {
        draw++;
        document.getElementById("messagesection").innerHTML = " The match is Drawn";
        document.getElementById("draw").innerHTML = "Draw" + "<br>" + draw;
        ConfettiAnimation();
        restartButton();

    }

    if (toggle == "computer") {
        if (turn == 2) {
            Computer(row, col);
        }
    }
}

/**
 * Checks for the win condition in gameboard
 *
 * @return {number} win condition
 */
function checkMatrix() {

    for (var i = 0; i < 3; i++) {

        // Row check
        if (matrix[i][0] != -1 && matrix[i][0] == matrix[i][1] && matrix[i][1] == matrix[i][2]) {
            win = matrix[i][0];
            return win;

        }

        // Column check
        if (matrix[0][i] != -1 && matrix[0][i] == matrix[1][i] && matrix[1][i] == matrix[2][i]) {
            win = matrix[0][i];
            return win;
        }

    }

    // 1st diagonal check
    if (matrix[0][0] != -1 && matrix[0][0] == matrix[1][1] && matrix[1][1] == matrix[2][2]) {
        win = matrix[0][0];
        return win;
    }

    // 2nd diagonal check
    if (matrix[0][2] != -1 && matrix[0][2] == matrix[1][1] && matrix[1][1] == matrix[2][0]) {
        win = matrix[0][2];
        return win;
    }

    return win;
}

/**
 * Generates a random number between a given range.
 *
 * @param {number} min The min number of given range.
 * @param {number} max The max number of given range.
 * @return {number} return the random number.
 */
function generateRandomNumbers(min, max) {
    return Math.floor(Math.random() * (max - min) + min);

}

/**
 * Finds next empty element in Matrix for computer.
 * and calls ActionPerformedByPlayer.
 * 
 */
function Computer() {


    let x = generateRandomNumbers(0, 3);
    let y = generateRandomNumbers(0, 3);

    while (matrix[x][y] != -1) {
        if (clickCounter == 9) {
            x = -1;
            y = -1;
            break;
        }
        x = generateRandomNumbers(0, 3);
        y = generateRandomNumbers(0, 3);

        if (matrix[x][y] == -1)
            break;

    }

    let coordinates = "" + x + y;
    console.log(coordinates);
    var ele = document.getElementById(coordinates);
    ActionPerformedByPlayer(ele, x, y);

    /* Another Logic Generating empty element
  let x = -1;
  let y = -1;
  for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {

          //checks if not current row or column.
          if (i != row || j != col) {
              if (matrix[i][j] == -1) {
                  x = i;
                  y = j;
                  break;
              }
          }
      }
  }
  */

}

/**
 * Starts and ends the confetti animation.
 *
 */
function ConfettiAnimation() {
    const start = () => {
        setTimeout(function() {
            confetti.start()
        }, 100); // 1000 is time that after 1 second start the confetti ( 1000 = 1 sec)
    };

    //  Stop

    const stop = () => {
        setTimeout(function() {
            confetti.stop()
        }, 5000); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
    };

    start();
    stop();
}

/**
 * Restart Button is made after ending of game.
 *
 */
function restartButton() {
    document.getElementById("resetId").innerHTML = "Restart";
}
