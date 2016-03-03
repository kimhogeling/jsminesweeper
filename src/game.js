'use strict';

const BOARD_SIZE = 8

class Game {

    constructor() {
        this.board = new Board(BOARD_SIZE, BOARD_SIZE)
        this.draw()
    }

    draw() {
        this.board.toTable(this)
    }

    reveal(x, y) {
        if (this.board.fields[y][x].isRevealed) {
            return
        }
        if (this.board.fields[y][x].isBomb) {
            this.board.toTableRevealed()
            return
        }
        this.board.reveal(x, y)

        // win if the amount of remaining cells equal the bombs
        if (this.board.amountFields - this.board.amountRevealed === this.board.amountBombs) {
            this.board.toTableWin()
            return
        }
        this.draw()
    }

    cellClick(cell) {
        let yx = cell.id.split('_')
        yx.shift()
        this.reveal(yx[1]|0, yx[0]|0)
    }

}
