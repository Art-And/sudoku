function solveSudoku(examSudo) {
  var emptySpot = nextEmtySpot(examSudo);
  var r = emptySpot[0];
  var c = emptySpot[1];

  if (!isValidSudoku(examSudo)) return examSudo;


  if (r === -1) {
      return examSudo;
  };

  var possArr = possiblities(r, c, examSudo);

  for (var k = 0; k < possArr.length && nextEmtySpot(examSudo)[0] !== -1; k++) {
      examSudo[r][c] = possArr[k];
      solveSudoku(examSudo);
  }

  if (nextEmtySpot(examSudo)[0] !== -1) examSudo[r][c] = 0;

  return examSudo;
}

function nextEmtySpot(examSudo) {
  for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
          if (examSudo[i][j] === 0) return [i, j];
      }
  }
  return [-1, -1];
}

function possiblities(r, c, examSudo) {
  var possArr = [];
  var row = [];
  var col = [];
  var quad = [];
  var k = 0;
  var l = 0;
  if (r <= 2) k = 0; else if (r <= 5) k = 3; else k = 6;
  if (c <= 2) l = 0; else if (c <= 5) l = 3; else l = 6;

  for (var i = 0; i < 9; i++) {
      row.push(examSudo[i][c]);
  }
  for (var j = 0; j < 9; j++) {
      col.push(examSudo[r][j]);
  }
  for (var i = k; i < k + 3; i++) {
      for (var j = l; j < l + 3; j++) {
          quad.push(examSudo[i][j]);
      }
  }

  for (var n = 1; n < 10; n++) {
      if (row.indexOf(n) === -1 && col.indexOf(n) === -1 && quad.indexOf(n) === -1) {
          possArr.push(n);
      }
  }
  return possArr;
}
function checkQuadrant(r, c, examSudo) {
  var qudarantArr = [];
  for (var i = r; i < r + 3; i++) {
      for (var j = c; j < c + 3; j++) {
          if (qudarantArr.indexOf(examSudo[i][j]) === -1 || examSudo[i][j] === 0) {
              qudarantArr.push(examSudo[i][j]);
          } else {
              return false;
          }
      }
  }
  return true;
}
function isValidSudoku(examSudo) {
  if (!checkQuadrant(0, 0, examSudo)) return (`${false} your algorithm is not resolvable`);
  if (!checkQuadrant(0, 3, examSudo)) return (`${false} your algorithm is not resolvable`);
  if (!checkQuadrant(0, 6, examSudo)) return (`${false} your algorithm is not resolvable`);

  if (!checkQuadrant(3, 0, examSudo)) return (`${false} your algorithm is not resolvable`);
  if (!checkQuadrant(3, 3, examSudo)) return (`${false} your algorithm is not resolvable`);
  if (!checkQuadrant(3, 6, examSudo)) return (`${false} your algorithm is not resolvable`);

  if (!checkQuadrant(6, 0, examSudo)) return (`${false} your algorithm is not resolvable`);
  if (!checkQuadrant(6, 3, examSudo)) return (`${false} your algorithm is not resolvable`);
  if (!checkQuadrant(6, 6, examSudo)) return (`${false} your algorithm is not resolvable`);

  for (var i = 0; i < examSudo.length; i++) {
      var rowNumbers = [];
      for (var j = 0; j < examSudo.length; j++) {
          if (rowNumbers.indexOf(examSudo[i][j]) === -1 || examSudo[i][j] === 0) {
              rowNumbers.push(examSudo[i][j]);
          } else {
            return false
          }
      }
  }

  for (var i = 0; i < examSudo.length; i++) {
      var colNumbers = [];
      for (var j = 0; j < examSudo.length; j++) {
          if (colNumbers.indexOf(examSudo[j][i]) === -1 || examSudo[j][i] === 0) {
              colNumbers.push(examSudo[j][i]);
          } else {
              return false
          }
      }
  }
  return true;
}

var examSudo = [
  [8, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 3, 6, 0, 0, 0, 0, 0],
  [0, 7, 0, 0, 9, 0, 2, 0, 0],
  [0, 5, 0, 0, 0, 7, 0, 0, 0],
  [0, 0, 0, 0, 4, 5, 7, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 3, 0],
  [0, 0, 1, 0, 0, 0, 0, 6, 8],
  [0, 0, 8, 5, 0, 0, 0, 1, 0],
  [0, 9, 0, 0, 0, 0, 4, 0, 0]
];

/* var examSudo = [
  [1, 7, 5, 6, 8, 2, 9, 3, 4],
  [4, 0, 0, 0, 0, 0, 0, 0, 0],
  [5, 0, 0, 0, 0, 0, 0, 0, 0],
  [7, 0, 0, 0, 0, 0, 0, 0, 0],
  [3, 0, 0, 0, 0, 0, 0, 0, 0],
  [6, 0, 0, 0, 0, 0, 0, 0, 0],
  [2, 0, 0, 0, 0, 0, 0, 0, 0],
  [9, 0, 0, 0, 0, 0, 0, 0, 0],
  [8, 0, 0, 0, 0, 0, 0, 0, 0]
]; */

solveSudoku(examSudo);

if (isValidSudoku(examSudo) === true) {
  console.log(`'Solved!' ${isValidSudoku(examSudo)}`);
  console.log(examSudo);
}else {
  console.log(isValidSudoku(examSudo))
}

