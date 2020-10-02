const b = null;

const boardTable = [
  [1, 7, 5, 6, 8, 2, 9, 3, 4],
  [4, b, b, b, b, b, b, b, b],
  [5, b, b, b, b, b, b, b, b],
  [7, b, b, b, b, b, b, b, b],
  [3, b, b, b, b, b, b, b, b],
  [6, b, b, b, b, b, b, b, b],
  [2, b, b, b, b, b, b, b, b],
  [9, b, b, b, b, b, b, b, b],
  [8, b, b, b, b, b, b, b, b]
];

const solve = (board) =>{
  if (solved(board)){
    return board
  }else {
    const possibilities = nextBoards(board)
    const valiBoards = keepOnlyValid(possibilities)
    return searchForSolution(valiBoards)

  }
}
const searchForSolution = boards => {
  if (boards.length < 1) {
    return false
  }else {
    //regrasa a buscar soluciones
    let first = boards.shift()
    const tryPath = solve(first)
    if (tryPath != false){
      return tryPath
    }else {
      return searchForSolution(boards)
    }
  }
}
const solved = board => {
  for(let i = 0; i < 9; i++){
    for(let j = 0; j < 9; j++){
      if (board[i][j] === null) {
        return false
      }
    }
  }
  return true
}

const nextBoards = (board) =>{
  let res = []
  const firstEmpty =  findEmptySquare(board)
  if (firstEmpty != undefined){
    const y = firstEmpty[0]
    const x = firstEmpty[1]
    for(let i = 1; i <= 9; i++) {
      let newBoard = [...board]
      let row = [...newBoard[y]]
      row[x] = i
      newBoard[y] = row
      res.push(newBoard)
    }
  }
  return res
}

const findEmptySquare = board => {
  for(let i = 0; i < 9; i++){
    for(let j = 0; j < 9; j++){
      if (board[i][j] === null){
        return [i, j]
      }
    }
  }
}
const keepOnlyValid = boards => {
  return boards.filter(b => valiBoards(b))
}

const valiBoards = board => {
  return rowsGood(board) && columnGood(board) && boxesGood(board)
}
const rowsGood= board => {
  for(let i = 0; i < 9; i++){
    let cur = []
    for (let j = 0; j < 9; j++){
      if (cur.includes(board[i][j])) {
        return false
      }else if (board[i][j] != null) {
        cur.push(board[i][j])
      }
    }
  }
  return true
}

const columnGood = board => {
  for(let i = 0; i < 9; i++){
    let cur = []
    for (let j = 0; j < 9; j++){
      if (cur.includes(board[j][i])) {
        return false
      }else if (board[j][i] != null) {
        cur.push(board[j][i])
      }
    }
  }
  return true
}

const boxesGood = board => {
  const boxCoordinates = [
    [0,0], [0,1], [0,2],
    [1,0], [1,1], [1,2],
    [2,0], [2,1], [2,2]
  ]

  for(let y = 0; y < 9; y += 3){
    for (let x = 0; x < 9; x += 3){
      let cur = []
      for (let i = 0; i < 9; i++){
        let coordinates = [...boxCoordinates[i]]
        coordinates[0] += y
        coordinates[1] += x
        if(cur.includes(board[coordinates[0]][coordinates[1]])) {
          return false
        }else if (board[coordinates[0]][coordinates[1]] != null) {
          cur.push(board[coordinates[0]][coordinates[1]])
        }
      }
    }
  }
  return true
}

console.log(solve(boardTable))
