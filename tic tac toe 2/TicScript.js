/**
 * The following program contains source code for a game called Tic-tac-toe.
 * It is a game for two players, X and O, who take turns marking the
 * spaces in a 3×3 grid. 
 * The player who succeeds in placing three of their marks in a horizontal, vertical, or 
 * diagonal row is the winner
 */

let win1 = -1;
let turn = 1;
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
let ai = 2;
let human = 1;

/**
 * Toggles the current player.
 * 
 */
function togglePlayer() {

    /** 
     * The function toggles the current player and diplays the 
     * scores according to the player which is playing
     */
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
    console.log("in this");
    turn = 1;
    clickCounter = 0;
    win1 = -1;

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
    /**
     * This function displays output according to the win condition
     * and according to toggle condition provides moves to other 
     * player or computer
     */

    if (win1 != -1)
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
    let win = checkMatrix();
    win1 = win;
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
            Computer();
        }
    }
}

/**
 * Checks for the win condition in gameboard
 *
 * @return {number} win condition
 */
function checkMatrix() {

    /**
     * This function checks for the win condition
     * in every row,column and both of the diagonals.
     */

    let win = -1;
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
 * Finds if playing on current spot is optimal move or not.
 *
 * @param {object} matrix The Two-dimensional Array denoting gameboard.
 * @param {boolean} isMaximizing Tells if maximizing or minimizing.
 * @return {number} The best Score for that move
 * 
 */
function miniMax(matrix, isMaximizing) {
    /**
     * miniMax algorithm is implemented
     * in this code which uses recurssion
     * and backtracking to find the optimal
     * solution for the computer player
     */

    let result = checkMatrix();
    if (result != -1) {

        //checks if player is winning on that point
        if (result == 1)
            return -1;
        //checks if computer is winning on that point
        else if (result == 2)
            return +1;
        //checks if its leading to draw condition or not      
    } else if (clickCounter == 9) {
        return 0;
    }
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                //is empty spot available
                if (matrix[i][j] == -1) {
                    matrix[i][j] = ai;
                    clickCounter++;
                    let score = miniMax(matrix, false);
                    matrix[i][j] = -1;
                    clickCounter--;
                    bestScore = Math.max(score, bestScore);
                }
            }

        }
        return bestScore;
    } else {

        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                //is empty spot available
                if (matrix[i][j] == -1) {
                    matrix[i][j] = human;
                    clickCounter++;
                    let score = miniMax(matrix, true);
                    matrix[i][j] = -1;
                    clickCounter--;
                    bestScore = Math.min(score, bestScore);
                }
            }

        }
        return bestScore;
    }
}
/**
 * Finds next empty element in Matrix for computer.
 * and calls Action Perform.
 * 
 */
function Computer() {
    /**
     * This function finds the optimal
     * solution for that particular player
     * and gives the coordinates to
     * ActionPerformedByPlayer function
     */
    let x = -1;
    let y = -1;
    let bestScore = -Infinity;

    //Traverses the whole matrix to check
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            //is spot available
            if (matrix[i][j] == -1) {
                matrix[i][j] = ai;
                clickCounter++;
                let score = miniMax(matrix, false);
                matrix[i][j] = -1;
                clickCounter--;
                if (score > bestScore) {
                    bestScore = score;
                    x = i;
                    y = j;
                }
            }
        }
    }

    let coordinates = "" + x + y;
    var ele = document.getElementById(coordinates);
    ActionPerformedByPlayer(ele, x, y);

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
