class Game {

    constructor() {
        this.board = new Board(8, 8)
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

class Board {

    constructor(width, height) {
        let x, y, fields = []
        this.amountFields = width * height
        this.amountBombs = 0
        this.amountRevealed = 0
        for (y = 0; y < height; y++) {
            fields[y] = []
            for (x = 0; x < width; x++) {
                let isBomb = Math.round((Math.random() * 0.6)) === 1
                if (isBomb) {
                    this.amountBombs++
                }
                fields[y][x] = {
                    isBomb: isBomb,
                    nr: 0,
                    isRevealed: false
                }
            }
        }
        this.fields = fields
        this.calculateNumbers()
    }

    calculateNumbers() {
        this.fields.forEach((row, y) => {
            row.forEach((field, x, arr) => {
                let nr = 0
                if (field.isBomb) {
                    field.nr = '💣'
                    return
                }
                // above
                if (this.fields[y - 1] && this.fields[y - 1][x] && this.fields[y - 1][x].isBomb) {
                    nr++
                }
                // above right
                if (this.fields[y - 1] && this.fields[y - 1][x + 1] && this.fields[y - 1][x + 1].isBomb) {
                    nr++
                }
                // right
                if (this.fields[y][x + 1] && this.fields[y][x + 1].isBomb) {
                    nr++
                }
                // underneath right
                if (this.fields[y + 1] && this.fields[y + 1][x + 1] && this.fields[y + 1][x + 1].isBomb) {
                    nr++
                }
                // underneath
                if (this.fields[y + 1] && this.fields[y + 1][x] && this.fields[y + 1][x].isBomb) {
                    nr++
                }
                // underneath left
                if (this.fields[y + 1] && this.fields[y + 1][x - 1] && this.fields[y + 1][x - 1].isBomb) {
                    nr++
                }
                // above left
                if (this.fields[y - 1] && this.fields[y - 1][x - 1] && this.fields[y - 1][x - 1].isBomb) {
                    nr++
                }
                // left
                if (this.fields[y][x - 1] && this.fields[y][x - 1].isBomb) {
                    nr++
                }
                field.nr = nr;
            })
        })
    }

    reveal(x, y) {
        if (!this.fields[y][x].isRevealed) {
            this.fields[y][x].isRevealed = true
            this.amountRevealed++;
        }

        // only if this field is empty, reveal neighboured empty fields
        if (this.fields[y][x].nr !== 0) {
            return
        }

        // above
        if (this.fields[y - 1] && this.fields[y - 1][x] && !this.fields[y - 1][x].isRevealed && this.fields[y - 1][x].nr === 0) {
            this.reveal(x, y - 1);
        }
        // above right
        if (this.fields[y - 1] && this.fields[y - 1][x + 1] && !this.fields[y - 1][x + 1].isRevealed && this.fields[y - 1][x + 1].nr === 0) {
            this.reveal(x + 1, y - 1)
        }
        // right
        if (this.fields[y][x + 1] && !this.fields[y][x + 1].isRevealed && this.fields[y][x + 1].nr === 0) {
            this.reveal(x + 1, y);
        }
        // underneath right
        if (this.fields[y + 1] && this.fields[y + 1][x + 1] && !this.fields[y + 1][x + 1].isRevealed && this.fields[y + 1][x + 1].nr === 0) {
            this.reveal(x + 1, y + 1)
        }
        // underneath
        if (this.fields[y + 1] && this.fields[y + 1][x] && !this.fields[y + 1][x].isRevealed && this.fields[y + 1][x].nr === 0) {
            this.reveal(x, y + 1)
        }
        // underneath left
        if (this.fields[y + 1] && this.fields[y + 1][x - 1] && !this.fields[y + 1][x - 1].isRevealed && this.fields[y + 1][x - 1].nr === 0) {
            this.reveal(x - 1, y + 1)
        }
        // above left
        if (this.fields[y - 1] && this.fields[y - 1][x - 1] && !this.fields[y - 1][x - 1].isRevealed && this.fields[y - 1][x - 1].nr === 0) {
            this.reveal(x - 1, y - 1)
        }
        // left
        if (this.fields[y][x - 1] && !this.fields[y][x - 1].isRevealed && this.fields[y][x - 1].nr === 0) {
            this.reveal(x - 1, y)
        }
    }

    toStringRevealed() {
        let str = ''
        this.fields.forEach((row, y) => {
            row.forEach((field, x) => {
                str += field.nr + '\t'
            })
            str += '\n'
        })
        console.log(str)
    }

    toString() {
        let str = ''
        this.fields.forEach((row, y) => {
            row.forEach((field, x) => {
                str += (field.isRevealed ? field.nr : '🍃') + ' (' + x + ',' + y + ')\t'
            })
            str += '\n'
        })
        console.log(str)
    }

    createTable(game) {
        let table = document.createElement('table')
        let self = this
        this.fields.forEach((row, y) => {
            let tr = document.createElement('tr')
            row.forEach((field, x) => {
                let td = document.createElement('td')
                td.id = 'cel_' + y + '_' + x
                td.innerHTML = field.isRevealed ? field.nr : '🍃'
                td.onclick = function() {
                    game.cellClick(this)
                }
                tr.appendChild(td)
            })
            table.appendChild(tr)
        })
        this.table = table
    }

    toTable(game) {
        this.createTable(game)
        document.getElementById('table_wrapper').innerHTML = ''
        document.getElementById('table_wrapper').appendChild(this.table)
    }

    createTableRevealed() {
        let table = document.createElement('table')
        let self = this
        this.fields.forEach((row, y) => {
            let tr = document.createElement('tr')
            row.forEach((field, x) => {
                let td = document.createElement('td')
                td.innerHTML = field.nr
                tr.appendChild(td)
            })
            table.appendChild(tr)
        })
        this.table = table
    }

    toTableRevealed() {
        this.createTableRevealed()
        document.getElementById('table_wrapper').innerHTML = ''
        document.getElementById('table_wrapper').appendChild(this.table)
    }

    createTableWin() {
        let table = document.createElement('table')
        let self = this
        this.fields.forEach((row, y) => {
            let tr = document.createElement('tr')
            row.forEach((field, x) => {
                let td = document.createElement('td')
                td.innerHTML = field.nr == '💣' ? '🎉' : field.nr
                tr.appendChild(td)
            })
            table.appendChild(tr)
        })
        this.table = table
    }

    toTableWin() {
        this.createTableWin()
        document.getElementById('table_wrapper').innerHTML = ''
        document.getElementById('table_wrapper').appendChild(this.table)
    }

}

new Game()
