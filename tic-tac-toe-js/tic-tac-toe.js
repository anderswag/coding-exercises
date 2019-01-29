class TicTacToe {
  constructor(board) {
    this.board = board
  }

  getWinningValue(data) {
    for (let i = 0; i < data.length; i++) {
      const initialValue = data[i][0]
      const isMatch = data[i].every(function(currentValue) {
        return initialValue === currentValue
      })

      if (isMatch && initialValue !== ' ') {
        return initialValue
      }
    }
  }

  checkRows() {
    return this.getWinningValue(this.board)
  }

  checkColumns() {
    // Transform columns into their own arrays
    const transformedColumns = []
    const boardLength = this.board.length
    for (let i = 0; i < boardLength; i++) {
      for (let j = 0; j < boardLength; j++) {
        if (transformedColumns[j]) {
          transformedColumns[j].push(this.board[i][j])
        } else {
          transformedColumns.push([this.board[i][j]])
        }
      }
    }

    return this.getWinningValue(transformedColumns)
  }

  checkDiagonal() {
    const boardLength = this.board.length
    const transformedData = [[], []] // Since there will always be only two diagonals

    // Get first diagonal line
    for (let i = 0; i < boardLength; i++) {
      transformedData[0].push(this.board[i][i])
    }

    // Reverses the board to get the other diagonal line
    const reversedBoard = this.board.reverse()
    for (let i = 0; i < boardLength; i++) {
      transformedData[1].push(reversedBoard[i][i])
    }

    return this.getWinningValue(transformedData)
  }

  checkUnfinished() {
    let flattenedArray = this.board.reduce(function(accumulator, currentValue) {
      return accumulator.concat(currentValue)
    })
    if (flattenedArray.includes(' ')) {
      return 'unfinished'
    }
  }

  winner() {
    // row checks
    const rowWinner = this.checkRows()
    if (rowWinner) {
      return rowWinner
    }

    // column checks
    const columnWinner = this.checkColumns()
    if (columnWinner) {
      return columnWinner
    }

    // diagonal check
    const diagonalWinner = this.checkDiagonal()
    if (diagonalWinner) {
      return this.checkDiagonal()
    }

    if (this.checkUnfinished()) {
      return this.checkUnfinished()
    }

    return 'draw'
  }
}

module.exports = TicTacToe
