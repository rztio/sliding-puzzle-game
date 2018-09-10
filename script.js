// Get elements from HTML.
var squares = document.getElementsByClassName("square");

// 2D array of numbers used in the puzzle where '0' represents the empty square.
var listSquares = [[0,1,2], [3,4,5], [6,7,8]];

// Stores squares next empty square.
var swapSquares = [];

/**
 * Resize fontsize and set listeners on load.
 */
window.onload = function(event) {
    resizeFont();
    clickedSquare();
};

/**
 * Resize font when window size changes.
 */
window.onresize = function(event) {
    resizeFont();
};

/**
 * Resize font in sliding squares based on width of square.
 */
function resizeFont() {
    for(var i = 0; i < squares.length; i++) {
        var relativeFontSize = squares[i].offsetWidth*0.05;
        squares[i].style.fontSize = relativeFontSize+'px';
    }
};

/**
 * Add event listeners for squares. Get the number of the clicked square
 * and move squares.
 */
function clickedSquare() {
    for(var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function() {
          var square_number = parseInt(this.innerText);
          setSquares(square_number);
        })
    }
};

/**
 * Checks number clicked is next to the empty square and swaps the squares.
 * @param integer n is the number of the square that has been clicked.
 */
function setSquares(n){
  getSwapSquares();
  if (swapSquares.includes(n)){
    for (var row = 0; row < listSquares.length; row++) {
      for (var col = 0; col < listSquares.length; col++) {
        if (listSquares[row][col] === 0) {
          listSquares[row][col] = n;
        } else if (listSquares[row][col] === n) {
          listSquares[row][col] = 0;
        }
      }
    }
     moveSquares();
  }
}

/**
 * Finds numbers next to the empty square and store them in an array.
 */
function getSwapSquares() {
  // Clear array to prevent previous numbers being used when they may not
  // be next to the empty square anymore.
  swapSquares = [];

  for (var row = 0; row < listSquares.length; row++) {
    for (var col = 0; col < listSquares.length; col++) {
      var n = listSquares[row][col];
      if (row - 1 >= 0 && listSquares[row - 1][col] === 0) {
        // Stores number North of the empty square.
        swapSquares.push(n);
      } else if (row + 1 < listSquares.length && listSquares[row + 1][col] === 0) {
        // Stores number South of the empty square.
        swapSquares.push(n);
      } else if (col - 1 >= 0 && listSquares[row][col - 1] === 0) {
        // Stores number East of the empty square.
        swapSquares.push(n);
      } else if (col + 1 < listSquares.length && listSquares[row][col + 1] === 0) {
        // Stores number West of the empty square.
        swapSquares.push(n);
      }
    }
  }
}

/**
 * Move the squares on the screen to match the new 2D array positions.
 */
function moveSquares(){
  var i = 0;
  for (var row = 0; row < listSquares.length; row++) {
    for (var col = 0; col < listSquares.length; col++) {
      if (listSquares[row][col] === 0) {
        squares[i].classList.add("empty");
        squares[i].firstChild.innerText = "";
      } else {
        squares[i].classList.remove("empty");
        squares[i].firstChild.innerText = listSquares[row][col];
      }
       i++;
    }
  }
}
